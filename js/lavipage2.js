var lavipage = document.getElementById("lavipage");
var page = lavipage.getAttribute("page");
var label = document.getElementById("page_" + page);
if (label) {
    label.classList.add("active-page"); // 通过动态添加 class 让 CSS 自动控制色彩
}