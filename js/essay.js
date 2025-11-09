/*
=====================================================================
=== Essay Sidebar Controller v5.1 (2025)
=== 特点：
=== - 动态加载 essay.html 内容
=== - 自动展开 nenbun 对应分区
=== - 支持移动抽屉克隆（带 _clone 后缀避免 ID 冲突）
=== - 原 sidebar 与 drawer 独立运行互不干扰
=====================================================================
*/

function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] === variable) return pair[1];
    }
    return false;
}

/**
 * 全局 overstep 控制函数
 * 支持 sidebar 与 drawer 各自独立展开/收起
 */
window.overstep = function (buttonId, divId) {
    const clickedButton = document.getElementById(buttonId);
    if (!clickedButton) {
        console.warn("overstep(): button not found:", buttonId);
        return;
    }

    const container = clickedButton.closest('#sidebar, #mobile-drawer-container') || document;

    const prefixes = ["hajime", "hatten", "tsuzuku", "hanei", "cu", "wentto", "san"];
    for (const prefix of prefixes) {
        const btn = container.querySelector(`#${prefix}button`);
        const div = container.querySelector(`#${prefix}div`);
        if (btn) btn.style.display = "block";
        if (div) div.style.display = "none";
    }

    const activeBtn = container.querySelector(`#${buttonId}`);
    const activeDiv = container.querySelector(`#${divId}`);
    if (activeBtn) activeBtn.style.display = "none";
    if (activeDiv) activeDiv.style.display = "block";
};

/**
 * 替换链接颜色（原功能保持）
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
 * 克隆 sidebar 内容到 mobile drawer
 * 自动给所有 id 加上 _clone 后缀，并修正 onclick 参数
 */
function cloneSidebarContent() {
    const originalSidebar = document.getElementById('sidebar');
    if (!originalSidebar) return;

    let attempts = 0;
    const maxAttempts = 20;

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

            mobileDrawer.innerHTML = ''; // 清空旧内容
            const clone = contentSource.cloneNode(true);

            // 🧩 1. 所有带 id 的元素加 _clone
            clone.querySelectorAll('[id]').forEach(el => {
                el.id = el.id + '_clone';
            });

            // 🧩 2. 修正 onclick 中 overstep 参数
            clone.querySelectorAll('[onclick]').forEach(el => {
                let code = el.getAttribute('onclick');
                if (code.includes("overstep(")) {
                    code = code.replace(/'([^']+)'/g, "'$1_clone'");
                    el.setAttribute('onclick', code);
                }
            });

            // 🧩 3. 插入到抽屉
            mobileDrawer.appendChild(clone);

            // 🧩 4. 替换颜色
            conditionallyReplaceLinkColor(mobileDrawer);

            console.log("✅ Sidebar cloned successfully with _clone suffix IDs.");
        }
    }, 100);
}

/**
 * 主入口逻辑：加载 essay.html 后自动展开并克隆
 */
$(document).ready(function () {
    $('#sidebar').load("https://seicing.com/js/list/essay.html", function () {
        // ✅ Step 1: 加载完成后克隆 sidebar
        setTimeout(() => {
            cloneSidebarContent();
        }, 200);

        // ✅ Step 2: 自动展开 nenbun 对应分区
        const nenbun = getQueryVariable("nenbun");
        if (nenbun) {
            const buttonId = nenbun + "button";
            const sidebarButton = document.getElementById(buttonId);
            if (sidebarButton) sidebarButton.click();

            // 等克隆完成后同步展开 drawer
            setTimeout(() => {
                const drawer = document.getElementById('mobile-drawer-container');
                if (drawer) {
                    const clonedButton = drawer.querySelector(`#${buttonId}_clone`);
                    if (clonedButton) clonedButton.click();
                }
            }, 800);
        }
    });
});
