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


    try {
        let currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('civ', prefix);
        history.replaceState(null, '', currentUrl.toString());
    } catch (e) {
        console.error("更新URL时出错: ", e);
    }

    if (typeof triggerFilterFromURL === 'function') {
        triggerFilterFromURL();
    } else {
        console.warn("警告：函数 triggerFilterFromURL() 未定义，模拟加成部分可能不会更新。");
    }


    // --- 新增：处理拥有 spc_civ 前缀 class 的特殊文明元素 ---
    document.querySelectorAll('[class*="spc_civ"]').forEach(el => {

        // 找出所有以 spc_civ 开头的 class（可能有多个）
        const civClasses = Array.from(el.classList)
            .filter(c => c.startsWith("spc_civ"));

        if (civClasses.length === 0) return;

        // 当前元素所有文明代码（["eng", "mac"]）
        const civCodes = civClasses.map(c => c.replace("spc_civ", ""));

        // 如果当前文明 prefix 存在于这个元素允许的文明列表 → 显示
        if (civCodes.includes(prefix)) {
            el.style.display = '';
        } else {
            el.style.display = 'none';
        }
    });


    // --- 新增：处理 notspc_civ 前缀（反向文明显示） ---
    document.querySelectorAll('[class*="notspc_"]').forEach(el => {

        // 找出所有以 notspc_ 开头的 class（可能有多个）
        const notCivClasses = Array.from(el.classList)
            .filter(c => c.startsWith("notspc_"));

        if (notCivClasses.length === 0) return;

        // 当前元素所有“禁止文明”代码，例如 ["chi","zxl"]
        const bannedCivs = notCivClasses.map(c => c.replace("notspc_", ""));

        // 如果当前文明在禁止列表中 → 隐藏，否则显示
        if (bannedCivs.includes(prefix)) {
            el.style.display = 'none';
        } else {
            el.style.display = '';
        }
    });

}

document.addEventListener('DOMContentLoaded', function () {
    const civ = getQueryVariable("civ");
    if (civ) {
        const initialButton = document.getElementById(`${civ}Button0`);

        if (initialButton) {
            setTimeout(function () {
                initialButton.click();
            }, 10);
        } else {
            console.warn(`页面加载警告：未能在页面上找到ID为 "${civ}Button0" 的按钮。`);
        }
    }
});