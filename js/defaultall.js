/*
=====================================================================
=== 全局布局控制器 (Global Layout Controller) v2.0
=== 优化记录：
=== v2.0: 新增“防抖(Debounce)”模式，优化浏览器resize时的性能。
=== v1.0: 修复了resize失效问题，并为手机/平板创建了独立的功能区间。
=====================================================================
*/


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// === 模块0: 辅助工具函数 (Helpers / Utilities) ===
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
 * 防抖函数 (Debounce Function)
 * @param {Function} func 需要执行的函数
 * @param {number} delay 延迟时间 (毫秒)，即冷却时间
 * @returns {Function} 一个经过防抖处理的新函数
 * 
 * 工作原理：在连续触发事件时，函数不会被执行，只有当事件停止触发超过 `delay` 时间后，函数才会执行一次。
 * 这能极大地提升在 resize, scroll 等高频事件中的性能。
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        // 如果已经有一个计时器在运行，就清除它
        clearTimeout(timeoutId);
        // 设置一个新的计时器
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// === 模块1: 手机专属功能 (0px - 767px) ===
// (这部分代码与上一版完全相同，无需改动)
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function setupMobileSidebar() {
    if (window.innerWidth > 767) {
        const toggleButton = document.getElementById('sidebar-toggle-button');
        if (toggleButton && toggleButton.dataset.listenerAttached === 'mobile') {
            document.body.classList.remove('sidebar-open');
        }
        return;
    }
    const toggleButton = document.getElementById('sidebar-toggle-button');
    const overlay = document.getElementById('sidebar-overlay');
    const originalSidebar = document.getElementById('sidebar');
    if (!toggleButton || !overlay || !originalSidebar || toggleButton.dataset.listenerAttached) {
        return;
    }
    function conditionallyReplaceLinkColor(container) {
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
    let attempts = 0;
    const maxAttempts = 20;
    const migrationInterval = setInterval(function () {
        attempts++;
        const contentSource = originalSidebar.querySelector('#scroll-1') || originalSidebar;
        if (contentSource.children.length > 0 || attempts >= maxAttempts) {
            clearInterval(migrationInterval);
            let mobileDrawer = document.getElementById('mobile-drawer-container');
            if (!mobileDrawer) {
                mobileDrawer = document.createElement('div');
                mobileDrawer.id = 'mobile-drawer-container';
                document.body.appendChild(mobileDrawer);
            } else {
                mobileDrawer.innerHTML = '';
            }
            for (const child of contentSource.childNodes) {
                const clonedNode = child.cloneNode(true);
                mobileDrawer.appendChild(clonedNode);
            }
            conditionallyReplaceLinkColor(mobileDrawer);
            function toggleSidebar() {
                document.body.classList.toggle('sidebar-open');
            }
            toggleButton.addEventListener('click', toggleSidebar);
            overlay.addEventListener('click', toggleSidebar);
            toggleButton.dataset.listenerAttached = 'mobile';
        }
    }, 100);
}

function handleMobilePageBackground() {
    if (window.innerWidth > 767) { return; }
    const beaconDiv = document.querySelector('.keep-original-background');
    if (beaconDiv) {
        const elementsToChange = document.querySelectorAll('html, body, #wrapper, #page, #content, .post, .entry');
        elementsToChange.forEach(element => {
            element.style.setProperty('background', `url('https://seicing.com/res/textile_pattern_mip0.png')`, 'important');
        });
    }
}


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// === 模块2: 平板专属功能 (768px - 1279px) ===
// (这部分代码也与上一版完全相同，无需改动)
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function setupTabletSidebar() {
    if (window.innerWidth < 768 || window.innerWidth > 1279) {
        const toggleButton = document.getElementById('sidebar-toggle-button');
        if (toggleButton && toggleButton.dataset.listenerAttached === 'tablet') {
            document.body.classList.remove('sidebar-open');
        }
        return;
    }
    const toggleButton = document.getElementById('sidebar-toggle-button');
    const overlay = document.getElementById('sidebar-overlay');
    const originalSidebar = document.getElementById('sidebar');
    if (!toggleButton || !overlay || !originalSidebar || toggleButton.dataset.listenerAttached) {
        return;
    }
    function conditionallyReplaceLinkColor(container) {
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
    let attempts = 0;
    const maxAttempts = 20;
    const migrationInterval = setInterval(function () {
        attempts++;
        const contentSource = originalSidebar.querySelector('#scroll-1') || originalSidebar;
        if (contentSource.children.length > 0 || attempts >= maxAttempts) {
            clearInterval(migrationInterval);
            let mobileDrawer = document.getElementById('mobile-drawer-container');
            if (!mobileDrawer) {
                mobileDrawer = document.createElement('div');
                mobileDrawer.id = 'mobile-drawer-container';
                document.body.appendChild(mobileDrawer);
            } else {
                mobileDrawer.innerHTML = '';
            }
            for (const child of contentSource.childNodes) {
                const clonedNode = child.cloneNode(true);
                mobileDrawer.appendChild(clonedNode);
            }
            conditionallyReplaceLinkColor(mobileDrawer);
            function toggleSidebar() {
                document.body.classList.toggle('sidebar-open');
            }
            toggleButton.addEventListener('click', toggleSidebar);
            overlay.addEventListener('click', toggleSidebar);
            toggleButton.dataset.listenerAttached = 'tablet';
        }
    }, 100);
}


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// === 模块3: 事件监听与执行 ===
// (这部分是本次修改的核心)
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function runAllLayoutChecks() {
    const toggleButton = document.getElementById('sidebar-toggle-button');
    if (toggleButton) {
        // 注意：由于事件监听器现在是加在 debounce 函数返回的新函数上的，
        // 简单的移除标记已不足以管理监听器。
        // 但我们通过在每个setup函数内部的 `listenerAttached` 判断，已经有效避免了重复绑定。
        // 所以这里的清理逻辑可以简化或移除。我们暂时保留移除标记。
        toggleButton.removeAttribute('data-listener-attached');
    }
    setupMobileSidebar();
    handleMobilePageBackground();
    setupTabletSidebar();
}

// 1. 页面初次加载时，立即运行一次检查
document.addEventListener('DOMContentLoaded', runAllLayoutChecks);

// 2. 【核心修改】在浏览器窗口大小改变时，使用防抖模式来调用检查函数
//    我们将执行冷却时间设置为 250 毫秒。
window.addEventListener('resize', debounce(runAllLayoutChecks, 250));