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
    $.get("https://seicing.com/js/list/essay.html", function (htmlString) {
        try {
            // 1) parse HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');

            // 2) collect script nodes and remove them from the doc fragment
            const scriptNodes = Array.from(doc.querySelectorAll('script'));
            scriptNodes.forEach(s => s.parentNode && s.parentNode.removeChild(s));

            // 3) inject the non-script HTML into #sidebar
            const sidebar = document.getElementById('sidebar');
            if (!sidebar) {
                console.error('#sidebar not found');
                return;
            }
            sidebar.innerHTML = doc.body.innerHTML;

            // 4) helper to run scripts sequentially
            function runScriptsSequentially(list, idx = 0) {
                if (idx >= list.length) {
                    onAllScriptsExecuted();
                    return;
                }
                const s = list[idx];
                // external src
                const src = s.getAttribute && s.getAttribute('src');
                if (src) {
                    const scriptEl = document.createElement('script');
                    // keep the original attributes (language, type etc.) if present
                    if (s.type) scriptEl.type = s.type;
                    if (s.defer) scriptEl.defer = true;
                    scriptEl.src = src;
                    scriptEl.onload = () => runScriptsSequentially(list, idx + 1);
                    scriptEl.onerror = () => {
                        console.warn('Failed to load script:', src);
                        runScriptsSequentially(list, idx + 1);
                    };
                    document.head.appendChild(scriptEl);
                } else {
                    // inline script text: eval it in global scope safely
                    try {
                        // global eval: (0, eval)(...) ensures global scope eval
                        (0, eval)(s.textContent || s.innerText || '');
                    } catch (e) {
                        console.error('Inline script error:', e);
                    }
                    // next
                    setTimeout(() => runScriptsSequentially(list, idx + 1), 0);
                }
            }

            // 5) callback after scripts done: define safe overstep fallback, clone & auto-open
            function onAllScriptsExecuted() {
                // Ensure overstep exists and is robust (if not defined by loaded scripts)
                if (typeof window.overstep !== 'function') {
                    window.overstep = function (buttonId, divId) {
                        const clickedButton = document.getElementById(buttonId);
                        if (!clickedButton) { console.warn('overstep: button not found', buttonId); return; }
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
                }

                // Now clone sidebar into drawer (safe: DOM is present and scripts already ran)
                try {
                    if (typeof cloneSidebarContent === 'function') {
                        cloneSidebarContent();
                    } else {
                        console.warn('cloneSidebarContent() not found; skipping clone.');
                    }
                } catch (e) {
                    console.error('cloneSidebarContent exception:', e);
                }

                // Auto-open nenbun if present
                try {
                    const nenbun = getQueryVariable && getQueryVariable('nenbun');
                    if (nenbun) {
                        const btnId = nenbun + 'button';

                        // trigger sidebar button if exists
                        const sbBtn = document.getElementById(btnId);
                        if (sbBtn) {
                            // allow any bound handlers to run
                            sbBtn.click();
                        }

                        // also try the cloned drawer button after a short delay
                        setTimeout(function () {
                            const drawer = document.getElementById('mobile-drawer-container');
                            if (drawer) {
                                const clonedBtn = drawer.querySelector('#' + btnId);
                                if (clonedBtn) clonedBtn.click();
                            }
                        }, 250);
                    }
                } catch (e) {
                    console.error('Auto-open nenbun error:', e);
                }
            }

            // 6) start running extracted scripts in order
            runScriptsSequentially(scriptNodes);
        } catch (err) {
            console.error('Failed to load/parse essay.html:', err);
        }
    }).fail(function () {
        console.error('Failed to GET essay.html');
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
