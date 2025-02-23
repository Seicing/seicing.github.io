let ayanami = {
    "谷仓": "谷仓<br><img src='https://data.seicing.com/seicingdepot/3fatcatpool/civ7/生产力.webp' width='15px'>55 <img src='https://data.seicing.com/seicingdepot/3fatcatpool/civ7/金币.webp' width='15px'>220<br>基础产量：+1<img src='https://data.seicing.com/seicingdepot/3fatcatpool/civ7/食物.webp' width='15px'>食物<br>农场、牧场和种植园+1<img src='https://data.seicing.com/seicingdepot/3fatcatpool/civ7/食物.webp' width='15px'>食物",

}

function showPic(e, taitou) {
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


function showPic2(e) {
    var x, y, aasb;
    x = e.pageX;
    y = e.pageY;

    aasb = document.getElementById("Layer2");
    aasb.style.display = "";
    aasb.style.width = "250px";
    aasb.style.backgroundColor = "rgba(0,0,0,0.75)";
    aasb.style.padding = "10px";
    aasb.style.left = x - 285 + 'px';
    aasb.style.top = y + 2 + 'px';
}

function hiddenPic2() {
    var aasb = document.getElementById("Layer2");
    aasb.style.display = "none";
    CommonAllTech()
}


function BlastFurnace() {
    document.getElementById("Byzantines2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Koreans2").style.opacity = "0.15";
    document.getElementById("Lithuanians2").style.opacity = "0.15";
    document.getElementById("Malians2").style.opacity = "0.15";
    document.getElementById("Vietnamese2").style.opacity = "0.15";
}

function Arson() {
    document.getElementById("Goths2").style.opacity = "0.15";
}

function ChainMailArmor() {
    document.getElementById("Tatars2").style.opacity = "0.15";
}

function PlateMailArmor() {
    document.getElementById("Tatars2").style.opacity = "0.15";
    document.getElementById("Bengalis2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Lithuanians2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
}
function Gambeson() {
    document.getElementById("Berbers2").style.opacity = "0.15";
    document.getElementById("Bohemians2").style.opacity = "0.15";
    document.getElementById("Malay2").style.opacity = "0.15";
    document.getElementById("Burgundians2").style.opacity = "0.15";
    document.getElementById("Chinese2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Ethiopians2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
    document.getElementById("Italians2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Lithuanians2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Malians2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
    document.getElementById("Turks2").style.opacity = "0.15";
    document.getElementById("Vietnamese2").style.opacity = "0.15";
}
function Squires() {
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Portuguese2").style.opacity = "0.15";
}
function Faith() {
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
}
function Heresy() {
    document.getElementById("Bengalis2").style.opacity = "0.15";
    document.getElementById("Britons2").style.opacity = "0.15";
    document.getElementById("Burgundians2").style.opacity = "0.15";
    document.getElementById("Burmese2").style.opacity = "0.15";
    document.getElementById("Chinese2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Italians2").style.opacity = "0.15";
    document.getElementById("Japanese2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Koreans2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
    document.getElementById("Vietnamese2").style.opacity = "0.15";
}
function Supllies() {
    document.getElementById("Burgundians2").style.opacity = "0.15";
    document.getElementById("Chinese2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Lithuanians2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
}
function Bloodlines() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Bohemians2").style.opacity = "0.15";
    document.getElementById("Britons2").style.opacity = "0.15";
    document.getElementById("Burgundians2").style.opacity = "0.15";
    document.getElementById("Byzantines2").style.opacity = "0.15";
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Ethiopians2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
    document.getElementById("Malay2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
    document.getElementById("Koreans2").style.opacity = "0.15";
}

function Husbandry() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Teutons2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
}
function Bracer() {
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Malians2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Teutons2").style.opacity = "0.15";
}
function ParthianTactics() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Berbers2").style.opacity = "0.15";
    document.getElementById("Bohemians2").style.opacity = "0.15";
    document.getElementById("Britons2").style.opacity = "0.15";
    document.getElementById("Burgundians2").style.opacity = "0.15";
    document.getElementById("Byzantines2").style.opacity = "0.15";
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Chinese2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Ethiopians2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
    document.getElementById("Italians2").style.opacity = "0.15";
    document.getElementById("Koreans2").style.opacity = "0.15";
    document.getElementById("Lithuanians2").style.opacity = "0.15";
    document.getElementById("Malay2").style.opacity = "0.15";
    document.getElementById("Malians2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Portuguese2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Spanish2").style.opacity = "0.15";
    document.getElementById("Teutons2").style.opacity = "0.15";
    document.getElementById("Vietnamese2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
    document.getElementById("Armenians2").style.opacity = "0.15";
    document.getElementById("Bengalis2").style.opacity = "0.15";
}

function ThumbRing() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Bengalis2").style.opacity = "0.15";
    document.getElementById("Bohemians2").style.opacity = "0.15";
    document.getElementById("Britons2").style.opacity = "0.15";
    document.getElementById("Burgundians2").style.opacity = "0.15";
    document.getElementById("Burmese2").style.opacity = "0.15";
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Teutons2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
    document.getElementById("Georgians2").style.opacity = "0.15";
    document.getElementById("Armenians2").style.opacity = "0.15";
}

function LeatherArcherArmor() {
    document.getElementById("Burmese2").style.opacity = "0.15";
}

function RingArcherArmor() {
    document.getElementById("Burmese2").style.opacity = "0.15";
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Burgundians2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
    document.getElementById("Georgians2").style.opacity = "0.15";
}
function ScaleBardingArmor() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
}

function ChainBarding() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
    document.getElementById("Malay2").style.opacity = "0.15";
}

function PlateBardingArmor() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
    document.getElementById("Malay2").style.opacity = "0.15";
    document.getElementById("Bohemians2").style.opacity = "0.15";
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Ethiopians2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Japanese2").style.opacity = "0.15";
    document.getElementById("Koreans2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
    document.getElementById("Armenians2").style.opacity = "0.15";
}


function SiegeEngineers() {
    document.getElementById("Burgundians2").style.opacity = "0.15";
    document.getElementById("Byzantines2").style.opacity = "0.15";
    document.getElementById("Chinese2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Italians2").style.opacity = "0.15";
    document.getElementById("Lithuanians2").style.opacity = "0.15";
    document.getElementById("Malians2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Spanish2").style.opacity = "0.15";
    document.getElementById("Turks2").style.opacity = "0.15";
    document.getElementById("Armenians2").style.opacity = "0.15";
}
function DryDock() {
    document.getElementById("Bohemians2").style.opacity = "0.15";
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Burgundians2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Teutons2").style.opacity = "0.15";
    document.getElementById("Georgians2").style.opacity = "0.15";
}

function Shipwright() {
    document.getElementById("Bohemians2").style.opacity = "0.15";
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Burgundians2").style.opacity = "0.15";
    document.getElementById("Burmese2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Lithuanians2").style.opacity = "0.15";
    document.getElementById("Malians2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Portuguese2").style.opacity = "0.15";
    document.getElementById("Saracens2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
    document.getElementById("Teutons2").style.opacity = "0.15";
    document.getElementById("Vietnamese2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
    document.getElementById("Georgians2").style.opacity = "0.15";
    document.getElementById("Armenians2").style.opacity = "0.15";
}


function Sanctity() {
    document.getElementById("Berbers2").style.opacity = "0.15";
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
}
function BlockPrinting() {
    document.getElementById("Berbers2").style.opacity = "0.15";
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Ethiopians2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
    document.getElementById("Turks2").style.opacity = "0.15";
}

function Fervor() {
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
    document.getElementById("Malay2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Vietnamese2").style.opacity = "0.15";
}

function Herbal() {
    document.getElementById("Byzantines2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Turks2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
}
function Redemption() {
    document.getElementById("Britons2").style.opacity = "0.15";
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Chinese2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Ethiopians2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Koreans2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
    document.getElementById("Vietnamese2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
}
function Atonement() {
    document.getElementById("Britons2").style.opacity = "0.15";
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Koreans2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Georgians2").style.opacity = "0.15";
}
function Illumination() {
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Koreans2").style.opacity = "0.15";
    document.getElementById("Malians2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Portuguese2").style.opacity = "0.15";
    document.getElementById("Turks2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
    document.getElementById("Georgians2").style.opacity = "0.15";
}
function Theocracy() {
    document.getElementById("Burgundians2").style.opacity = "0.15";
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Malay2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
}


function Sapper() {
    document.getElementById("Bengalis2").style.opacity = "0.15";
    document.getElementById("Berbers2").style.opacity = "0.15";
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Burmese2").style.opacity = "0.15";
    document.getElementById("Byzantines2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Italians2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Japanese2").style.opacity = "0.15";
    document.getElementById("Koreans2").style.opacity = "0.15";
    document.getElementById("Lithuanians2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Saracens2").style.opacity = "0.15";
}
function TwoManSaw() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Berbers2").style.opacity = "0.15";
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Malay2").style.opacity = "0.15";
    document.getElementById("Malians2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
    document.getElementById("Georgians2").style.opacity = "0.15";
}
function StoneShaftMining() {
    document.getElementById("Bengalis2").style.opacity = "0.15";
    document.getElementById("Britons2").style.opacity = "0.15";
    document.getElementById("Burmese2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Japanese2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Saracens2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
    document.getElementById("Turks2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
    document.getElementById("Armenians2").style.opacity = "0.15";
}
function GoldShaftMining() {
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Italians2").style.opacity = "0.15";
    document.getElementById("Lithuanians2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Portuguese2").style.opacity = "0.15";
    document.getElementById("Spanish2").style.opacity = "0.15";
    document.getElementById("Teutons2").style.opacity = "0.15";
    document.getElementById("Vietnamese2").style.opacity = "0.15";
    document.getElementById("Georgians2").style.opacity = "0.15";
}
function TreadmillCrane() {
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Chinese2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Ethiopians2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Spanish2").style.opacity = "0.15";
    document.getElementById("Teutons2").style.opacity = "0.15";
    document.getElementById("Armenians2").style.opacity = "0.15";
    document.getElementById("Georgians2").style.opacity = "0.15";
}
function Masonry() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Byzantines2").style.opacity = "0.15";
    document.getElementById("Vietnamese2").style.opacity = "0.15";
}
function Architecture() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Byzantines2").style.opacity = "0.15";
    document.getElementById("Vietnamese2").style.opacity = "0.15";
    document.getElementById("Berbers2").style.opacity = "0.15";
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
    document.getElementById("Japanese2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Malay2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Saracens2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
    document.getElementById("Teutons2").style.opacity = "0.15";
    document.getElementById("Armenians2").style.opacity = "0.15";
}
function Hoardings() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Bengalis2").style.opacity = "0.15";
    document.getElementById("Bohemians2").style.opacity = "0.15";
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Burmese2").style.opacity = "0.15";
    document.getElementById("Chinese2").style.opacity = "0.15";
    document.getElementById("Ethiopians2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Koreans2").style.opacity = "0.15";
    document.getElementById("Malay2").style.opacity = "0.15";
    document.getElementById("Portuguese2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
}
function HeatedShot() {
    document.getElementById("Bohemians2").style.opacity = "0.15";
    document.getElementById("Burgundians2").style.opacity = "0.15";
    document.getElementById("Byzantines2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Japanese2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
    document.getElementById("Saracens2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Spanish2").style.opacity = "0.15";
    document.getElementById("Georgians2").style.opacity = "0.15";
}
function ArrowSlits() {
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Burmese2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Ethiopians2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Lithuanians2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Malay2").style.opacity = "0.15";
    document.getElementById("Malians2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Portuguese2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
    document.getElementById("Armenians2").style.opacity = "0.15";
}
function CropRotation() {
    document.getElementById("Bohemians2").style.opacity = "0.15";
    document.getElementById("Britons2").style.opacity = "0.15";
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Chinese2").style.opacity = "0.15";
    document.getElementById("Dravidians2").style.opacity = "0.15";
    document.getElementById("Ethiopians2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Japanese2").style.opacity = "0.15";
    document.getElementById("Koreans2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Saracens2").style.opacity = "0.15";
    document.getElementById("Spanish2").style.opacity = "0.15";
    document.getElementById("Turks2").style.opacity = "0.15";
}

function Guilds() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Chinese2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Japanese2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Saracens2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
    document.getElementById("Poles2").style.opacity = "0.15";
}
function FortifiedWall() {
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Malay2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
}

function GuardTower() {
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
}

function KeepTower() {
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Berbers2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Tatars2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
    document.getElementById("Armenians2").style.opacity = "0.15";
}
function BombardTower() {
    document.getElementById("Aztecs2").style.opacity = "0.15";
    document.getElementById("Bengalis2").style.opacity = "0.15";
    document.getElementById("Berbers2").style.opacity = "0.15";
    document.getElementById("Britons2").style.opacity = "0.15";
    document.getElementById("Bulgarians2").style.opacity = "0.15";
    document.getElementById("Burmese2").style.opacity = "0.15";
    document.getElementById("Celts2").style.opacity = "0.15";
    document.getElementById("Cumans2").style.opacity = "0.15";
    document.getElementById("Ethiopians2").style.opacity = "0.15";
    document.getElementById("Franks2").style.opacity = "0.15";
    document.getElementById("Goths2").style.opacity = "0.15";
    document.getElementById("Gurjaras2").style.opacity = "0.15";
    document.getElementById("Hindustanis2").style.opacity = "0.15";
    document.getElementById("Huns2").style.opacity = "0.15";
    document.getElementById("Incas2").style.opacity = "0.15";
    document.getElementById("Japanese2").style.opacity = "0.15";
    document.getElementById("Khmer2").style.opacity = "0.15";
    document.getElementById("Magyars2").style.opacity = "0.15";
    document.getElementById("Malians2").style.opacity = "0.15";
    document.getElementById("Mayans2").style.opacity = "0.15";
    document.getElementById("Mongols2").style.opacity = "0.15";
    document.getElementById("Persians2").style.opacity = "0.15";
    document.getElementById("Romans2").style.opacity = "0.15";
    document.getElementById("Saracens2").style.opacity = "0.15";
    document.getElementById("Sicilians2").style.opacity = "0.15";
    document.getElementById("Slavs2").style.opacity = "0.15";
    document.getElementById("Vikings2").style.opacity = "0.15";
    document.getElementById("Georgians2").style.opacity = "0.15";
}