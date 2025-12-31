/*
=====================================================================
=== 文章列表交互模块 (Essay List Interaction Module) v2.0
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
    // 这个函数只操作原始ID，完全为电脑模式服务
    document.getElementById("hajimebutton").style.display = "block";
    document.getElementById("hattenbutton").style.display = "block";
    document.getElementById("tsuzukubutton").style.display = "block";
    document.getElementById("haneibutton").style.display = "block";
    document.getElementById("cubutton").style.display = "block";
    document.getElementById("wenttobutton").style.display = "block";
    document.getElementById("sanbutton").style.display = "block";
    document.getElementById("sanzibanyabutton").style.display = "block";
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
    // 这个函数是overstep的副本，但只操作带 "2" 后缀的ID
    document.getElementById("hajimebutton2").style.display = "block";
    document.getElementById("hattenbutton2").style.display = "block";
    document.getElementById("tsuzukubutton2").style.display = "block";
    document.getElementById("haneibutton2").style.display = "block";
    document.getElementById("cubutton2").style.display = "block";
    document.getElementById("wenttobutton2").style.display = "block";
    document.getElementById("sanbutton2").style.display = "block";
    document.getElementById("sanzibanyabutton2").style.display = "block";
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
    $(drawerContainer).find('[id]').each(function () {
        var oldId = $(this).attr('id');
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

    // c. 初始化抽屉内的状态：根据URL参数点击改造后的按钮
    //    这一步确保了即使页面加载时是手机模式，抽屉里的列表也能正确展开
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
// == 主逻辑: 初始化电脑版 ==
// =========================================================================
$(document).ready(function () {
    // 加载基础内容到电脑版的 #sidebar
    $('#sidebar').load("/js/list/essay.html", function (response, status, xhr) {
        if (status !== "success") {
            console.error("Essay Module: Failed to load /js/list/essay.html");
            return;
        }

        // 初始化电脑模式：根据URL参数点击原始按钮
        // 手机模式的状态将由布局控制器在克隆和改造后自行初始化
        var nenbun = getQueryVariable("nenbun");
        if (nenbun) {
            var desktopButtonId = nenbun + "button";
            var desktopButton = document.getElementById(desktopButtonId);
            if (desktopButton) {
                desktopButton.click();
            }
        }
    });
});