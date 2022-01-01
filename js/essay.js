

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

$(document).ready(function () {
    $('#sidebar').load('https://seicing.com/js/list/essay.html');
})

function cnmsb() {
    document.getElementById("essaybu").innerHTML = "<img src='https://seicing.com/res/dex.jpg' id='dex'><a href='https://seicing.com/html/index.html'><b>回到首页</b></a>";
    document.getElementById("dex").onload = function () {
        var tipsp1 = getQueryVariable("nenbun")
        var tipsp2 = tipsp1 + "button";
        document.getElementById(tipsp2).click();
    }
}


function overstep(a, b) {
    document.getElementById("hajimebutton").style.display = "block";
    document.getElementById("hattenbutton").style.display = "block";
    document.getElementById("tsuzukubutton").style.display = "block";
    document.getElementById("haneibutton").style.display = "block";
    document.getElementById(a).style.display = "none";
    document.getElementById("hajimediv").style.display = "none";
    document.getElementById("hattendiv").style.display = "none";
    document.getElementById("tsuzukudiv").style.display = "none";
    document.getElementById("haneidiv").style.display = "none";
    document.getElementById(b).style.display = "block";
}


