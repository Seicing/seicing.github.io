/**
 * 从 URL 查询字符串中获取指定变量的值.
 * @param {string} variable - 要获取的参数名.
 * @returns {string|null} - 参数的值，如果不存在则返回 null.
 */
function getQueryVariable(variable) {
    const params = new URLSearchParams(window.location.search);
    return params.get(variable);
}

/**
 * 根据文明前缀，显示该文明的所有内容，并隐藏其他所有文明的内容。
 * @param {string} prefix - 要显示的文明的前缀 (例如 'chi', 'rus').
 */
function showCiv(prefix) {
    // 遍历页面上所有带有ID的元素
    document.querySelectorAll('[id]').forEach(el => {
        // 使用正则表达式匹配我们关心的元素ID格式 (例如 chiButton0, rusText1)
        const match = el.id.match(/^([a-z]{3})(Button|Text)\d+$/);

        if (match) {
            const currentCiv = match[1];   // 提取当前元素的文明前缀 (chi)
            const elementType = match[2]; // 提取元素类型 (Button 或 Text)

            // 检查当前元素的文明是否是我们要显示的文明
            if (currentCiv === prefix) {
                // 是目标文明 -> 显示它
                if (elementType === 'Text') {
                    el.style.display = 'block'; // 显示文本
                } else { // 'Button'
                    el.style.opacity = 1;       // 按钮完全不透明
                }
            } else {
                // 不是目标文明 -> 隐藏它
                if (elementType === 'Text') {
                    el.style.display = 'none';  // 隐藏文本
                } else { // 'Button'
                    el.style.opacity = 0.3;     // 按钮变暗
                }
            }
        }
    });

    // --- 更新附属信息 ---

    // 1. 更新黑头链接
    const blacktou1 = document.querySelector("#blacktou1");
    const blacktou2 = document.querySelector("#blacktou2");

    if (blacktou1) {
        let url = new URL(blacktou1.href, location.origin);
        url.searchParams.set("civ", prefix);
        blacktou1.href = url.toString();
    }
    if (blacktou2) {
        let url = new URL(blacktou2.href, location.origin);
        url.searchParams.set("civ", prefix);
        blacktou2.href = url.toString();
    }

    // 2. 更新 URL 中的 'civ' 参数
    try {
        let currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('civ', prefix);
        history.replaceState(null, '', currentUrl.toString());
    } catch (e) {
        console.error("更新URL时出错: ", e);
    }

    // --- 【重要修复】调用页面通用函数来更新“模拟加成”等依赖URL的部分 ---
    if (typeof triggerFilterFromURL === 'function') {
        triggerFilterFromURL();
    } else {
        console.warn("警告：函数 triggerFilterFromURL() 未定义，模拟加成部分可能不会更新。");
    }

    syncDisplayState();
}


/**
 * 使用 addEventListener 来确保脚本不会被其他脚本覆盖。
 * 'DOMContentLoaded' 事件在 HTML 文档加载和解析完成后就会触发。
 */
document.addEventListener('DOMContentLoaded', function () {
    const civ = getQueryVariable("civ");

    // 如果URL中存在civ参数 (例如 ?civ=mon)
    if (civ) {
        const initialButton = document.getElementById(`${civ}Button0`);

        // 确认这个按钮真的存在
        if (initialButton) {
            // 使用一个极小的延迟来确保页面所有元素都渲染完毕
            setTimeout(function () {
                initialButton.click();
            }, 10);
        } else {
            console.warn(`页面加载警告：未能在页面上找到ID为 "${civ}Button0" 的按钮。`);
        }
    }
});

function syncDisplayState() {
    // 定义主元素和从属元素的对应关系
    const elementPairs = {
        'jpnText3': 'senText3-1',
        'jpnText2': 'senText2-1',
        'macText1': 'byzText1-1'
    };

    // 遍历每一对元素
    for (const sourceId in elementPairs) {
        const targetId = elementPairs[sourceId];

        const sourceEl = document.getElementById(sourceId);
        const targetEl = document.getElementById(targetId);

        // 确保两个元素都存在，避免出错
        if (sourceEl && targetEl) {
            // 使用 window.getComputedStyle 来获取元素最终的 display 状态
            // 这比 el.style.display 更可靠，因为它能读取到 CSS 类应用的样式
            const sourceDisplay = window.getComputedStyle(sourceEl).display;

            if (sourceDisplay === 'none') {
                // 如果主元素是隐藏的，也隐藏从属元素
                targetEl.style.display = 'none';
            } else {
                // 否则 (例如 'block'), 将从属元素设为 'table-cell'
                targetEl.style.display = 'table-row';
            }
        }
    }
}