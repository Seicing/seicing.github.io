function tipsg(prefix, num) {
    // 隐藏所有 text 和 button
    document.querySelectorAll(`[id^="${prefix}Text"]`).forEach(el => el.style.display = "none");
    document.querySelectorAll(`[id^="${prefix}Button"]`).forEach(el => el.style.opacity = 0.3);

    // 显示目标 text 和按钮
    const textEl = document.getElementById(`${prefix}Text${num}`);
    const btnEl = document.getElementById(`${prefix}Button${num}`);

    if (textEl) textEl.style.display = "block";
    if (btnEl) btnEl.style.opacity = 1;

    // 黑头链接修改
    const civ = prefix.substring(0, 3); // rus / chi / eng ...
    document.querySelector("#blacktou1").href = `https://seicing.com/html/aoe2/index-aoe4units.html?civ=${civ}`;
    document.querySelector("#blacktou2").href = `https://seicing.com/html/aoe2/index-aoe4units.html?civ=${civ}`;

    // 改 URL
    let newUrl = window.location.href.replace(/[^/]+$/, civ);
    history.replaceState("stateObj", "title", newUrl);

    triggerFilterFromURL();
}

function getQueryVariable(variable) {
    const params = new URLSearchParams(window.location.search);
    return params.get(variable);
}

window.onload = function () {
    const civ = getQueryVariable("civ");
    if (!civ) return;

    const numParam = getQueryVariable("num");
    let nums = [];

    if (numParam) {
        // 支持逗号分隔的多个数字
        nums = numParam.split(',').map(n => n.trim()).filter(n => n !== '');
    } else {
        // 如果没传 num 参数，则自动点击该 civ 所有按钮
        document.querySelectorAll(`[id^="${civ}Button"]`).forEach(btn => btn.click());
        return;
    }

    // 点击指定数字后缀的按钮
    nums.forEach(n => {
        const btn = document.getElementById(`${civ}Button${n}`);
        if (btn) btn.click();
    });

    // 更新 URL 中的 civ 参数，不改变其它部分
    let newUrl = new URL(window.location.href);  // 创建一个新的 URL 对象
    newUrl.searchParams.set('civ', civ);  // 设置新的 civ 参数值
    history.replaceState("stateObj", "title", newUrl.toString());  // 更新 URL

    // 自动点击 Button0（如果有的话）
    const civButton0 = document.getElementById(`${civ}Button0`);
    if (civButton0) {
        civButton0.click(); // 自动触发 Button0 点击
    }
};
