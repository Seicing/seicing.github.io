const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const aasb = ref([]);

        onMounted(() => {
            let characterid = document.getElementById("overdrive").innerHTML;
            let characterid2 = "https://seicing.com/js/dia/" + characterid + ".json";

            fetch(characterid2)
                .then(response => response.json())
                .then(json => {
                    const processedData = json.map(item => {
                        const facer = eval('face_' + item.face);

                        let red_face = item.con.includes("RF") ? 'red_face' : 'red_face1';
                        let sweat = item.con.includes("SW") ? 'sweat' : 'sweat1';
                        let attach = item.con.includes("AT") ? 'attach' : 'attach1';
                        let special = item.con.includes("SP") ? 'special' : 'special1';
                        let eye = item.con.includes("CE") ? facer[2] : facer[0];
                        let baseys = item.con.includes("AL") ? 'base2' : 'base';
                        let bclass = item.branch !== "" ? item.branch : 'master';
                        let brow = facer[3];
                        let mouth = facer[4];

                        let bstyle = "";
                        let tablelavivanar = "";
                        let tr1 = "";
                        let tr2 = "";
                        let astyle = "";

                        const commonAstyle = "padding: 5px;border-radius: 15px;background: rgb(37, 37, 37);" +
                            `background-image: url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${item.char}/${attach}.png),` +
                            `url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${item.char}/${special}.png),` +
                            `url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${item.char}/${sweat}.png),` +
                            `url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${item.char}/${red_face}.png),` +
                            `url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${item.char}/${brow}.png),` +
                            `url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${item.char}/${eye}.png),` +
                            `url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${item.char}/${mouth}.png),` +
                            `url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/${item.char}/${baseys}.png);` +
                            "background-repeat: no-repeat;background-size: 40%;";

                        if (item.dic === 4) {
                            if (item.branch !== "") {
                                bstyle = item.branch.includes("1") ? "float:left;" : "float:left;display:none;";
                            } else {
                                bstyle = "float:left;";
                            }
                            tablelavivanar = "tablebana";
                            tr1 = `<td rowspan='2' style='position:relative;width:180px;'></td><td id='banaheader' style='border-bottom:2px solid rgb(208,201,183);'><span>${item.name}</span></td>`;
                            tr2 = `<td width='300px'><span>${item.string}</span></td>`;
                            astyle = commonAstyle + "background-position: left center;";
                        } else if (item.dic === 1 || item.dic === 3) {
                            if (item.dic === 1) {
                                if (item.branch !== "") {
                                    bstyle = item.branch.includes("1") ? "float:left;" : "float:left;display:none;";
                                } else {
                                    bstyle = "float:left;";
                                }
                            } else { // dic === 3
                                if (item.branch !== "") {
                                    bstyle = item.branch.includes("1") ? "float:right;" : "float:right;display:none;";
                                } else {
                                    bstyle = "float:right;";
                                }
                            }
                            tablelavivanar = "tablebana";
                            tr1 = `<td id='banaheader' style='border-bottom:2px solid rgb(208,201,183);'><span>${item.name}</span></td><td rowspan='2' style='position:relative;width:180px;'></td>`;
                            tr2 = `<td width='300px'><span>${item.string}</span></td>`;
                            astyle = commonAstyle + "background-position: right center;";
                        } else if (item.dic === 2) {
                            if (item.branch !== "") {
                                bstyle = item.branch.includes("1") ? "float: left;position:relative;left:20%;" : "float: left;position:relative;left:20%;display:none;";
                            } else {
                                bstyle = "float: left;position:relative;left:20%;";
                            }
                            tablelavivanar = "tablebana2";
                            astyle = "padding: 5px;border-radius: 15px;background: rgb(37, 37, 37);";
                            tr1 = `<td><span>${item.string}</span></td>`;
                            tr2 = " ";
                        }

                        return {
                            ...item,
                            charname: item.name,
                            texter: item.string,
                            red_face,
                            sweat,
                            attach,
                            special,
                            eye,
                            baseys,
                            bclass,
                            brow,
                            mouth,
                            bstyle,
                            tablelavivanar,
                            tr1,
                            tr2,
                            astyle,
                        };
                    });
                    aasb.value = processedData;
                });
        });

        // 將資料和方法返回，使其在模板中可用
        return {
            aasb
        };
    }
}).mount('#app');

// ===============================
// 分支切换核心函数
// ===============================
function switchBranch(group, index) {
    // 1. 隐藏该组所有分支内容
    document.querySelectorAll('.' + group).forEach(el => {
        el.style.display = 'none';
    });

    // 2. 显示选中的分支内容
    // 要求元素同时拥有 group 与 group+index 两个 class
    document.querySelectorAll('.' + group + '.' + group + index).forEach(el => {
        el.style.display = 'block';
    });

    // 3. 重置该组所有分支按钮颜色
    document.querySelectorAll('[id^="branch' + group + '"]').forEach(el => {
        el.style.color = '#D0C9B7';
    });

    // 4. 高亮当前分支按钮
    const current = document.getElementById('branch' + group + index);
    if (current) {
        current.style.color = '#00ff00';
    }
}

// ===============================
// 页面加载后：
// 自动扫描所有分支组
// 每个分支组默认切到分支 1
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const groups = new Set();

    // 从分支按钮中自动收集分支组
    document.querySelectorAll('.branch-btn').forEach(btn => {
        const group = btn.dataset.group;
        if (group) {
            groups.add(group);
        }
    });

    // 所有分支组默认显示分支 1
    groups.forEach(group => {
        switchBranch(group, 1);
    });
});

// ===============================
// 事件委托：处理分支按钮点击
// ===============================
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.branch-btn');
    if (!btn) return;

    e.preventDefault();

    const group = btn.dataset.group;
    const index = btn.dataset.index;

    if (!group || !index) return;

    switchBranch(group, index);
});
