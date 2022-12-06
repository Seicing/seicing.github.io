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

        "马厩": "马厩<br>Stable<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>175 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>50<br>生产以及升级骑兵",
        "血统": "血统<br>Bloodlines<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>150 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>100 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>50<br>骑兵+20HP",
        "畜牧": "畜牧<br>Husbandry<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>150 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>40<br>骑兵移动速度+10%",

        "斥候骑兵": "斥候骑兵<br>Scout Cavalry<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>80 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>快速而视野开阔的侦查骑兵部队",
        "轻骑兵": "轻骑兵<br>Light Cavalry<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>80 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>比斥候骑兵更强大，快速而视野开阔的侦查骑兵部队",
        "翼骑兵": "翼骑兵<br>Hussar<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>80 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>比轻骑兵更强大，快速而视野开阔的侦查骑兵部队",
        "波兰翼骑兵": "波兰翼骑兵<br>Winged Hussar<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>80 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>波兰和立陶宛独特的轻骑兵升级，比其它文明的翼骑兵更强大，取代了其他文明的翼骑兵升级",

        "骆驼斥候": "骆驼斥候<br>Camel Scout<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>55 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>48<br>瞿折罗独特斥候部队,善于对付其他骑乘部队的骑兵部队",
        "骆驼兵": "骆驼兵<br>Camel Rider<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>55 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>22<br>善于对付其他骑乘部队的骑兵部队",
        "重装骆驼兵": "重装骆驼兵<br>Heavy Camel Rider<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>55 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>22<br>比骆驼兵强，善于对付其他骑乘部队的骑兵部队",
        "帝王骆驼兵": "帝王骆驼兵<br>Imperial Camel Rider<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>55 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>20<br>比重装骆驼兵强，善于对付其他骑乘部队的骑兵部队",

        "骑士": "骑士<br>Knight<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>75 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>快速而致命的重型骑兵部队",
        "重装骑士": "重装骑士<br>Cavalier<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>75 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>比起骑士更加强大，快速而致命的重型骑兵部队",
        "游侠": "游侠<br>Paladin<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>75 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>比起重装骑士更加强大，快速而致命的重型骑兵部队",
        "索洛托勇士": "索洛托勇士<br>Knight<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>60 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>75 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>美洲本土民族的骑兵，和骑士拥有相同的属性",

        "象兵": "象兵<br>Battle Elephant<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>120 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>70 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>24<br>缓慢的重型骑兵部队",
        "精锐象兵": "精锐象兵<br>Elite Battle Elephant<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>120 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>70 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>24<br>比象兵更强大，缓慢的重型骑兵部队",

        "草原突骑": "草原突骑<br>Steppe Lancer<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>70 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>45 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>24<br>轻装骑兵部队，拥有更广的攻击范围",
        "精锐草原突骑": "精锐草原突骑<br>Elite Steppe Lancer<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>70 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>45 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>20<br>比草原突骑更强大，轻装骑兵部队，拥有更广的攻击范围",

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