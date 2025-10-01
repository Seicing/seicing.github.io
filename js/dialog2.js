// 从 'vue' 导入所需的函数
const { createApp, ref, onMounted } = Vue;

const app = createApp({
    // setup 函数是组合式 API 的入口点
    setup() {
        // 使用 ref 创建一个响应式变量来存储数据
        const aasb = ref([]);
        let characterid = ''; // 将 characterid 声明在 setup 作用域内

        // onMounted 对应于 Vue 2.0 的 mounted 生命周期钩子
        onMounted(() => {
            // 获取 characterid
            characterid = document.getElementById("overdrive").innerHTML;

            // 使用 fetch 获取 JSON 数据
            fetch('https://seicing.com/js/dia/dialog.json')
                .then(response => response.json())
                .then(json => {
                    // 遍历并处理数据
                    const processedData = json.map(item => {
                        const faceid = item['name'].slice(5);
                        return {
                            ...item, // 复制原始 item 的所有属性
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
                    // 更新响应式变量的值
                    aasb.value = processedData;
                })
                .catch(error => console.error('Error fetching dialog.json:', error));

            // 替代 Vue 2.0 中的 starter 方法
            setTimeout(() => {
                const reskiElement = document.getElementById("reski");
                if (reskiElement) {
                    const aposr = reskiElement.offsetHeight;
                    $("#reske").height(aposr);
                }
            }, 1000);
        });

        // 从 setup 函数返回模板中需要使用的数据和方法
        return {
            aasb
        };
    }
});

// 将 Vue 应用挂载到指定的 DOM 元素上
app.mount('#app');


// 外部的 jQuery 和原生 JavaScript 函数保持不变
$(window).resize(function () {
    var cliWidth = document.body.clientWidth - 330;
    $("#reski").width(cliWidth);
    var aposr = document.getElementById("reski").offsetHeight;
    $("#reske").height(aposr);
});

$(document).ready(function () {
    var cliWidth = document.body.clientWidth - 330;
    $("#reski").width(cliWidth);
    // characterid 会在 Vue 的 onMounted 钩子中被获取和使用
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
// ... 其他的 switch 函数保持不变 ...
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