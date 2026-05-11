function showPic(e, sUrl) {
    var x, y, aasb;
    x = e.pageX;
    y = e.pageY;
    aasb = document.getElementById("Layer1")
    aasb.style.display = "";
    aasb.innerHTML = "<img border='0' src=\"" + sUrl + "\">";
    var div = aasb;
    var z = div.offsetWidth;
    if (x + z < document.body.clientWidth) {
        aasb.style.left = x + 2 + 'px';
        aasb.style.top = y + 2 + 'px';
    } else {
        aasb.style.left = x - (x + z - document.body.clientWidth) + 'px';
        aasb.style.top = y + 2 + 'px';
    }
}

function hiddenPic() {
    var aasb = document.getElementById("Layer1");
    aasb.style.display = "none";
    aasb.innerHTML = "";
}