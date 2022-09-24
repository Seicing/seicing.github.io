function showPic(e, taitou) {

    var ayanami = {
        "草药": "<img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>275 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>45<br>宗教部队治疗速度+60%",
        "虔诚": "<img src=https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png>100 <img src=https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png>250 <img src=https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png>60<br>受到鼓舞的村民资源采集速度+10%"
    }

    var x, y, aasb;
    x = e.pageX;
    y = e.pageY;

    aasb = document.getElementById("Layer1");
    aasb.style.display = "";
    aasb.style.width = "200px";
    aasb.innerHTML = "<div style='background:rgba(0,0,0,0.75)'><font style='color:#ffffff'>" + ayanami[taitou] + "</font></div>";
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
