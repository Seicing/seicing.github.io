const { createApp, ref, onMounted } = Vue;

const app = createApp({
    setup() {
        const aasb = ref([]);
        let characterid = '';

        const copyText = (text) => {
            navigator.clipboard.writeText(text);
        };

        onMounted(() => {
            characterid = document.getElementById("overdrive").innerHTML;

            fetch('https://seicing.com/js/dialog.json')
                .then(response => response.json())
                .then(json => {
                    const processedData = json.map(item => {
                        const faceid = item['name'].slice(5);
                        return {
                            ...item,
                            faceid: faceid,
                            faceid937: "no_" + faceid,
                            attach5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/attach.png`,
                            special5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/special.png`,
                            sweat5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/sweat.png`,
                            redface5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/red_face.png`,
                            brow5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/${item['brow']}.png`,
                            eyeclose5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/${item['eye3']}.png`,
                            eye5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/${item['eye']}.png`,
                            mouth5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/${item['mouth']}.png`,
                            base5: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/base.png`,
                            base6: `https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${characterid}/base2.png`
                        };
                    });
                    aasb.value = processedData;

                    Vue.nextTick(() => {
                        activateCurrentCiv();
                    });
                })
                .catch(error => console.error('Error fetching dialog.json:', error));

            setTimeout(() => {
                const reskiElement = document.getElementById("reski");
                activateCurrentCiv();
                if (reskiElement) {
                    const aposr = reskiElement.offsetHeight;
                    $("#reske").height(aposr);
                }
            }, 1000);
        });

        return {
            aasb,
            copyText
        };
    }
});

app.mount('#app');

$(window).resize(function () {
    var cliWidth = document.body.clientWidth - 330;
    $("#reski").width(cliWidth);
    var aposr = document.getElementById("reski").offsetHeight;
    $("#reske").height(aposr);
});

$(document).ready(function () {
    var cliWidth = document.body.clientWidth - 330;
    $("#reski").width(cliWidth);
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


function activateCurrentCiv() {
    // 获取当前网页文件名
    // 例如：
    // https://seicing.com/html/largelv/list/IuireCleric.html
    // → IuireCleric
    const pathname = window.location.pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    const currentName = filename.replace(/\.[^/.]+$/, '');

    if (!currentName) {
        console.log("无法获取当前网页名称");
        return;
    }

    console.log("当前网页名称：", currentName);

    const reski = document.getElementById("reski");

    if (!reski) {
        console.log("#reski 不存在");
        return;
    }

    const images = reski.querySelectorAll("img");

    console.log("#reski 中找到图片：", images.length);

    images.forEach(img => {
        // 优先读取 src
        const src = img.getAttribute("src");

        if (!src) return;

        // 去掉 ?xxx 和 #xxx
        const cleanSrc = src.split('?')[0].split('#')[0];

        // 获取最后的文件名
        const imageFilename = cleanSrc.substring(
            cleanSrc.lastIndexOf('/') + 1
        );

        // 去掉扩展名
        const imageName = imageFilename.replace(/\.[^/.]+$/, '');

        console.log("检测图片：", imageName);

        if (imageName === currentName) {
            img.classList.add("civ-active937");

            console.log(
                "已激活：",
                img,
                "class =",
                img.className
            );
        }
    });
}