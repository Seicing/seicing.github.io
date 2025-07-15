var imgAll = [];
const vm = new Vue({
    el: '#app',
    data: {
        aasb: [],
    },
    created() {
        characterid = document.getElementById("overdrive").innerHTML;
        characterid2 = "https://seicing.com/js/dia/" + characterid + ".json";
        fetch(characterid2)
            .then(response => response.json())
            .then(json => {
                this.aasb = json
                for (var i = 0; i < json.length; i++) {
                    facer = eval('face_' + json[i]['face'])

                    json[i].charname = json[i]['name']
                    json[i].texter = json[i]['string']

                    if (json[i].con.includes("RF")) {
                        json[i].red_face = 'red_face';
                    } else {
                        json[i].red_face = 'red_face1';
                    }
                    if (json[i].con.includes("SW")) {
                        json[i].sweat = 'sweat';
                    } else {
                        json[i].sweat = 'sweat1';
                    }
                    if (json[i].con.includes("AT")) {
                        json[i].attach = 'attach';
                    } else {
                        json[i].attach = 'attach1';
                    }
                    if (json[i].con.includes("SP")) {
                        json[i].special = 'special';
                    } else {
                        json[i].special = 'special1';
                    }

                    if (json[i].con.includes("CE")) {
                        json[i].eye = facer[2];
                    } else {
                        json[i].eye = facer[0];
                    }

                    if (json[i].con.includes("AL")) {
                        json[i].baseys = 'base2';
                    } else {
                        json[i].baseys = 'base';
                    }

                    if (json[i].branch != "") {
                        json[i].bclass = json[i].branch;
                    } else {
                        json[i].bclass = 'master';
                    }

                    json[i].brow = facer[3]
                    json[i].mouth = facer[4]

                    if (json[i].dic == 4) {

                        if (json[i].branch != "") {
                            if (json[i].branch.includes("1")) {
                                json[i].bstyle = "float:left;";
                            } else {
                                json[i].bstyle = "float:left;display:none;";
                            }
                        } else {
                            json[i].bstyle = "float:left;";
                        }

                        json[i].tablelavivanar = "tablebana";

                        json[i].tr1 = "<td rowspan='2' style='position:relative;width:180px;'></td><td id='banaheader' style='border-bottom:2px solid rgb(208,201,183);'><span>" + json[i].charname + "</span></td>"
                        json[i].tr2 = "<td width='300px'><span>" + json[i].texter + "</span></td>"

                        json[i].astyle = "padding: 5px;border-radius: 15px;background: rgb(37, 37, 37);" +
                            "background-image: url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['attach'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['special'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['sweat'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['red_face'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['brow'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['eye'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['mouth'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['baseys'] + ".png);" +
                            "background-repeat: no-repeat;background-position: left center;background-size: 40%;";
                    }

                    if (json[i].dic == 1) {

                        if (json[i].branch != "") {
                            if (json[i].branch.includes("1")) {
                                json[i].bstyle = "float:left;";
                            } else {
                                json[i].bstyle = "float:left;display:none;";
                            }

                        } else {
                            json[i].bstyle = "float:left;";
                        }

                        json[i].tablelavivanar = "tablebana";

                        json[i].tr1 = "<td id='banaheader' style='border-bottom:2px solid rgb(208,201,183);'><span>" + json[i].charname + "</span></td><td rowspan='2' style='position:relative;width:180px;'></td>"
                        json[i].tr2 = "<td width='300px'><span>" + json[i].texter + "</span></td>"

                        json[i].astyle = "padding: 5px;border-radius: 15px;background: rgb(37, 37, 37);" +
                            "background-image: url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['attach'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['special'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['sweat'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['red_face'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['brow'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['eye'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['mouth'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['baseys'] + ".png);" +
                            "background-repeat: no-repeat;background-position: right center;background-size: 40%;";
                    }

                    if (json[i].dic == 3) {

                        if (json[i].branch != "") {
                            if (json[i].branch.includes("1")) {
                                json[i].bstyle = "float:right;";
                            } else {
                                json[i].bstyle = "float:right;display:none;";
                            }
                        } else {
                            json[i].bstyle = "float:right;";
                        }

                        json[i].tablelavivanar = "tablebana";

                        json[i].tr1 = "<td id='banaheader' style='border-bottom:2px solid rgb(208,201,183);'><span>" + json[i].charname + "</span></td><td rowspan='2' style='position:relative;width:180px;'></td>"
                        json[i].tr2 = "<td width='300px'><span>" + json[i].texter + "</span></td>"

                        json[i].astyle = "padding: 5px;border-radius: 15px;background: rgb(37, 37, 37);" +
                            "background-image: url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['attach'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['special'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['sweat'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['red_face'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['brow'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['eye'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['mouth'] + ".png)," +
                            "url(https://data.seicing.com/seicingdepot/fatcatpool/essay/chara/" + json[i]['char'] + "/" + json[i]['baseys'] + ".png);" +
                            "background-repeat: no-repeat;background-position: right center;background-size: 40%;";
                    }

                    if (json[i].dic == 2) {

                        if (json[i].branch != "") {
                            if (json[i].branch.includes("1")) {
                                json[i].bstyle = "float: left;position:relative;left:20%;";
                            } else {
                                json[i].bstyle = "float: left;position:relative;left:20%;display:none;";
                            }
                        } else {
                            json[i].bstyle = "float: left;position:relative;left:20%;";
                        }

                        json[i].tablelavivanar = "tablebana2";
                        json[i].astyle = "padding: 5px;border-radius: 15px;background: rgb(37, 37, 37);"
                        json[i].tr1 = "<td><span>" + json[i].texter + "</span></td>"
                        json[i].tr2 = " "
                    }
                }
            })
    }
})

function brIn(a) {
    const elements = document.querySelectorAll('.' + a);
    elements.forEach(element => {
        element.style.display = 'block';
    });
    const el = 'branch' + a;
    document.getElementById(el).style.color = '#00ff00';
}

function brOut(a) {
    const elements = document.querySelectorAll('.' + a);
    elements.forEach(element => {
        element.style.display = 'none';
    });
    const el = 'branch' + a;
    document.getElementById(el).style.color = '#D0C9B7';
}

