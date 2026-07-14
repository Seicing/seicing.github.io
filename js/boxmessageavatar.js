// 定义 ID 前缀列表 (对应你 HTML 中的 a, b, c ... u)
// 这样你就不用写两个长长的数组了
var listPrefix = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u'];

function tipsg(targetTextId, targetButtonId, suffix) {
    // 1. 重置：隐藏所有内容，变灰所有按钮
    for (var i = 0; i < listPrefix.length; i++) {
        var prefix = listPrefix[i];
        var tempTextId = prefix + 'text' + suffix;
        var tempBtnId = prefix + 'button' + suffix;

        var elText = document.getElementById(tempTextId);
        var elBtn = document.getElementById(tempBtnId);

        if (elText) elText.style.display = "none";
        if (elBtn) elBtn.classList.add("special-text-link");
        if (elBtn) elBtn.classList.remove("special-link");
    }

    // 2. 激活：显示当前点击的内容
    var currentText = document.getElementById(targetTextId);
    var currentBtn = document.getElementById(targetButtonId);

    if (currentText) currentText.style.display = "block";
    if (currentBtn) currentBtn.classList.add("special-link");
    if (currentBtn) currentBtn.classList.remove("special-text-link");

    // 3. 加载图片：只处理当前显示区域内的图片
    $("#" + targetTextId + " img").each(function () {
        var $this = $(this);
        var realSrc = $this.attr("data-mysrc");

        // 如果存在 data-mysrc 且 src 还没被赋值（避免重复加载）
        if (realSrc && $this.attr("src") !== realSrc) {

            // 【新增修改】在赋予 src 之前，绑定 error 事件
            // 使用 .one() 确保每个图片只触发一次该逻辑
            $this.one("error", function () {
                // 创建一个用于替代图片的 span 元素
                var $textSpan = $("<span></span>")
                    .text("此职业无此装扮")
                    .css({
                        "display": "block"     // 块级显示，保持在 textce 容器内居中
                    });

                // 将当前加载失败的 img 替换为文字 span
                $this.replaceWith($textSpan);
            });

            // 触发图片加载
            $this.attr("src", realSrc);
            $this.removeAttr("data-mysrc");
        }
    });
}