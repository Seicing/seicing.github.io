function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

/**
 * @description: 为复制的侧边栏元素ID添加后缀，并更新其onclick事件。
 * @param {string} containerSelector - 复制后内容的容器的选择器 (例如 '#mobile-sidebar' 或 '.mobile-container')。
 * @param {string} suffix - 要添加到ID后面的后缀 (例如 '_mobile')。
 */
function fixClonedSidebar(containerSelector, suffix) {
    var container = $(containerSelector);
    if (container.length === 0) {
        // 如果找不到容器，就在控制台打印一条消息并且不做任何事。
        console.warn("无法找到用于修复ID的复制容器: " + containerSelector);
        return;
    }

    // 1. 为容器内所有带id的元素添加后缀
    container.find('[id]').each(function () {
        var oldId = $(this).attr('id');
        $(this).attr('id', oldId + suffix);
    });

    // 2. 更新容器内所有按钮的onclick属性，使其调用带有新ID的overstep函数
    container.find('[onclick*="overstep"]').each(function () {
        var onclickAttr = $(this).attr('onclick');
        if (onclickAttr) {
            // 使用正则表达式替换overstep函数中的参数，为它们加上后缀
            var newOnclickAttr = onclickAttr.replace(/overstep\s*\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/g, function (match, p1, p2) {
                return "overstep('" + p1 + suffix + "', '" + p2 + suffix + "')";
            });
            $(this).attr('onclick', newOnclickAttr);
        }
    });
}


$(document).ready(function () {
    $('#sidebar').load("https://seicing.com/js/list/essay.html", function () {
        // --- 核心修改部分 ---
        // 在这里，我们假设用于手机模式的、复制出来的列表被放在一个
        // class 为 "mobile-sidebar" 的容器里。
        // !!! 请将 ".mobile-sidebar" 替换成您实际使用的容器选择器 !!!
        var mobileSidebarSelector = ".mobile-sidebar";
        fixClonedSidebar(mobileSidebarSelector, "_mobile");

        var tipsp1 = getQueryVariable("nenbun");
        if (tipsp1) {
            // 检查手机版容器是否存在，来判断当前是否是手机模式
            if ($(mobileSidebarSelector).length > 0) {
                // 如果是手机模式，点击带有后缀的按钮
                var tipsp2_mobile = tipsp1 + "button_mobile";
                var mobileButton = document.getElementById(tipsp2_mobile);
                if (mobileButton) {
                    mobileButton.click();
                }
            } else {
                // 否则，按原逻辑点击普通按钮
                var tipsp2 = tipsp1 + "button";
                var desktopButton = document.getElementById(tipsp2);
                if (desktopButton) {
                    desktopButton.click();
                }
            }
        }
    })
})

function overstep(a, b) {
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