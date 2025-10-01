
$(window).resize(function () {
    var cliWidth = document.body.clientWidth - 330;
    $("#reski").width(cliWidth);
    aposr = document.getElementById("reski").offsetHeight;
    $("#reske").height(aposr);
});

$(document).ready(function () {
    var cliWidth = document.body.clientWidth - 330;
    $("#reski").width(cliWidth);
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



import { createApp, ref, onMounted } from 'vue';
// const imgAll = []; // This was in the original code, retained if needed elsewhere.
createApp({
    setup() {
        const aasb = ref([]);
        const overdrive = ref(null); // 1. Create a ref to hold the DOM element.

        onMounted(() => {
            // 2. Access the element's content after the component is mounted.
            const characterid = overdrive.value.innerHTML;
            fetchData(characterid);
            starter();
        });

        const fetchData = (characterid) => {
            fetch('https://seicing.com/js/dia/dialog.json')
                .then(response => response.json())
                .then(json => {
                    aasb.value = json.map(item => {
                        const faceid = item.name.slice(5);
                        return {
                            ...item,
                            faceid: faceid,
                            faceid937: "no_" + faceid,
                            attach5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/attach.png`,
                            special5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/special.png`,
                            sweat5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/sweat.png`,
                            redface5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/red_face.png`,
                            brow5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/${item.brow}.png`,
                            eyeclose5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/${item.eye3}.png`,
                            eye5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/${item.eye}.png`,
                            mouth5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/${item.mouth}.png`,
                            base5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/base.png`,
                            base6: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/base2.png`
                        };
                    });
                });
        };

        const starter = () => {
            setTimeout(() => {
                // Using querySelector as an example if 'reski' and 'reske' are also in the template.
                // Using refs for these is also the preferred method.
                const reskiElement = document.getElementById("reski");
                const reskeElement = document.getElementById("reske");
                if (reskiElement && reskeElement) {
                    const aposr = reskiElement.offsetHeight;
                    reskeElement.style.height = `${aposr}px`;
                }
            }, 1000);
        };

        return {
            aasb,
            overdrive // 3. Expose the ref to the template.
        };
    }
}).mount('#app');