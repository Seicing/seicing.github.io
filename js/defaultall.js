/*
=====================================================================
=== 全局布局控制器 (Global Layout Controller) v3.1
=== 优化记录：
=== v3.1: 新增“首次点击时按需加载”机制，彻底解决因内容异步加载导致的“首次点击失效”问题。
=== v3.0: 重构事件绑定与内容管理逻辑。
=== v2.0: 新增“防抖(Debounce)”模式。
=== v1.0: 修复resize失效问题，为手机/平板创建独立功能区间。
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
 * 颜色替换函数 (独立出来，方便复用)
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
 * [核心] 内容复制器：负责将 #sidebar 的内容复制到抽屉中。
 * 返回一个 Promise，告知调用者是否复制成功。
 * @returns {Promise<boolean>}
 */
function cloneSidebarContent() {
    return new Promise((resolve) => {
        const originalSidebar = document.getElementById('sidebar');
        if (!originalSidebar) {
            resolve(false);
            return;
        }

        let attempts = 0;
        const maxAttempts = 20; // 尝试2秒
        const migrationInterval = setInterval(function () {
            attempts++;
            const contentSource = originalSidebar.querySelector('#scroll-1') || originalSidebar;

            if (contentSource.children.length > 0 || attempts >= maxAttempts) {
                clearInterval(migrationInterval);

                if (contentSource.children.length === 0) {
                    console.warn("Sidebar content source is empty after multiple attempts.");
                    resolve(false); // 内容源是空的，复制失败
                    return;
                }

                let mobileDrawer = document.getElementById('mobile-drawer-container');
                if (!mobileDrawer) {
                    mobileDrawer = document.createElement('div');
                    mobileDrawer.id = 'mobile-drawer-container';
                    document.body.appendChild(mobileDrawer);
                }

                mobileDrawer.innerHTML = ''; // 清空旧内容

                for (const child of contentSource.childNodes) {
                    const clonedNode = child.cloneNode(true);
                    mobileDrawer.appendChild(clonedNode);
                }

                conditionallyReplaceLinkColor(mobileDrawer);
                console.log("Sidebar content successfully cloned to drawer.");
                resolve(true); // 复制成功
            }
        }, 100);
    });
}

/**
 * 事件绑定器：只执行一次，为按钮和遮罩层绑定事件。
 * [新功能] 在点击事件中加入了“按需加载”的检查。
 */
function bindSidebarToggleEventsOnce() {
    const toggleButton = document.getElementById('sidebar-toggle-button');
    const overlay = document.getElementById('sidebar-overlay');

    if (toggleButton && overlay && !toggleButton.dataset.eventsBound) {

        async function toggleSidebar() {
            // --- 这是解决“首次点击失效”的核心逻辑 ---
            const mobileDrawer = document.getElementById('mobile-drawer-container');
            // 检查：1. 抽屉存在 2. 抽屉里没内容 3. 页面不是桌面宽度
            if (mobileDrawer && mobileDrawer.children.length === 0 && window.innerWidth < 1280) {
                console.log("Drawer is empty on first click, forcing content clone...");
                // 如果没内容，就立即、主动地执行一次内容复制
                await cloneSidebarContent();
            }
            // ------------------------------------------

            // 切换侧边栏的显示状态 (这个动作保持不变)
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
    if (window.innerWidth > 767) {
        return;
    }
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

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// === 模块2: 主执行逻辑 ===
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// 这个函数包含了所有需要在resize或加载时重新评估的逻辑
function onResizeOrLoad() {
    console.log("Layout check triggered by resize or load.");
    // 检查是否需要显示抽屉
    if (window.innerWidth < 1280) {
        // 如果是手机或平板模式，就执行内容复制
        cloneSidebarContent();
    }
    handleSpecialPageBackground();
}

// --- 页面加载时 ---
document.addEventListener('DOMContentLoaded', function () {
    // 1. [只执行一次] 绑定永久的点击事件，这个事件现在带有“按需加载”的智能检查
    bindSidebarToggleEventsOnce();
    // 2. [执行一次] 首次加载时，立即尝试更新一次内容
    onResizeOrLoad();
});

// --- 浏览器窗口大小改变时 ---
// 使用防抖模式来调用，以优化性能
window.addEventListener('resize', debounce(onResizeOrLoad, 250));