function showPic(e, taitou) {

    var ayanami = {
        "羊年": "羊年<br>Year of the Goat<br>根据时代，在指定的位置生成3/5/8/12只山羊",
        "驯化": "驯化<br>Domestication<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>100 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/电.png'>5  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>40 <br>从浆果丛、家禽收集食物的效率+30%，从驯化的牲畜收集食物效率+15%",

        "石匠": "石匠<br>Masonry<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>200 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>300  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>20<br>建筑物+15%生命值",
        "强化的城镇中心": "强化的城镇中心<br>Fortified Town Center<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>400 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>400  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>60<br>城镇中心+25%生命值，+50%攻击力，+2射程，+5人口支持",
        "建筑学": "建筑学<br>Architects<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>400 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>500  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>建筑物+15%生命值",

        "使者": "使者<br>Ambassadors<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>250  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>删除进贡惩罚",
        "税务官": "税务官<br>Tax Collectors<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>200 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>200 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>35<br>市场购买资源成本从30%下降到15%",
        "铸币": "铸币<br>Coinage<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>200  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>40<br>商队+20%移动速度",

        "猎犬": "猎犬<br>Hunting Dogs<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>100 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>100  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>20<br>狩猎收集效率+30%",
        "畜牧": "畜牧<br>Husbandry<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>100 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>50  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>+100%食物携带数，+30%牲畜育肥率，+20%驯化牲畜食物收集效率",
        "重犁": "重犁<br>Plow<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>50 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>100  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>40<br>+10%食物收集效率",
        "灌溉": "灌溉<br>Irrigation<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>150 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>250  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>+10%食物收集效率",
        "防洪": "防洪<br>Flood Control<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>250 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>350  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>40<br>+10%食物收集效率",
        "手斧": "手斧<br>Hand Axe<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>120 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>50  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>+10%木材收集效率，+50%木材携带量",
        "弓锯": "弓锯<br>Bow Saw<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>250 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>150  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>45<br>+10%木材收集效率，+50%木材携带量",
        "木匠": "木匠<br>Carpenters<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>300 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>200  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>55<br>+10%木材收集效率，+50%木材携带量",
        "铁镐": "铁镐<br>Pickaxe<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>50 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>120  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>+10%黄金收集效率，+50%木材携带量",
        "竖井式矿井": "竖井式矿井<br>Shaft Mine<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>150 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>250  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>45<br>+10%黄金收集效率，+50%木材携带量",
        "采石场": "采石场<br>Quarry<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>200 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>300  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>55<br>+10%黄金收集效率，+50%木材携带量",

        "围网": "围网<br>Purse Seine<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>150 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>150  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>20<br>+30%渔船食物收集效率",
        "双耳盐瓶": "双耳盐瓶<br>Salt Amphora<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>150 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>250  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>30<br>+40%渔船食物收集效率，+100%渔船食物携带量",
        "封闭甲板": "封闭甲板<br>Enclosed Deck<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>200 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>200 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>40<br>运输船装载量翻倍",
        "英雄舰队": "英雄舰队<br>Heroic Fleet<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/肉.png'>200 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>200  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/电.png'>5 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>40<br>船只对抗神话部队攻击力+150%",
        "箭船保护层": "箭船保护层<br>Arrow Ship Cladding<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>200 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>200  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>40<br>箭船+10%攻击力，+20%生命值，+4射程",
        "强化冲角": "强化冲角<br>Reinforced Ram<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>300 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>200  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>40<br>冲角船+10%攻击力，+10%生命值，喷火船+15%生命值",
        "海军巨弩": "海军巨弩<br>Naval Oxybeles<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>500 <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/金.png'>200  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>50<br>攻城船+10%生命值，+12射程",
        "征召水手": "征召水手<br>Conscript Sailors<br><img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/木.png'>500  <img src='https://seicing-1257171891.cos.ap-nanjing.myqcloud.com/3fatcatpool/aoe4/tech/时间.png'>5300<br>船只制造速度+25%",

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
