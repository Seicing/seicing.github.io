/**
 * 从 URL 查询字符串中获取变量值
 * @param {string} variable - 要查找的变量名
 * @returns {string|boolean} - 返回变量的值，如果找不到则返回 false
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

/**
 * 切换内容区域的显示
 * @param {string} buttonIdToHide - 要隐藏的按钮的 ID
 * @param {string} divIdToShow - 要显示的内容区域的 ID
 */
function overstep(buttonIdToHide, divIdToShow) {
    // 首先，将所有按钮和内容区域恢复到初始状态
    // 请确保这些ID与您 essay.html 中的ID完全对应
    var buttons = ["hajimebutton", "hattenbutton", "tsuzukubutton", "haneibutton", "cubutton", "wenttobutton", "sanbutton"];
    var divs = ["hajimediv", "hattendiv", "tsuzukudiv", "haneidiv", "cudiv", "wenttodiv", "sandiv"];

    buttons.forEach(function (id) {
        var button = document.getElementById(id);
        if (button) button.style.display = "block";
    });

    divs.forEach(function (id) {
        var div = document.getElementById(id);
        if (div) div.style.display = "none";
    });

    // 然后，根据传入的参数隐藏特定的按钮并显示特定的内容
    var buttonToHide = document.getElementById(buttonIdToHide);
    if (buttonToHide) {
        buttonToHide.style.display = "none";
    }

    var divToShow = document.getElementById(divIdToShow);
    if (divToShow) {
        divToShow.style.display = "block";
    }
}


/**
 * @description: 为被复制的侧边栏元素ID添加后缀，并更新其onclick事件。
 * @param {string} containerSelector - 复制后内容的容器的选择器 (例如 '#mobile-sidebar')。
 * @param {string} suffix - 要添加到ID后面的后缀 (例如 '_mobile')。
 */
function fixClonedElementIds(containerSelector, suffix) {
    var container = $(containerSelector);
    if (container.length === 0) {
        // console.warn("未找到用于修复ID的复制容器: " + containerSelector);
        return; // 如果容器不存在，则直接返回
    }

    // 1. 为容器内所有带 id 的元素添加后缀
    container.find('[id]').each(function () {
        var oldId = $(this).attr('id');
        $(this).attr('id', oldId + suffix);
    });

    // 2. 更新容器内所有按钮的 onclick 属性
    container.find('[onclick*="overstep"]').each(function () {
        var onclickAttr = $(this).attr('onclick');
        if (onclickAttr) {
            // 使用正则表达式替换 overstep 函数中的参数，为它们加上后缀
            var newOnclickAttr = onclickAttr.replace(/overstep\s*\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/g, function (match, p1, p2) {
                // 将 overstep('sanbutton', 'sandiv') 替换为 overstep('sanbutton_mobile', 'sandiv_mobile')
                return "overstep('" + p1 + suffix + "', '" + p2 + suffix + "')";
            });
            $(this).attr('onclick', newOnclickAttr);
        }
    });
}


$(document).ready(function () {
    // 使用 .load() 加载侧边栏内容
    // 所有依赖于加载内容的操作都必须写在这个回调函数里面
    $('#sidebar').load('https://seicing.com/js/list/essay.html', function (response, status, xhr) {
        // status 可以是 "success", "notmodified", "error", "timeout", "parsererror"
        if (status == "error") {
            console.error("加载 essay.html 失败: " + xhr.status + " " + xhr.statusText);
            return; // 加载失败，后续代码不执行
        }

        // --- 手机模式ID修复 ---
        // 假设您的手机版复制列表被包裹在一个 ID 为 "mobile-sidebar" 的容器中
        // !!! 请务必将下面的 "#mobile-sidebar" 替换为您实际的容器选择器 !!!
        var mobileContainerSelector = "#mobile-sidebar";
        fixClonedElementIds(mobileContainerSelector, "_mobile");

        // 从URL获取要默认展开的项
        var nenbun = getQueryVariable("nenbun");
        if (nenbun) {
            // 尝试触发桌面版的按钮点击
            var desktopButtonId = nenbun + "button";
            var desktopButton = document.getElementById(desktopButtonId);
            if (desktopButton) {
                console.log("找到桌面版按钮，准备点击: " + desktopButtonId);
                desktopButton.click();
            } else {
                console.warn("未找到桌面版按钮: " + desktopButtonId);
            }

            // 尝试触发手机版的按钮点击
            var mobileButtonId = nenbun + "button_mobile";
            var mobileButton = document.getElementById(mobileButtonId);
            if (mobileButton) {
                console.log("找到手机版按钮，准备点击: " + mobileButtonId);
                mobileButton.click();
            }
            // 如果手机版按钮找不到，不用警告，因为可能当前不是手机模式
        }
    });
});