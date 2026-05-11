// 定义 ID 前缀列表 (对应你 HTML 中的 a, b, c ... u)
// 这样你就不用写两个长长的数组了
var listPrefix = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u'];

function tipsg(targetTextId, targetButtonId, suffix) {
    // 1. 重置：隐藏所有内容，变灰所有按钮
    for (var i = 0; i < listPrefix.length; i++) {
        var prefix = listPrefix[i];
        // 拼接ID，例如 'atext' + '0' -> 'atext0'
        var tempTextId = prefix + 'text' + suffix;
        var tempBtnId = prefix + 'button' + suffix;

        var elText = document.getElementById(tempTextId);
        var elBtn = document.getElementById(tempBtnId);

        if (elText) elText.style.display = "none";
        if (elBtn) elBtn.style.color = "#d0c9b7";
    }

    // 2. 激活：显示当前点击的内容
    var currentText = document.getElementById(targetTextId);
    var currentBtn = document.getElementById(targetButtonId);

    if (currentText) currentText.style.display = "block";
    if (currentBtn) currentBtn.style.color = "blue";

    // 3. 加载图片：只处理当前显示区域内的图片
    // 这里的选择器只找当前 div 下的 img
    $("#" + targetTextId + " img").each(function () {
        var $this = $(this);

        // 【关键修改】这里读取 data-mysrc
        var realSrc = $this.attr("data-mysrc");

        // 如果存在 data-mysrc 且 src 还没被赋值（避免重复加载）
        if (realSrc && $this.attr("src") !== realSrc) {
            $this.attr("src", realSrc);
            // 顺便移除 data-mysrc 保持整洁（可选）
            $this.removeAttr("data-mysrc");
        }
    });
}