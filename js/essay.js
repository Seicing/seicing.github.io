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
 * 切换文章列表部分的显示
 * 这个函数现在操作的是带有 "essay_" 前缀的ID
 * @param {string} buttonIdToHide - 要隐藏的按钮的 ID (不带前缀)
 * @param {string} divIdToShow - 要显示的内容区域的 ID (不带前缀)
 */
function overstep_essay(buttonIdToHide, divIdToShow) {
    // 定义所有按钮和div的原始ID
    var buttons = ["hajimebutton", "hattenbutton", "tsuzukubutton", "haneibutton", "cubutton", "wenttobutton", "sanbutton"];
    var divs = ["hajimediv", "hattendiv", "tsuzukudiv", "haneidiv", "cudiv", "wenttodiv", "sandiv"];
    var prefix = "essay_"; // 定义我们自己的前缀

    // 恢复所有按钮为可见
    buttons.forEach(function (id) {
        var button = document.getElementById(prefix + id);
        if (button) button.style.display = "block";
    });

    // 隐藏所有内容区域
    divs.forEach(function (id) {
        var div = document.getElementById(prefix + id);
        if (div) div.style.display = "none";
    });

    // 隐藏被点击的按钮
    var buttonToHide = document.getElementById(prefix + buttonIdToHide);
    if (buttonToHide) {
        buttonToHide.style.display = "none";
    }

    // 显示对应的内容区域
    var divToShow = document.getElementById(prefix + divIdToShow);
    if (divToShow) {
        divToShow.style.display = "block";
    }
}

$(document).ready(function () {
    // 加载文章列表的HTML片段
    $('#sidebar').load('https://seicing.com/js/list/essay.html', function (response, status, xhr) {
        if (status == "error") {
            console.error("加载 essay.html 失败: " + xhr.status + " " + xhr.statusText);
            return;
        }

        var prefix = "essay_"; // 定义统一的前缀

        // 1. 为 #sidebar 内所有新加载的、带id的元素加上前缀，避免冲突
        $('#sidebar').find('[id]').each(function () {
            var oldId = $(this).attr('id');
            // 给ID加上前缀
            $(this).attr('id', prefix + oldId);
        });

        // 2. 更新所有按钮的 onclick 事件，让它们调用新的 overstep_essay 函数
        $('#sidebar').find('[onclick*="overstep"]').each(function () {
            var onclickAttr = $(this).attr('onclick');
            if (onclickAttr) {
                // 将 overstep('sanbutton', 'sandiv') 替换为 overstep_essay('sanbutton', 'sandiv')
                var newOnclickAttr = onclickAttr.replace(/overstep/g, 'overstep_essay');
                $(this).attr('onclick', newOnclickAttr);
            }
        });

        // 3. 根据URL参数，模拟点击带有新前缀的按钮
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