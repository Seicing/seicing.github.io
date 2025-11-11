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

            // =================================================================
            // === 【集成点】在这里调用 essay.js 的改造函数 ===
            // =================================================================
            if (typeof transformClonedEssayList === 'function') {
                transformClonedEssayList(mobileDrawer);
            }
        }
    }, 100);
}

/**
 * 事件绑定器：只执行一次，为按钮和遮罩层绑定永久的点击事件。
 */
function bindSidebarToggleEventsOnce() {
    const toggleButton = document.getElementById('sidebar-toggle-button');
    const overlay = document.getElementById('sidebar-overlay');
    const body = document.body;

    if (!toggleButton || !overlay || toggleButton.dataset.eventsBound) return;

    // === 原本的点击固定展开逻辑 ===
    function toggleSidebarByClick() {
        body.classList.toggle('sidebar-fixed');
        if (body.classList.contains('sidebar-fixed')) {
            body.classList.add('sidebar-open');
        } else {
            body.classList.remove('sidebar-open');
        }
    }

    toggleButton.addEventListener('click', toggleSidebarByClick);
    overlay.addEventListener('click', () => {
        body.classList.remove('sidebar-fixed');
        body.classList.remove('sidebar-open');
    });

    // === 新增：悬停临时展开（仅桌面环境） ===
    function canUseHover() {
        const btnStyle = getComputedStyle(toggleButton);
        const visible = btnStyle.display !== 'none' && btnStyle.visibility !== 'hidden';
        const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        return visible && hoverCapable;
    }

    if (canUseHover()) {
        const drawer = document.getElementById('mobile-drawer-container');
        let hoverZone = null;
        let hoverTimer = null;

        // 🟢 建立一个 hoverZone：覆盖按钮 + 抽屉
        function updateHoverZone() {
            const btnRect = toggleButton.getBoundingClientRect();
            const drawerRect = drawer ? drawer.getBoundingClientRect() : null;

            if (drawerRect) {
                const left = Math.min(btnRect.left, drawerRect.left);
                const top = Math.min(btnRect.top, drawerRect.top);
                const right = Math.max(btnRect.right, drawerRect.right);
                const bottom = Math.max(btnRect.bottom, drawerRect.bottom);
                hoverZone = { left, top, right, bottom };
            } else {
                hoverZone = btnRect;
            }
        }

        // 🟢 打开抽屉（临时）
        function openDrawerTemp() {
            if (!body.classList.contains('sidebar-fixed')) {
                updateHoverZone();
                body.classList.add('sidebar-open');
            }
        }

        // 🟢 检查鼠标是否仍在按钮或抽屉区域
        function isInsideHoverZone(e) {
            if (!hoverZone) return false;
            const x = e.clientX, y = e.clientY;
            return (
                x >= hoverZone.left &&
                x <= hoverZone.right &&
                y >= hoverZone.top &&
                y <= hoverZone.bottom
            );
        }

        // 🟢 鼠标移动监控：当移出 hoverZone 且未固定时收回
        function onMouseMove(e) {
            if (body.classList.contains('sidebar-fixed')) return;
            clearTimeout(hoverTimer);
            if (!isInsideHoverZone(e)) {
                hoverTimer = setTimeout(() => {
                    body.classList.remove('sidebar-open');
                }, 120);
            }
        }

        // 当鼠标移入按钮时打开，移出区域后才关闭
        toggleButton.addEventListener('mouseenter', openDrawerTemp);
        document.addEventListener('mousemove', onMouseMove);
    }

    toggleButton.dataset.eventsBound = 'true';
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
 * 回到顶部按钮事件绑定器：v5.0 (终极兼容版)
 * - 修正了在 headless 模板电脑端无法找到主滚动条的问题。
 * - 兼容所有模板、所有设备、所有情况。
 */
function bindBackToTopEventsOnce() {
    const backToTopButton = document.getElementById('back-to-top-button');

    if (backToTopButton && !backToTopButton.dataset.eventsBound) {

        function scrollToTop(event) {
            event.preventDefault();

            const internalScrollers = [
                document.getElementById('content'),
                document.getElementById('page')
            ];
            let internalScrollerFound = false;

            for (const element of internalScrollers) {
                // 检查内部容器是否有滚动条
                if (element && element.scrollHeight > element.clientHeight) {
                    element.scrollTo({ top: 0, behavior: "smooth" });
                    internalScrollerFound = true;
                    break;
                }
            }

            // [核心修正] 如果没有找到任何内部滚动条，
            // 那么就假定是主页面在滚动，并同时命令所有可能的主滚动条。
            if (!internalScrollerFound) {
                // 这个命令对 base.html 和 baselarge.html 有效
                window.scrollTo({ top: 0, behavior: "smooth" });

                // 这个命令对 headless.html 的电脑端视图有效
                document.body.scrollTo({ top: 0, behavior: "smooth" });
            }
        }

        backToTopButton.addEventListener('click', scrollToTop);
        backToTopButton.addEventListener('touchstart', scrollToTop);
        backToTopButton.dataset.eventsBound = 'true';
    }
}



/**
 * [V3 - 带模板偏移修正] 动态定位“回到顶部”按钮。
 * - 通过检测“☰”按钮智能判断电脑/移动模式。
 * - 通过检测 #wrapper 宽度，为 large 模板应用特殊偏移。
 */
function positionBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top-button');
    const wrapper = document.getElementById('wrapper');
    const toggleButton = document.getElementById('sidebar-toggle-button');

    if (!backToTopButton || !wrapper) return;

    // 检查当前是否为移动端视图
    const isMobileView = toggleButton && getComputedStyle(toggleButton).display !== 'none';

    if (isMobileView) {
        // 移动端视图：清除 JS 样式，交还给 CSS 控制
        backToTopButton.style.left = '';
    } else {
        // 电脑端视图：执行精确定位
        const wrapperRect = wrapper.getBoundingClientRect();

        // 1. 先计算出基础的贴边位置
        let buttonLeft = wrapperRect.right + 20;

        // 2. [核心修改] 检查是否为 large 模板 (通过其唯一的 1850px 宽度)
        if (wrapper.offsetWidth === 1850) {
            // 如果是，就在基础位置上向左移动 25px
            buttonLeft -= 25;
        }

        // 3. 应用最终计算好的样式
        backToTopButton.style.left = buttonLeft + 'px';
    }
    backToTopButton.style.opacity = '1';
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// === 模块2: 主执行逻辑 (全新重构) ===
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
 * [核心逻辑 V2] 条件化布局管理器 (带MutationObserver)
 * 这个函数会在需要时被调用，但内部有智能监控，确保内容加载后再执行克隆。
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
        console.log("Drawer already populated. Skipping layout management.");
        return;
    }

    // 步骤3：如果代码能执行到这里，说明我们正处于手机/平板视图，且抽屉是空的。
    // 这时我们不再直接调用cloneSidebarContent，而是开始“监视”内容源。
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) {
        console.error("Sidebar element not found!");
        return;
    }

    // 检查侧边栏是否已经有内容了 (以防万一内容加载得很快)
    if (sidebar.children.length > 0) {
        console.log("Sidebar already has content. Cloning immediately.");
        cloneSidebarContent();
        handleSpecialPageBackground();
        return;
    }

    // 如果侧边栏当前是空的，就设置一个观察者
    console.log("Sidebar is empty. Setting up MutationObserver to wait for content...");
    const observer = new MutationObserver((mutationsList, obs) => {
        // 遍历所有发生的变更
        for (const mutation of mutationsList) {
            // 我们只关心子节点的添加
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                console.log("Sidebar content has been loaded! Cloning now...");
                cloneSidebarContent(); // 内容来了，立即克隆！
                handleSpecialPageBackground();
                obs.disconnect(); // 任务完成，断开观察，避免不必要的性能开销
                return; // 退出循环和回调
            }
        }
    });

    // 配置观察者：我们想观察子列表的变化
    const config = { childList: true };

    // 开始观察目标节点
    observer.observe(sidebar, config);

    // 设置一个超时，以防万一内容永远加载不进来
    setTimeout(() => {
        observer.disconnect(); // 10秒后无论如何都停止观察
        console.log("Observer timed out after 10 seconds.");
    }, 10000);
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