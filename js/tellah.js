$(document).ready(function() {
    $("button").click(function() {
        var val = $('input:radio[name="questionichi"]:checked').val();
        if (val == 1) {
            var vitality1 = 50
            var intelligence1 = 0
            var physicalresistance1 = 0
        } else if (val == 2) {
            var vitality1 = 0
            var intelligence1 = 10
            var physicalresistance1 = 0
        } else if (val == 3) {
            var vitality1 = 0
            var intelligence1 = 0
            var physicalresistance1 = 10
        } else {
            var vitality1 = 0
            var intelligence1 = 0
            var physicalresistance1 = 0
        }

        var val = $('input:radio[name="questionni"]:checked').val();
        if (val == 1) {
            var sayafavor1 = 2
            var assginafavor1 = 0
            var krovifavor1 = -1
        } else if (val == 2) {
            var sayafavor1 = 0
            var assginafavor1 = 2
            var krovifavor1 = -1
        } else if (val == 3) {
            var sayafavor1 = -1
            var assginafavor1 = 0
            var krovifavor1 = 2
        } else if (val == 4) {
            var sayafavor1 = 0
            var assginafavor1 = 0
            var krovifavor1 = 0
        } else {
            var sayafavor1 = 0
            var assginafavor1 = 0
            var krovifavor1 = 0
        }


        var val = $('input:radio[name="questionsan"]:checked').val();
        if (val == 1) {
            var qualitiy1 = 10
            var intelligence2 = 0
            var spirit1 = 0
        } else if (val == 2) {
            var qualitiy1 = 0
            var intelligence2 = 10
            var spirit1 = 0
        } else if (val == 3) {
            var qualitiy1 = 0
            var intelligence2 = 0
            var spirit1 = 20
        } else {
            var qualitiy1 = 0
            var intelligence2 = 0
            var spirit1 = 0
        }

        var val = $('input:radio[name="questionyon"]:checked').val();
        if (val == 1) {
            var skill = "水龙卷"
            var qualitiy2 = 0
        } else if (val == 2) {
            var skill = "治愈之风"
            var qualitiy2 = 0
        } else if (val == 3) {
            var skill = " "
            var qualitiy2 = 10
        } else {
            var skill = " "
            var qualitiy2 = 0
        }

        var val = $('input:radio[name="questiongo"]:checked').val();
        if (val == 1) {
            var intelligence3 = 10
            var qualitiy3 = 0
            var magicresistance1 = 0
        } else if (val == 2) {
            var intelligence3 = 0
            var qualitiy3 = 10
            var magicresistance1 = 0
        } else if (val == 3) {
            var intelligence3 = 0
            var qualitiy3 = 0
            var magicresistance1 = 10
        } else {
            var intelligence3 = 0
            var qualitiy3 = 0
            var magicresistance1 = 0
        }

        var val = $('input:radio[name="questionroku"]:checked').val();
        if (val == 1) {
            var sayafavor2 = 2
            var assginafavor2 = 0
            var krovifavor2 = 0
            var magicresistance2 = 0
            var physicalresistance2 = 0
        } else if (val == 2) {
            var sayafavor2 = 0
            var assginafavor2 = 0
            var krovifavor2 = 2
            var magicresistance2 = 0
            var physicalresistance2 = 0
        } else if (val == 3) {
            var sayafavor2 = 0
            var assginafavor2 = 2
            var krovifavor2 = 0
            var magicresistance2 = 0
            var physicalresistance2 = 0
        } else if (val == 4) {
            var sayafavor2 = -2
            var assginafavor2 = -2
            var krovifavor2 = -2
            var magicresistance2 = 10
            var physicalresistance2 = 10
        } else {
            var sayafavor2 = 0
            var assginafavor2 = 0
            var krovifavor2 = 0
            var magicresistance2 = 0
            var physicalresistance2 = 0
        }

        var val = $('input:radio[name="questionshichi"]:checked').val();
        if (val == 1) {
            var intelligence4 = 10
            var spirit2 = 0
            var potential1 = 0
        } else if (val == 2) {
            var intelligence4 = 0
            var spirit2 = 10
            var potential1 = 0
        } else if (val == 3) {
            var intelligence4 = 0
            var spirit2 = 0
            var potential1 = 10
        } else {
            var intelligence4 = 0
            var spirit2 = 0
            var potential1 = 0
        }


        var val = $('input:radio[name="questionhachi"]:checked').val();
        if (val == 1) {
            var assginafavor3 = 2
            var intelligence5 = 15
            var krovifavor3 = 0
            var critical1 = 0
            var sayafavor3 = 0
            var potential2 = 0
        } else if (val == 2) {
            var assginafavor3 = 0
            var intelligence5 = 0
            var krovifavor3 = 2
            var critical1 = 15
            var sayafavor3 = 0
            var potential2 = 0
        } else if (val == 3) {
            var assginafavor3 = 0
            var intelligence5 = 0
            var krovifavor3 = 0
            var critical1 = 0
            var sayafavor3 = 2
            var potential2 = 13
        } else {
            var assginafavor3 = 0
            var intelligence5 = 0
            var krovifavor3 = 0
            var critical1 = 0
            var sayafavor3 = 0
            var potential2 = 0
        }

        var val = $('input:radio[name="questionkyuu"]:checked').val();
        if (val == 1) {
            var spirit3 = 0
            var intelligence6 = 20
            var support = "校长的符咒首饰"
        } else if (val == 2) {
            var spirit3 = 30
            var intelligence6 = 0
            var support = "校长的法阵首饰"
        } else {
            var spirit3 = 0
            var intelligence6 = 0
            var support = " "
        }


        var y = document.getElementById("critical");
        y.innerHTML = 0 + critical1;
        var y = document.getElementById("potential");
        y.innerHTML = 0 + potential1 + potential2;
        var y = document.getElementById("vitality");
        y.innerHTML = 85 + vitality1;
        var y = document.getElementById("spirit");
        y.innerHTML = 80 + spirit1 + spirit2 + spirit3;
        var y = document.getElementById("qualitiy");
        y.innerHTML = 25 + qualitiy1 + qualitiy2 + qualitiy3;
        var y = document.getElementById("intelligence");
        y.innerHTML = 52 + intelligence1 + intelligence2 + intelligence3 + intelligence4 + intelligence5 + intelligence6;
        var y = document.getElementById("physicalresistance");
        y.innerHTML = 45 + physicalresistance1 + physicalresistance2;
        var y = document.getElementById("magicresistance");
        y.innerHTML = 30 + magicresistance1 + magicresistance2;
        var y = document.getElementById("sayafavor");
        y.innerHTML = 0 + sayafavor1 + sayafavor2 + sayafavor3;
        var y = document.getElementById("assginafavor");
        y.innerHTML = 0 + assginafavor1 + assginafavor2 + assginafavor3;
        var y = document.getElementById("krovifavor");
        y.innerHTML = 0 + krovifavor1 + krovifavor2 + krovifavor3;
        var y = document.getElementById("skillmagic");
        y.innerHTML = skill + " " + support;
    });
});