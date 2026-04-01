function tipsbo(a) {
    document.getElementById("Warrior3").style.color = "#d0c9b7";
    document.getElementById("Phalanx3").style.color = "#d0c9b7";
    document.getElementById("Skirmisher3").style.color = "#d0c9b7";
    document.getElementById("Vanguard3").style.color = "#d0c9b7";
    document.getElementById("Mage3").style.color = "#d0c9b7";
    document.getElementById("Sorceress3").style.color = "#d0c9b7";
    document.getElementById("Scholar3").style.color = "#d0c9b7";
    document.getElementById("Cleric3").style.color = "#d0c9b7";
    document.getElementById("Wizard3").style.color = "#d0c9b7";
    document.getElementById("Ranger3").style.color = "#d0c9b7";
    document.getElementById("Sentinel3").style.color = "#d0c9b7";
    document.getElementById(a).style.color = "blue";
    var aaposbo15 = document.querySelector("#Describe937");
    aaposbo15.innerHTML = a.slice(0, -1);
    loadPage();
}

function tipsgo(a) {
    document.getElementById("WesternSeigine3").style.color = "#d0c9b7";
    document.getElementById("CentralSeigine3").style.color = "#d0c9b7";
    document.getElementById("SouthernSeigine3").style.color = "#d0c9b7";
    document.getElementById("NorthernSeigine3").style.color = "#d0c9b7";
    document.getElementById("EasternSeigine3").style.color = "#d0c9b7";
    document.getElementById("GrandDelta3").style.color = "#d0c9b7";
    document.getElementById("EasternAltrata3").style.color = "#d0c9b7";
    document.getElementById("WesternAltrata3").style.color = "#d0c9b7";
    document.getElementById("InnerAltrata3").style.color = "#d0c9b7";
    document.getElementById("IuireMainland3").style.color = "#d0c9b7";
    document.getElementById("IuireSeparation3").style.color = "#d0c9b7";
    document.getElementById("OuterSeigine3").style.color = "#d0c9b7";
    document.getElementById(a).style.color = "blue";
    var aaposbo16 = document.querySelector("#Describe9372");
    aaposbo16.innerHTML = a.slice(0, -1);
    loadPage();
}


function tipsg(a, b) {
    var aaposbo1 = document.querySelector("#Recruit");
    aaposbo1.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '新兵.png';
    var aaposbo2 = document.querySelector("#Warrior");
    aaposbo2.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '武士.png';
    var aaposbo3 = document.querySelector("#Phalanx");
    aaposbo3.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '兵方队.png';
    var aaposbo4 = document.querySelector("#Skirmisher");
    aaposbo4.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '散兵.png';
    var aaposbo5 = document.querySelector("#Vanguard");
    aaposbo5.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '先锋.png';

    var aaposbo6 = document.querySelector("#Mage");
    aaposbo6.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '法师.png';
    var aaposbo7 = document.querySelector("#Sorceress");
    aaposbo7.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '巫师.png';
    var aaposbo8 = document.querySelector("#Scholar");
    aaposbo8.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '学者.png';
    var aaposbo9 = document.querySelector("#Cleric");
    aaposbo9.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '神官.png';
    var aaposbo10 = document.querySelector("#Wizard");
    aaposbo10.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '术士.png';

    var aaposbo11 = document.querySelector("#Ranger");
    aaposbo11.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '游兵.png';
    var aaposbo12 = document.querySelector("#Sentinel");
    aaposbo12.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '近卫.png';
    var aaposbo13 = document.querySelector("#Citizen");
    aaposbo13.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/' + a + '市民.png';
    var aaposbo14 = document.querySelector("#Describe");
    aaposbo14.innerHTML = a;


    document.getElementById("WesternSeigine2").style.color = "#d0c9b7";
    document.getElementById("CentralSeigine2").style.color = "#d0c9b7";
    document.getElementById("SouthernSeigine2").style.color = "#d0c9b7";
    document.getElementById("NorthernSeigine2").style.color = "#d0c9b7";
    document.getElementById("EasternSeigine2").style.color = "#d0c9b7";
    document.getElementById("GrandDelta2").style.color = "#d0c9b7";
    document.getElementById("EasternAltrata2").style.color = "#d0c9b7";
    document.getElementById("WesternAltrata2").style.color = "#d0c9b7";
    document.getElementById("InnerAltrata2").style.color = "#d0c9b7";
    document.getElementById("IuireMainland2").style.color = "#d0c9b7";
    document.getElementById("IuireSeparation2").style.color = "#d0c9b7";
    document.getElementById("OuterSeigine2").style.color = "#d0c9b7";
    document.getElementById(b).style.color = "blue";
}

function tipsb(a, b) {
    var aaposbo1 = document.querySelector("#WesternSeigine");
    aaposbo1.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/西西景' + a + '.png';
    var aaposbo2 = document.querySelector("#CentralSeigine");
    aaposbo2.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/中央西景' + a + '.png';
    var aaposbo3 = document.querySelector("#SouthernSeigine");
    aaposbo3.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/南西景' + a + '.png';
    var aaposbo4 = document.querySelector("#NorthernSeigine");
    aaposbo4.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/北西景' + a + '.png';

    var aaposbo11 = document.querySelector("#EasternSeigine");
    aaposbo11.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/东西景' + a + '.png';

    var aaposbo5 = document.querySelector("#GrandDelta");
    aaposbo5.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/大三角洲' + a + '.png';

    var aaposbo6 = document.querySelector("#EasternAltrata");
    aaposbo6.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/东艾特拉塔' + a + '.png';
    var aaposbo7 = document.querySelector("#WesternAltrata");
    aaposbo7.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/西艾特拉塔' + a + '.png';
    var aaposbo8 = document.querySelector("#InnerAltrata");
    aaposbo8.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/内艾特拉塔' + a + '.png';
    var aaposbo9 = document.querySelector("#IuireMainland");
    aaposbo9.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/尤伊本岛' + a + '.png';
    var aaposbo10 = document.querySelector("#IuireSeparation");
    aaposbo10.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/尤伊离岛' + a + '.png';

    var aaposbo12 = document.querySelector("#OuterSeigine");
    aaposbo12.src = 'https://data.seicing.com/seicingdepot/fatcatpool/essay/forte/外西景' + a + '.png';


    document.getElementById("Recruit2").style.color = "#d0c9b7";
    document.getElementById("Warrior2").style.color = "#d0c9b7";
    document.getElementById("Phalanx2").style.color = "#d0c9b7";
    document.getElementById("Skirmisher2").style.color = "#d0c9b7";
    document.getElementById("Vanguard2").style.color = "#d0c9b7";
    document.getElementById("Mage2").style.color = "#d0c9b7";
    document.getElementById("Sorceress2").style.color = "#d0c9b7";
    document.getElementById("Scholar2").style.color = "#d0c9b7";
    document.getElementById("Cleric2").style.color = "#d0c9b7";
    document.getElementById("Wizard2").style.color = "#d0c9b7";
    document.getElementById("Ranger2").style.color = "#d0c9b7";
    document.getElementById("Sentinel2").style.color = "#d0c9b7";
    document.getElementById("Citizen2").style.color = "#d0c9b7";
    document.getElementById(b).style.color = "blue";



    document.getElementById("新兵").style.display = "none";
    document.getElementById("武士").style.display = "none";
    document.getElementById("兵方队").style.display = "none";
    document.getElementById("散兵").style.display = "none";
    document.getElementById("先锋").style.display = "none";
    document.getElementById("法师").style.display = "none";
    document.getElementById("巫师").style.display = "none";
    document.getElementById("学者").style.display = "none";
    document.getElementById("神官").style.display = "none";
    document.getElementById("术士").style.display = "none";
    document.getElementById("游兵").style.display = "none";
    document.getElementById("近卫").style.display = "none";
    document.getElementById("市民").style.display = "none";
    document.getElementById(a).style.display = "block";
}


async function loadPage() {
    // 读取 span 的内容
    const part1 = document.getElementById("Describe9372")?.textContent || "";
    const part2 = document.getElementById("Describe937")?.textContent || "";

    // 拼接成变量
    const sbx9022 = part1 + part2;

    // 构造网页路径
    const pagePath = `https://seicing.com/js/laviclass/${sbx9022}.html`;
    const fallbackPath = `https://seicing.com/js/laviclass/none.html`;

    const targetDiv = document.getElementById("Kokodayo");

    try {
        // 请求主要页面
        const response = await fetch(pagePath);
        if (!response.ok) throw new Error("页面加载失败: " + response.status);
        const html = await response.text();
        targetDiv.innerHTML = html;
    } catch (err) {
        console.error("加载失败，尝试备用页面:", err);

        // 加载备用页面
        try {
            const fallbackRes = await fetch(fallbackPath);
            if (!fallbackRes.ok) throw new Error("备用页面也加载失败: " + fallbackRes.status);
            const fallbackHtml = await fallbackRes.text();
            targetDiv.innerHTML = fallbackHtml;
        } catch (e) {
            console.error(e);
            targetDiv.innerText = "加载失败";
        }
    }
}