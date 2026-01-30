/*
=====================================================================
=== Essay List Interaction Module v2.0 (SAFE PATCH)
=====================================================================
*/

function getQueryVariable(variable) {
    const query = window.location.search.substring(1).split('&');
    for (const pair of query) {
        const [k, v] = pair.split('=');
        if (k === variable) return v;
    }
    return false;
}

// ====== 电脑模式 ======
function overstep(a, b) {
    [
        'hajime', 'hatten', 'tsuzuku', 'hanei', 'cu', 'wentto', 'san', 'zibanya'
    ].forEach(k => {
        const btn = document.getElementById(k + 'button');
        const div = document.getElementById(k + 'div');
        if (btn) btn.style.display = 'block';
        if (div) div.style.display = 'none';
    });

    const hideBtn = document.getElementById(a);
    const showDiv = document.getElementById(b);
    if (hideBtn) hideBtn.style.display = 'none';
    if (showDiv) showDiv.style.display = 'block';
}

// ====== 手机模式 ======
function overstep2(a, b) {
    [
        'hajime', 'hatten', 'tsuzuku', 'hanei', 'cu', 'wentto', 'san', 'zibanya'
    ].forEach(k => {
        const btn = document.getElementById(k + 'button2');
        const div = document.getElementById(k + 'div2');
        if (btn) btn.style.display = 'block';
        if (div) div.style.display = 'none';
    });

    const hideBtn = document.getElementById(a);
    const showDiv = document.getElementById(b);
    if (hideBtn) hideBtn.style.display = 'none';
    if (showDiv) showDiv.style.display = 'block';
}

// ====== 抽屉克隆安全改造 ======
function transformClonedEssayList(drawerContainer) {
    if (!drawerContainer) return;

    // ★ 防止重复执行
    if (drawerContainer.dataset.transformed) return;
    drawerContainer.dataset.transformed = 'true';

    // 改 ID
    drawerContainer.querySelectorAll('[id]').forEach(el => {
        if (el.id) el.id = el.id + '2';
    });

    // 改 onclick
    drawerContainer.querySelectorAll('[onclick*="overstep"]').forEach(el => {
        const attr = el.getAttribute('onclick');
        if (!attr) return;
        el.setAttribute(
            'onclick',
            attr.replace(
                /overstep\s*\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/g,
                (_, p1, p2) => `overstep2('${p1}2','${p2}2')`
            )
        );
    });

    // URL 参数初始化
    const nenbun = getQueryVariable('nenbun');
    if (nenbun) {
        const btn = document.getElementById(nenbun + 'button2');
        if (btn) btn.click();
    }
}

// ====== 原 sidebar 加载 ======
$(document).ready(() => {
    $('#sidebar').load('/js/list/essay.html', (res, status) => {
        if (status !== 'success') return;

        const nenbun = getQueryVariable('nenbun');
        if (nenbun) {
            const btn = document.getElementById(nenbun + 'button');
            if (btn) btn.click();
        }
    });
});
