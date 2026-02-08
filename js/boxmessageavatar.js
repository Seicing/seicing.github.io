// 1. 定义 ID 前缀列表 (对应你 HTML 中的 a, b, c ... u)
var listPrefix = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u'];

function tipsg(targetTextId, targetButtonId, suffix) {
    // --- 第一步：重置状态 (隐藏所有内容，灰显所有按钮) ---
    // 遍历所有前缀，拼接后缀来找到页面元素
    for (var i = 0; i < listPrefix.length; i++) {
        var prefix = listPrefix[i];
        var tempTextId = prefix + 'text' + suffix;   // 例如 atext0
        var tempBtnId = prefix + 'button' + suffix; // 例如 abutton0

        var elText = document.getElementById(tempTextId);
        var elBtn = document.getElementById(tempBtnId);

        // 隐藏内容
        if (elText) {
            elText.style.display = "none";
        }
        // 恢复按钮颜色为灰色
        if (elBtn) {
            elBtn.style.color = "#d0c9b7";
        }
    }

    // --- 第二步：激活当前选中的部分 ---
    var currentText = document.getElementById(targetTextId);
    var currentBtn = document.getElementById(targetButtonId);

    if (currentText) {
        currentText.style.display = "block";
    }
    if (currentBtn) {
        currentBtn.style.color = "blue"; // 高亮当前按钮
    }

    // --- 第三步：核心懒加载逻辑 (只针对当前显示的 Div) ---
    // 使用 jQuery 查找当前 targetTextId 下的所有图片
    if (currentText) {
        $("#" + targetTextId + " img").each(function () {
            var $this = $(this);
            var realSrc = $this.attr("data-src");

            // 关键判断：
            // 1. 图片必须有 data-src 属性
            // 2. 图片当前的 src 不等于 data-src (说明还没加载过)
            if (realSrc && $this.attr("src") !== realSrc) {
                $this.attr("src", realSrc); // 这一步执行后，浏览器才开始下载图片

                // (可选) 增加一点淡入效果，让加载看起来更平滑
                $this.hide().fadeIn(300);
            }
        });
    }
}