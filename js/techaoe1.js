function showPic(e, taitou) {

    var ayanami = {
        "兵营": "兵营<br>Barracks<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>175 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>50<br>生产以及升级步兵，靶场和马厩的前置条件",
        "供给": "供给<br>Supplies<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>75 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>75 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>35<br>民兵线食物成本-15",
        "护卫": "护卫<br>Squires<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>100 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>40<br>步兵移动速度+10%",
        "纵火": "纵火<br>Arson<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>150 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>50 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>25<br>步兵+2对一般建筑伤害",
        "民兵": "民兵<br>Militia<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>20 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>21<br>基础的步兵剑士，便宜，生产快速",
        "剑士": "剑士<br>Man-at-Arms<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>20 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>21<br>比民兵更强大，便宜，生产快速",
        "长剑士": "长剑士<br>Long Swordsman<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>20 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>21<br>比剑士更强大，便宜，生产快速",
        "双手剑士": "双手剑士<br>Two-Handed Swordsman<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>20 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>21<br>比长剑士更强大，便宜，生产快速",
        "冠军剑士": "冠军剑士<br>Champion<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>20 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>21<br>比双手剑士更强大，便宜，生产快速",
        "长矛兵": "长矛兵<br>Spearman<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>35 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>25 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>22<br>中型步兵，善于对付骑兵",
        "长枪兵": "长枪兵<br>Pikeman<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>35 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>25 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>22<br>比长矛兵更加强大的中型步兵，善于对付骑兵",
        "长戟兵": "长戟兵<br>Halberdier<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>35 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>25 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>22<br>比长枪兵更加强大的中型步兵，善于对付骑兵",
        "鹰斥候": "鹰斥候<br>Eagle Scout<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>20 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>50 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>35<br>拥有广阔视野的快速步兵",
        "鹰勇士": "鹰勇士<br>Eagle Warrior<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>20 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>50 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>35<br>比鹰斥候强大，拥有广阔视野的快速步兵",
        "精锐鹰勇士": "精锐鹰勇士<br>Elite Eagle Warrior<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>20 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>50 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>35<br>比鹰勇士强大，拥有广阔视野的快速步兵",

    }

    var x, y, aasb;
    x = e.pageX;
    y = e.pageY;

    aasb = document.getElementById("Layer1");
    aasb.style.display = "";
    aasb.style.width = "210px";
    aasb.innerHTML = "<div style='background:rgba(0,0,0,0.75);padding:5px'><font style='color:#ffffff'>" + ayanami[taitou] + "</font></div>";
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
