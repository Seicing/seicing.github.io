//
// aoe4button.js (已修复)
//

/**
 * 通用函数：隐藏所有文明的提示文本并将所有按钮变暗，然后高亮显示指定的文本和按钮。
 * @param {string} prefix - 文明的前缀 (e.g., 'rus', 'chi').
 * @param {string|number} num - 按钮和文本的数字后缀.
 */
function tipsg(prefix, num) {
    // 修复 #2: 隐藏所有文明的 text，并把所有文明的 button 透明度设为 0.3
    // 通过匹配 ID 格式 (例如 xxxButton0, yyyText1) 来识别所有相关元素
    document.querySelectorAll('[id]').forEach(el => {
        if (/^[a-z]{3}Text\d+$/.test(el.id)) {
            el.style.display = "none";
        }
        if (/^[a-z]{3}Button\d+$/.test(el.id)) {
            el.style.opacity = 0.3;
        }
    });

    // 显示目标 text 和高亮目标按钮
    const textEl = document.getElementById(`${prefix}Text${num}`);
    const btnEl = document.getElementById(`${prefix}Button${num}`);

    if (textEl) textEl.style.display = "block";
    if (btnEl) btnEl.style.opacity = 1;

    // 黑头链接修改
    const civ = prefix.substring(0, 3);
    const blacktou1 = document.querySelector("#blacktou1");
    const blacktou2 = document.querySelector("#blacktou2");
    if (blacktou1) blacktou1.href = `https://seicing.com/html/aoe2/index-aoe4units.html?civ=${civ}`;
    if (blacktou2) blacktou2.href = `https://seicing.com/html/aoe2/index-aoe4units.html?civ=${civ}`;

    // 修复 #1: 正确地更新 URL 中的 'civ' 参数，不破坏文件名或其他参数
    try {
        let currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('civ', civ);
        history.replaceState(null, '', currentUrl.toString());
    } catch (e) {
        console.error("更新URL失败: ", e);
    }

    // 触发过滤函数 (如果存在)
    if (typeof triggerFilterFromURL === 'function') {
        triggerFilterFromURL();
    }
}

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
 * 页面加载完成后执行的函数.
 * 根据 URL 中的 'civ' 和 'num' 参数自动点击对应的按钮.
 */
window.onload = function () {
    const civ = getQueryVariable("civ");
    if (!civ) return; // 如果 URL 中没有 'civ' 参数，则不执行任何操作

    const numParam = getQueryVariable("num");
    let nums = [];

    if (numParam) {
        // 支持逗号分隔的多个数字
        nums = numParam.split(',').map(n => n.trim()).filter(n => n !== '');
    }

    // 修复 #3: 根据 'num' 参数是否存在来决定点击哪个按钮
    if (nums.length > 0) {
        // 如果 URL 中有 'num' 参数, 则点击所有指定的按钮
        nums.forEach(n => {
            const btn = document.getElementById(`${civ}Button${n}`);
            if (btn) btn.click();
        });
    } else {
        // 如果 URL 中没有 'num' 参数, 则自动点击该 civ 的 Button0 作为默认项
        const defaultButton = document.getElementById(`${civ}Button0`);
        if (defaultButton) {
            defaultButton.click();
        }
    }
};

