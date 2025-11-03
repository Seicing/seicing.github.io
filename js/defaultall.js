/*
=====================================================================
=== 全局布局控制器 (Global Layout Controller) v4.0
=== 优化记录：
=== v4.0: 实现“一次性惰性加载”模式。内容只在抽屉为空时加载一次，之后resize不再触发重载。
=== v3.1: 新增“首次点击时按需加载”机制。
=== v3.0: 重构事件绑定与内容管理逻辑。
=== v2.0: 新增“防抖(Debounce)”模式。
=== v1.0: 修复resize失效问题。
=====================================================================
*/

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// === 模块0: 辅助工具函数 (Helpers / Utilities) ===
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// === 模块1: 核心功能函数 ===
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
 * 颜色替换函数
 */
function conditionallyReplaceLinkColor(container) {
    if (!container) return;
    const links = container.querySelectorAll('a');
    const targetColor = 'rgb(3, 102, 214)';
    const replacementColor = '#D0C9B7';
    links.forEach(link => {
        const currentColor = window.getComputedStyle(link).color;
        if (currentColor === targetColor) {
            link.style.setProperty('color', replacementColor, 'important');
        }
    });
}

/**
 * 内容复制器：负责将 #sidebar 的内容复制到抽屉中。
 */
function cloneSidebarContent() {
    const originalSidebar = document.getElementById('sidebar');
    if (!originalSidebar) return;

    let attempts = 0;
    const maxAttempts = 20; // 尝试2秒
    const migrationInterval = setInterval(function () {
        attempts++;
        const contentSource = originalSidebar.querySelector('#scroll-1') || originalSidebar;

        if (contentSource.children.length > 0 || attempts >= maxAttempts) {
            clearInterval(migrationInterval);
            if (contentSource.children.length === 0) return;

            let mobileDrawer = document.getElementById('mobile-drawer-container');
            if (!mobileDrawer) {
                mobileDrawer = document.createElement('div');
                mobileDrawer.id = 'mobile-drawer-container';
                document.body.appendChild(mobileDrawer);
            }

            mobileDrawer.innerHTML = ''; // 清空以防万一

            for (const child of contentSource.childNodes) {
                const clonedNode = child.cloneNode(true);
                mobileDrawer.appendChild(clonedNode);
            }

            conditionallyReplaceLinkColor(mobileDrawer);
            console.log("Success: Sidebar content has been cloned ONCE.");
        }
    }, 100);
}

/**
 * 事件绑定器：只执行一次，为按钮和遮罩层绑定永久的点击事件。
 */
function bindSidebarToggleEventsOnce() {
    const toggleButton = document.getElementById('sidebar-toggle-button');
    const overlay = document.getElementById('sidebar-overlay');

    if (toggleButton && overlay && !toggleButton.dataset.eventsBound) {

        function toggleSidebar() {
            // 这个函数现在非常纯粹：只负责开关，不处理内容。
            // 这确保了按钮的响应是即时且可靠的。
            document.body.classList.toggle('sidebar-open');
        }

        toggleButton.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);
        toggleButton.dataset.eventsBound = 'true';
    }
}

/**
 * 特殊页面背景处理器 (逻辑不变)
 */
function handleSpecialPageBackground() {
    if (window.innerWidth > 767) return;
    const beaconDiv = document.querySelector('.keep-original-background');
    if (beaconDiv) {
        const elementsToChange = document.querySelectorAll(
            'html, body, #wrapper, #page, #content, .post, .entry'
        );
        elementsToChange.forEach(element => {
            element.style.setProperty('background', `url('https://seicing.com/res/textile_pattern_mip0.png')`, 'important');
        });
    }
}

/**
 * 回到顶部按钮事件绑定器：只执行一次，为按钮绑定永久的点击事件。
 */
function bindBackToTopEventsOnce() {
    const backToTopButton = document.getElementById('back-to-top-button');

    if (backToTopButton && !backToTopButton.dataset.eventsBound) {

        function scrollToTop() {
            // 找出 headless 模板中真正负责滚动的容器
            // 通常是 #content 或者 #page，我们可以检查哪个有滚动条
            const contentScroller = document.getElementById('content');

            // 检查 #content 元素是否存在，并且其内容高度是否真的超过了它自身的可视高度
            // 如果是，说明它就是我们正在寻找的、带滚动条的内部容器
            if (contentScroller && contentScroller.scrollHeight > contentScroller.clientHeight) {
                // 命令这个内部容器滚动到顶部
                contentScroller.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            } else {
                // 否则，说明这是 base.html 这样的标准页面，直接滚动整个窗口
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        }

        backToTopButton.addEventListener('click', scrollToTop);
        backToTopButton.dataset.eventsBound = 'true'; // 标记为已绑定，避免重复
    }
}

/**
 * [升级版] 动态定位“回到顶部”按钮。
 * 通过检测“☰”按钮是否可见，来智能判断当前是否为电脑模式，
 * 从而兼容所有模板 (base, headless, baselarge)。
 */
function positionBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top-button');
    const wrapper = document.getElementById('wrapper');
    const toggleButton = document.getElementById('sidebar-toggle-button');

    if (!backToTopButton || !wrapper) return;

    // 检查当前是否为移动端视图 (即“☰”按钮存在且可见)
    const isMobileView = toggleButton && getComputedStyle(toggleButton).display !== 'none';

    if (isMobileView) {
        // 如果是移动端视图，就清除 JS 添加的内联样式，让 CSS 媒体查询去接管按钮位置
        backToTopButton.style.left = '';
    } else {
        // 否则，我们判定为电脑端视图，执行精确定位
        const wrapperRect = wrapper.getBoundingClientRect();
        const buttonLeft = wrapperRect.right + 20; // 贴紧内容区右侧20px
        backToTopButton.style.left = buttonLeft + 'px';
    }
}


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// === 模块2: 主执行逻辑 (全新重构) ===
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
 * [核心逻辑] 条件化布局管理器
 * 这个函数会在需要时被调用，但内部有判断，确保内容只被加载一次。
 */
function conditionallyManageLayout() {
    // 步骤1：检查是否处于需要抽屉的视图（手机或平板）
    if (window.innerWidth >= 1280) {
        // 如果是桌面视图，则什么都不做
        return;
    }

    // 步骤2：检查抽屉是否已经被填充过内容
    const mobileDrawer = document.getElementById('mobile-drawer-container');
    if (mobileDrawer && mobileDrawer.children.length > 0) {
        // 如果抽屉里已经有内容了，就直接退出，不再执行任何操作。
        // 这就是您“之后如何resize，里面只要有内容就不会改变它”的核心实现。
        console.log("Drawer already populated. Skipping layout management.");
        return;
    }

    // 步骤3：如果代码能执行到这里，说明我们正处于手机/平板视图，且抽屉是空的。
    // 这时才执行内容加载。
    console.log("Drawer is empty. Initializing content clone...");
    cloneSidebarContent();

    // 背景处理函数可以一并在这里调用
    handleSpecialPageBackground();
}

// --- 页面加载时 ---
document.addEventListener('DOMContentLoaded', function () {
    // 1. [只执行一次] 绑定永久的、纯粹的点击事件。
    bindSidebarToggleEventsOnce();
    // 2. [新增] [只执行一次] 绑定永久的回到顶部按钮点击事件。
    bindBackToTopEventsOnce();
    // 2. [执行一次] 首次加载时，立即进行一次条件化检查。
    conditionallyManageLayout();
    positionBackToTopButton();
});

// --- 浏览器窗口大小改变时 ---
// 仍然使用防抖模式，但现在调用的函数内部有了智能判断。
window.addEventListener('resize', debounce(function () {
    conditionallyManageLayout();
    positionBackToTopButton();
}, 250));