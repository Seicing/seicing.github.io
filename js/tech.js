function showPic(e, taitou) {
    var x, y, aasb;
    x = e.pageX;
    y = e.pageY;
    aasb = document.getElementById("Layer1")
    aasb.style.display = "";
    aasb.style.width = "200px";
    aasb.innerHTML = "<div style='background:rgba(0,0,0,0.75)'><font style='color:#ffffff'>" + taitou + "</font></div>";
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
