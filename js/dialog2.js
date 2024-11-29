
$(window).resize(function () {
    var cliWidth = document.body.clientWidth - 330;
    $("#reski").width(cliWidth);
});

$(document).ready(function () {
    var cliWidth = document.body.clientWidth - 330;
    $("#reski").width(cliWidth);
});

$(document).ready(function () {
    characterid = document.getElementById("overdrive").innerHTML;
});


function ALswitch() {
    var divs = document.getElementsByClassName("base4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
    var divs2 = document.getElementsByClassName("base9");
    for (var i = 0; i < divs2.length; i++) {
        divs2[i].style.display = "block";
    }
    document.getElementById("ALswitch").style.display = "none";
    document.getElementById("ALswitch2").style.display = "block";
}

function ALswitch2() {
    var divs = document.getElementsByClassName("base4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "block";
    }
    var divs2 = document.getElementsByClassName("base9");
    for (var i = 0; i < divs2.length; i++) {
        divs2[i].style.display = "none";
    }
    document.getElementById("ALswitch2").style.display = "none";
    document.getElementById("ALswitch").style.display = "block";
}


function RFswitch() {
    var divs = document.getElementsByClassName("redface4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "block";
    }
    document.getElementById("RFswitch").style.display = "none";
    document.getElementById("RFswitch2").style.display = "block";
}
function RFswitch2() {
    var divs = document.getElementsByClassName("redface4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
    document.getElementById("RFswitch2").style.display = "none";
    document.getElementById("RFswitch").style.display = "block";
}


function SWswitch() {
    var divs = document.getElementsByClassName("sweat4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "block";
    }
    document.getElementById("SWswitch").style.display = "none";
    document.getElementById("SWswitch2").style.display = "block";
}
function SWswitch2() {
    var divs = document.getElementsByClassName("sweat4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
    document.getElementById("SWswitch2").style.display = "none";
    document.getElementById("SWswitch").style.display = "block";
}
function ATswitch() {
    var divs = document.getElementsByClassName("attach4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "block";
    }
    document.getElementById("ATswitch").style.display = "none";
    document.getElementById("ATswitch2").style.display = "block";
}
function ATswitch2() {
    var divs = document.getElementsByClassName("attach4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
    document.getElementById("ATswitch2").style.display = "none";
    document.getElementById("ATswitch").style.display = "block";
}
function SPswitch() {
    var divs = document.getElementsByClassName("special4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "block";
    }
    document.getElementById("SPswitch").style.display = "none";
    document.getElementById("SPswitch2").style.display = "block";
}
function SPswitch2() {
    var divs = document.getElementsByClassName("special4");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
    document.getElementById("SPswitch2").style.display = "none";
    document.getElementById("SPswitch").style.display = "block";
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
    document.getElementById("CEswitch").style.display = "none";
    document.getElementById("CEswitch2").style.display = "block";
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
    document.getElementById("CEswitch2").style.display = "none";
    document.getElementById("CEswitch").style.display = "block";
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

                    json[i].faceid = json[i]['name'].slice(5)
                    json[i].faceid937 = "no_" + json[i]['faceid']
                    json[i].attach5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + "attach.png"
                    json[i].special5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + "special.png"
                    json[i].sweat5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + "sweat.png"
                    json[i].redface5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + "red_face.png"
                    json[i].brow5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + json[i]['brow'] + ".png"
                    json[i].eyeclose5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + json[i]['eye3'] + ".png"
                    json[i].eye5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + json[i]['eye'] + ".png"
                    json[i].mouth5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + json[i]['mouth'] + ".png"
                    json[i].base5 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + "base.png"
                    json[i].base6 = "https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + characterid + "/" + "base2.png"
                }
            })
    }


})

