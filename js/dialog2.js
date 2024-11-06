

$(document).ready($('#reske').load('https://seicing.com/js/list/lavivagnar.html'));


$(window).resize(function () {
    var cliWidth = document.body.clientWidth - 360;
    $("#reski").width(cliWidth);
});

$(document).ready(function () {
    var cliWidth = document.body.clientWidth - 360;
    $("#reski").width(cliWidth);
});

$(document).ready(function () {
    characterid = document.getElementById("overdrive").innerHTML;
});


function RFswitch() {
    var divs = document.getElementsByClassName("redface4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "block";
    }
}
function RFswitch2() {
    var divs = document.getElementsByClassName("redface4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
}
function SWswitch() {
    var divs = document.getElementsByClassName("sweat4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "block";
    }
}
function SWswitch2() {
    var divs = document.getElementsByClassName("sweat4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
}
function ATswitch() {
    var divs = document.getElementsByClassName("attach4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "block";
    }
}
function ATswitch2() {
    var divs = document.getElementsByClassName("attach4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
}
function ONswitch() {
    var divs = document.getElementsByClassName("addon4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "block";
    }
}
function ONswitch2() {
    var divs = document.getElementsByClassName("addon4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
}
function CEswitch() {
    var divs = document.getElementsByClassName("eyeclose4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "block";
    }
    var divs2 = document.getElementsByClassName("eye4");
    for (var g = 0; g < divs2.length; g++) {
        divs2[g].style.display = "none";
    }
}
function CEswitch2() {
    var divs = document.getElementsByClassName("eyeclose4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
    var divs2 = document.getElementsByClassName("eye4");
    for (var g = 0; g < divs2.length; g++) {
        divs2[g].style.display = "block";
    }
}

var imgAll = [];
const vm = new Vue({
    el: '#app',
    data: {
        aasb: [],
    },
    created() {
        fetch('https://seicing.com/js/dia/dialog.json')
            .then(response => response.json())
            .then(json => {
                this.aasb = json
                for (var i = 0; i < json.length; i++) {
                    json[i].faceid = json[i]['name']

                    json[i].attach5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + "attach.png"
                    json[i].addon5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + "addon.png"
                    json[i].sweat5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + "sweat.png"
                    json[i].redface5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + "red_face.png"
                    json[i].brow5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + json[i]['brow'] + ".png"
                    json[i].eyeclose5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/eye_default3.png"
                    json[i].eye5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + json[i]['eye'] + ".png"
                    json[i].mouth5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + json[i]['mouth'] + ".png"
                    json[i].base5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + "base.png"


                }
            })
    }
})