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

/**
 * 切换内容区域的显示。
 * 这个函数现在接收的是完整的、带有前缀的ID。
 * @param {string} buttonIdToHide - 要隐藏的按钮的完整ID (例如 "essay_cubutton")
 * @param {string} divIdToShow - 要显示的内容的完整ID (例如 "essay_cudiv")
 */
function overstep_essay(buttonIdToHide, divIdToShow) {
    // 定义所有按钮和div的 *基础* ID，用于重置状态
    var baseButtons = ["hajimebutton", "hattenbutton", "tsuzukubutton", "haneibutton", "cubutton", "wenttobutton", "sanbutton"];
    var baseDivs = ["hajimediv", "hattendiv", "tsuzukudiv", "haneidiv", "cudiv", "wenttodiv", "sandiv"];
    var prefix = "essay_";

    // 1. 重置所有相关按钮为可见
    baseButtons.forEach(function (baseId) {
        var button = document.getElementById(prefix + baseId);
        if (button) button.style.display = "block";
    });

    // 2. 重置所有相关内容区域为隐藏
    baseDivs.forEach(function (baseId) {
        var div = document.getElementById(prefix + baseId);
        if (div) div.style.display = "none";
    });

    // 3. 根据传入的完整ID，隐藏被点击的按钮
    var buttonToHideElem = document.getElementById(buttonIdToHide);
    if (buttonToHideElem) {
        buttonToHideElem.style.display = "none";
    }

    // 4. 根据传入的完整ID，显示对应的内容区域
    var divToShowElem = document.getElementById(divIdToShow);
    if (divToShowElem) {
        divToShowElem.style.display = "block";
    }
}

$(document).ready(function () {
    $('#sidebar').load('https://seicing.com/js/list/essay.html', function (response, status, xhr) {
        if (status === "error") {
            console.error("加载 essay.html 失败: " + xhr.status + " " + xhr.statusText);
            return;
        }

        var prefix = "essay_";

        // 步骤 1: 为 #sidebar 内所有新加载的、带id的元素加上前缀
        $('#sidebar').find('[id]').each(function () {
            var oldId = $(this).attr('id');
            $(this).attr('id', prefix + oldId);
        });

        // 步骤 2: 更新所有按钮的 onclick 属性，使其传递带有前缀的新ID
        $('#sidebar').find('[onclick*="overstep"]').each(function () {
            var onclickAttr = $(this).attr('onclick');
            if (onclickAttr) {
                // 使用正则表达式查找 overstep('arg1', 'arg2') 这样的模式
                var newOnclickAttr = onclickAttr.replace(
                    /overstep\s*\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/g,
                    function (match, p1, p2) {
                        // 将其替换为 overstep_essay('prefix_arg1', 'prefix_arg2')
                        return "overstep_essay('" + prefix + p1 + "', '" + prefix + p2 + "')";
                    }
                );
                $(this).attr('onclick', newOnclickAttr);
            }
        });

        // 步骤 3: 根据URL参数，模拟点击带有新前缀的按钮
        var nenbun = getQueryVariable("nenbun");
        if (nenbun) {
            var buttonToClickId = prefix + nenbun + "button";
            var buttonToClick = document.getElementById(buttonToClickId);
            if (buttonToClick) {
                buttonToClick.click();
            } else {
                console.warn("未找到需要自动点击的按钮: " + buttonToClickId);
            }
        }
    });
});