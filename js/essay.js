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
 * 切换内容区域的显示 (动态版本)
 * 这个函数不再需要手动定义的ID列表。
 * @param {string} buttonIdToHide - 被点击按钮的完整ID (例如 "essay_cubutton")
 * @param {string} divIdToShow - 需要显示的内容的完整ID (例如 "essay_cudiv")
 */
function overstep_essay(buttonIdToHide, divIdToShow) {
    var clickedButton = document.getElementById(buttonIdToHide);
    // 如果找不到被点击的按钮，则直接退出，避免错误
    if (!clickedButton) {
        console.error("overstep_essay: 无法找到被点击的按钮: " + buttonIdToHide);
        return;
    }

    // 使用jQuery找到按钮所在的容器'#sidebar'
    var container = $(clickedButton).closest('#sidebar');
    if (container.length === 0) {
        console.error("overstep_essay: 无法找到父容器'#sidebar'");
        return;
    }

    // 1. 重置状态：
    // a. 找到容器内所有调用 overstep_essay 的按钮，并将它们全部显示出来
    container.find('a[onclick*="overstep_essay"]').css('display', 'block');

    // b. 找到容器内所有ID以 'essay_' 开头并以 'div' 结尾的div，并将它们全部隐藏
    container.find('div[id^="essay_"][id$="div"]').css('display', 'none');

    // 2. 设置当前状态：
    // a. 隐藏刚刚被点击的那个按钮
    $(clickedButton).css('display', 'none');

    // b. 显示与按钮对应的那个div
    var divToShowElem = document.getElementById(divIdToShow);
    if (divToShowElem) {
        $(divToShowElem).css('display', 'block');
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

        // 步骤 2: 更新所有按钮的 onclick 属性，使其调用新函数并传递带前缀的新ID
        $('#sidebar').find('[onclick*="overstep"]').each(function () {
            var onclickAttr = $(this).attr('onclick');
            if (onclickAttr) {
                var newOnclickAttr = onclickAttr.replace(
                    /overstep\s*\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/g,
                    function (match, p1, p2) {
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