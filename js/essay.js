/*
=====================================================================
===  Essay Sidebar / Drawer Controller v5.0 (2025)
===  统一控制 sidebar 与 mobile drawer 展开逻辑
===  特性：
===  - 支持 jQuery 动态加载
===  - 自动匹配对应 nenbun 段展开
===  - 抽屉与侧边栏独立运行、互不干扰
===  - 无重复ID冲突问题
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
 * [核心] 多实例版本 overstep()
 * - 自动基于点击来源查找对应容器（sidebar 或 drawer）
 * - 不依赖全局 ID，防止克隆冲突
 */
window.overstep = function (buttonId, divId) {
    const clickedButton = document.getElementById(buttonId);
    if (!clickedButton) {
        console.warn("未找到按钮:", buttonId);
        return;
    }

    // 定位该按钮所属容器
    const container = clickedButton.closest('#sidebar, #mobile-drawer-container') || document;

    // 需要控制的年份段 ID 前缀
    const prefixes = ["hajime", "hatten", "tsuzuku", "hanei", "cu", "wentto", "san"];

    // 先重置全部：显示所有按钮，隐藏全部 div
    for (const prefix of prefixes) {
        const btn = container.querySelector(`#${prefix}button`);
        const div = container.querySelector(`#${prefix}div`);
        if (btn) btn.style.display = "block";
        if (div) div.style.display = "none";
    }

    // 当前展开的部分
    const activeBtn = container.querySelector(`#${buttonId}`);
    const activeDiv = container.querySelector(`#${divId}`);

    if (activeBtn) activeBtn.style.display = "none";
    if (activeDiv) activeDiv.style.display = "block";
};

/**
 * [初始化逻辑]
 * 1️⃣ 动态加载 essay.html 内容进 sidebar
 * 2️⃣ 根据 nenbun 参数自动展开对应分区
 * 3️⃣ 兼容移动抽屉（mobile-drawer-container）与 sidebar 两份实例
 */
$(document).ready(function () {
    $('#sidebar').load("https://seicing.com/js/list/essay.html", function () {
        // ✅ step 1: essay.html 加载完成后再克隆一次 sidebar（确保内容完整）
        setTimeout(() => {
            cloneSidebarContent();
        }, 100);

        // ✅ step 2: 自动展开 URL 对应 nenbun 段
        const nenbun = getQueryVariable("nenbun");
        if (nenbun) {
            const buttonId = nenbun + "button";

            // 先在原 sidebar 内触发
            const sidebarButton = document.getElementById(buttonId);
            if (sidebarButton) sidebarButton.click();

            // 稍微延迟一下再同步抽屉
            setTimeout(() => {
                const drawer = document.getElementById('mobile-drawer-container');
                if (drawer) {
                    const clonedButton = drawer.querySelector(`#${buttonId}`);
                    if (clonedButton) clonedButton.click();
                }
            }, 300);
        }
    });
});


/**
 * [防止加载顺序问题]
 * 这个监听确保在 sidebar 内容克隆到 mobile drawer 后，
 * 所有 overstep() 点击在抽屉中都能立即响应。
 */
document.addEventListener("click", function (e) {
    const target = e.target;
    if (target.tagName === "A" && target.getAttribute("onclick")?.includes("overstep")) {
        // 确保点击响应在克隆环境也能执行
        const onclickValue = target.getAttribute("onclick");
        try {
            // 例如 onclick="overstep('cubutton','cudiv')"
            const match = onclickValue.match(/overstep\('([^']+)','([^']+)'\)/);
            if (match) overstep(match[1], match[2]);
        } catch (err) {
            console.error("overstep 执行出错:", err);
        }
        e.preventDefault();
    }
});
