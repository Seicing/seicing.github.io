/*
=====================================================================
=== 文章列表交互模块 (Essay List Interaction Module) v2.1 (修复兼容版)
=== (专为 Global Layout Controller v4.0+ 集成设计)
=====================================================================
*/

/**
 * 从 URL 查询字符串中获取变量值
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}


// =========================================================================
// == 系统 1: 电脑模式专用函数 ==
// =========================================================================
function overstep(a, b) {
    document.getElementById("hajimebutton").style.display = "block";
    document.getElementById("hattenbutton").style.display = "block";
    document.getElementById("tsuzukubutton").style.display = "block";
    document.getElementById("haneibutton").style.display = "block";
    document.getElementById("cubutton").style.display = "block";
    document.getElementById("wenttobutton").style.display = "block";
    document.getElementById("sanbutton").style.display = "block";
    document.getElementById("zibanyabutton").style.display = "block";
    document.getElementById(a).style.display = "none";
    document.getElementById("hajimediv").style.display = "none";
    document.getElementById("hattendiv").style.display = "none";
    document.getElementById("tsuzukudiv").style.display = "none";
    document.getElementById("haneidiv").style.display = "none";
    document.getElementById("cudiv").style.display = "none";
    document.getElementById("wenttodiv").style.display = "none";
    document.getElementById("sandiv").style.display = "none";
    document.getElementById("zibanyadiv").style.display = "none";
    document.getElementById(b).style.display = "block";
}


// =========================================================================
// == 系统 2: 手机/平板模式专用函数 ==
// =========================================================================
function overstep2(a, b) {
    document.getElementById("hajimebutton2").style.display = "block";
    document.getElementById("hattenbutton2").style.display = "block";
    document.getElementById("tsuzukubutton2").style.display = "block";
    document.getElementById("haneibutton2").style.display = "block";
    document.getElementById("cubutton2").style.display = "block";
    document.getElementById("wenttobutton2").style.display = "block";
    document.getElementById("sanbutton2").style.display = "block";
    document.getElementById("zibanyabutton2").style.display = "block";
    document.getElementById(a).style.display = "none";
    document.getElementById("hajimediv2").style.display = "none";
    document.getElementById("hattendiv2").style.display = "none";
    document.getElementById("tsuzukudiv2").style.display = "none";
    document.getElementById("haneidiv2").style.display = "none";
    document.getElementById("cudiv2").style.display = "none";
    document.getElementById("wenttodiv2").style.display = "none";
    document.getElementById("sandiv2").style.display = "none";
    document.getElementById("zibanyadiv2").style.display = "none";
    document.getElementById(b).style.display = "block";
}


// =========================================================================
// == 【核心】改造函数，由布局控制器在克隆后调用 ==
// =========================================================================
/**
 * 对克隆到抽屉的文章列表副本进行“双系统”改造。
 * @param {HTMLElement} drawerContainer - 包含副本内容的抽屉容器元素。
 */
function transformClonedEssayList(drawerContainer) {
    if (!drawerContainer) return;

    console.log("Essay Module: Transforming cloned content inside", drawerContainer.id);

    // a. 改造抽屉内部的所有ID，加上后缀 "2"
    // 【修改点 1】特例排除 bigfonter 和 darkmoder，保留原始 ID，防止 defaultall.js 找不到
    $(drawerContainer).find('[id]').each(function () {
        var oldId = $(this).attr('id');
        if (oldId === 'bigfonter' || oldId === 'darkmoder') {
            // 给它们保留原 ID 的同时，加上 class 辅助识别
            $(this).addClass(oldId + '2');
            return;
        }
        $(this).attr('id', oldId + '2');
    });

    // b. 改造抽屉内部的所有onclick事件
    $(drawerContainer).find('[onclick*="overstep"]').each(function () {
        var onclickAttr = $(this).attr('onclick');
        if (onclickAttr) {
            var newOnclickAttr = onclickAttr.replace(
                /overstep\s*\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/g,
                function (match, p1, p2) {
                    return "overstep2('" + p1 + "2', '" + p2 + "2')";
                }
            );
            $(this).attr('onclick', newOnclickAttr);
        }
    });

    // c. 初始化抽屉内的状态
    var nenbun = getQueryVariable("nenbun");
    if (nenbun) {
        var mobileButtonId = nenbun + "button2";
        var mobileButton = document.getElementById(mobileButtonId);
        if (mobileButton) {
            mobileButton.click();
        }
    }
}


// =========================================================================
// == 主逻辑: 初始化电脑版 & 字体按键兼容补丁 ==
// =========================================================================
$(document).ready(function () {
    // 加载基础内容到电脑版的 #sidebar
    $('#sidebar').load("/js/list/essay.html", function (response, status, xhr) {
        if (status !== "success") {
            console.error("Essay Module: Failed to load /js/list/essay.html");
            return;
        }

        // 初始化电脑模式：根据URL参数点击原始按钮
        var nenbun = getQueryVariable("nenbun");
        if (nenbun) {
            var desktopButtonId = nenbun + "button";
            var desktopButton = document.getElementById(desktopButtonId);
            if (desktopButton) {
                desktopButton.click();
            }
        }
    });

    // =========================================================================
    // 【修改点 2】专门补救 defaultall.js 漏掉的 #bigfonter2 / 移动端大字体点击
    // =========================================================================
    $(document).on('click', '#bigfonter, #bigfonter2, .bigfonter2', function () {
        // 读取当前字体状态
        var currentFont = 'small';
        try { currentFont = localStorage.getItem('fontSize') || 'small'; } catch (e) { }

        var newFont = (currentFont === 'big') ? 'small' : 'big';
        try { localStorage.setItem('fontSize', newFont); } catch (e) { }

        // 强行应用字体（不仅改 body，也强制应用到主要内容容器，解决 CSS 被覆盖问题）
        var targetFontSize = (newFont === 'big') ? '12pt' : '9pt';
        document.body.style.fontSize = targetFontSize;

        $('#wrapper, #page, #content, .entry, .post, td, p').css('font-size', (newFont === 'big') ? '12pt' : '');

        // 强行更新按钮高亮颜色
        var isLavi = $(document.body).hasClass('lavilavivagnar');
        var activeColor = isLavi ? 'rgb(0, 255, 172)' : 'var(--btn-active-color)';
        var inactiveColor = isLavi ? '#ffffff' : 'var(--btn-inactive-color)';

        $('#bigfonter, #bigfonter2, .bigfonter2').css('color', newFont === 'big' ? activeColor : inactiveColor);
    });
});

// 在 essay.js 最底部添加：不用等待 DOMContentLoaded，直接全局绑定
$(document).on('click', '#bigfonter', function (e) {
    e.preventDefault();
    var currentFont = 'small';
    try { currentFont = localStorage.getItem('fontSize') || 'small'; } catch (err) { }

    var newFont = (currentFont === 'big') ? 'small' : 'big';
    try { localStorage.setItem('fontSize', newFont); } catch (err) { }

    // 应用字号
    document.body.style.fontSize = (newFont === 'big') ? '12pt' : '9pt';

    // 强行刷新按钮颜色
    var isLavi = $(document.body).hasClass('lavilavivagnar');
    var activeColor = isLavi ? 'rgb(0, 255, 172)' : 'var(--btn-active-color)';
    var inactiveColor = isLavi ? '#ffffff' : 'var(--btn-inactive-color)';
    $('#bigfonter').css('color', newFont === 'big' ? activeColor : inactiveColor);
});