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
    $('#sidebar').load("/js/list/list_essay.html", function (response, status, xhr) {
        if (status !== "success") {
            console.error("Essay Module: Failed to load /js/list/list_essay.html");
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

        // =============================================================
        // == 根据 <script> 标签的 data-click-id 自动点击指定按钮
        // =============================================================
        //
        // 页面中可以这样使用：
        //
        // <script src="https://seicing.com/js/essay.js" data-click-id="hajimebutton"></script>
        //
        // 加载 list_essay.html 完成后，会自动点击 #hajimebutton
        //
        // =============================================================

        var essayScript = document.querySelector(
            'script[src*="essay.js"][data-click-id]'
        );

        if (essayScript) {
            var clickId = essayScript.getAttribute("data-click-id");
            var clickButton = document.getElementById(clickId);

            if (clickButton) {
                // 按钮已经存在，直接点击
                clickButton.click();
            } else {
                // 按钮暂时不存在，等待动态加载
                var clickTimer = setInterval(function () {
                    var btn = document.getElementById(clickId);

                    if (btn) {
                        clearInterval(clickTimer);
                        btn.click();
                    }
                }, 50);

                // 最多等待10秒
                setTimeout(function () {
                    clearInterval(clickTimer);
                }, 10000);
            }
        }
    });



});