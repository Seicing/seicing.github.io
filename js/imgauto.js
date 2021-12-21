window.onload = function() {
    $("p").each(function() {
        var aaposbo = $(this).attr("data-img");
        this.innerHTML = "<a href=\"" + aaposbo + "\" onmouseout=\"hiddenPic();\" onmousemove=\"showPic(event,'" + aaposbo + "');\">演出预览</a> "
    });
}


function unfreeze() {
    $("p").each(function() {
        var aaposdo = $(this).attr("data-img");
        this.innerHTML = "<img src=\"" + aaposdo + "\">"
    });
}