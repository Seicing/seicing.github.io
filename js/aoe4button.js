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
    document.querySelectorAll('[id]').forEach(el => {
        const match = el.id.match(/^([a-z]{3})(Button|Text)\d+$/);

        if (!match) return;

        const currentCiv = match[1];
        const elementType = match[2];

        if (elementType === 'Button') {
            // 按钮互斥处理
            if (currentCiv === prefix) {
                // 激活按钮 → 添加 active
                el.classList.add('active');
                el.classList.add('filterbtn');  // 保证基础类存在
            } else {
                // 非激活按钮 → 移除 active
                el.classList.remove('active');
                el.classList.add('filterbtn');  // 保证基础类存在
            }
        } else {
            // 文本显示逻辑保持不变
            el.style.display = currentCiv === prefix ? 'block' : 'none';
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


    // --- 新增：处理 not_civ 前缀（反向文明显示） ---
    document.querySelectorAll('[class*="not_civ"]').forEach(el => {

        // 找出所有以 notspc_ 开头的 class（可能有多个）
        const notCivClasses = Array.from(el.classList)
            .filter(c => c.startsWith("not_civ"));

        if (notCivClasses.length === 0) return;

        // 当前元素所有“禁止文明”代码，例如 ["chi","zxl"]
        const bannedCivs = notCivClasses.map(c => c.replace("not_civ", ""));

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
    if (!civ) return;

    const tryActivate = () => {
        const btn = document.getElementById(`${civ}Button0`);
        if (btn) {
            showCiv(civ); // 直接调用函数，设置 active class
        } else {
            // 50ms 后再尝试，直到按钮渲染完
            setTimeout(tryActivate, 50);
        }
    };

    tryActivate();
});
