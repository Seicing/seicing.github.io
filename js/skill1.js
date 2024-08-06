function showPic(e, taitou, kontie) {
    var x, y, aasb;
    x = e.pageX;
    y = e.pageY;
    aasb = document.getElementById("Layer1")
    aasb.style.display = "";
    aasb.style.width = "200px";
    aasb.innerHTML = "<div style='background:url(http://47.236.171.173/seicingdepot/header.png) no-repeat;padding:7px 7px 0px 7px;'><font style='color:#ffc400;font-family: SimSun;'>" + taitou + "</font><br><img src='http://47.236.171.173/seicingdepot/line.png'></div><div style='background:url(http://47.236.171.173/seicingdepot/midder.png) repeat-y;padding:0px 7px 0px 7px;'><font style='color:#ffffff;font-family: SimSun;'>" + kontie + "</font></div>  <div style='background:url(http://47.236.171.173/seicingdepot/ender.png) no-repeat;'><font style='color:#ffffff;'><p>&nbsp</p></font></div>";
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