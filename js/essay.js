/**
 * 从 URL 查询字符串中获取变量值
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
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
    document.getElementById(a).style.display = "none";
    document.getElementById("hajimediv").style.display = "none";
    document.getElementById("hattendiv").style.display = "none";
    document.getElementById("tsuzukudiv").style.display = "none";
    document.getElementById("haneidiv").style.display = "none";
    document.getElementById("cudiv").style.display = "none";
    document.getElementById("wenttodiv").style.display = "none";
    document.getElementById("sandiv").style.display = "none";
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
    document.getElementById(a).style.display = "none";
    document.getElementById("hajimediv2").style.display = "none";
    document.getElementById("hattendiv2").style.display = "none";
    document.getElementById("tsuzukudiv2").style.display = "none";
    document.getElementById("haneidiv2").style.display = "none";
    document.getElementById("cudiv2").style.display = "none";
    document.getElementById("wenttodiv2").style.display = "none";
    document.getElementById("sandiv2").style.display = "none";
    document.getElementById(b).style.display = "block";
}


// =========================================================================
// == 主逻辑: 初始化、复制和改造 ==
// =========================================================================
$(document).ready(function () {

    // !!! 【重要】请将 "#sidebar-drawer" 替换为您手机/平板模式下实际的抽屉容器的选择器 (ID或class) !!!
    var mobileDrawerSelector = "#sidebar-drawer"; // 例如: "#offcanvas-sidebar", ".mobile-nav-content" 等

    // 1. 加载基础内容到电脑版的 #sidebar
    $('#sidebar').load("/js/list/essay.html", function (response, status, xhr) {
        if (status !== "success") {
            console.error("加载 /js/list/essay.html 失败, 无法初始化侧边栏。");
            return;
        }

        // 2. 初始化电脑模式：根据URL参数点击原始按钮
        var nenbun = getQueryVariable("nenbun");
        if (nenbun) {
            var desktopButtonId = nenbun + "button";
            var desktopButton = document.getElementById(desktopButtonId);
            if (desktopButton) {
                desktopButton.click();
            }
        }

        // 3. 创建并改造手机/平板模式的副本
        var drawer = $(mobileDrawerSelector);
        if (drawer.length > 0) {
            // a. 复制 #sidebar 的当前HTML内容到抽屉容器
            drawer.html($('#sidebar').html());

            // b. 改造抽屉内部的所有ID，加上后缀 "2"
            drawer.find('[id]').each(function () {
                var oldId = $(this).attr('id');
                $(this).attr('id', oldId + '2');
            });

            // c. 改造抽屉内部的所有onclick事件
            drawer.find('[onclick*="overstep"]').each(function () {
                var onclickAttr = $(this).attr('onclick');
                if (onclickAttr) {
                    // 将 overstep('arg1', 'arg2') 替换为 overstep2('arg1' + '2', 'arg2' + '2')
                    var newOnclickAttr = onclickAttr.replace(
                        /overstep\s*\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/g,
                        function (match, p1, p2) {
                            return "overstep2('" + p1 + "2', '" + p2 + "2')";
                        }
                    );
                    $(this).attr('onclick', newOnclickAttr);
                }
            });
        }
    });
});