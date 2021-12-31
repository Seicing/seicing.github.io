$(document).ready(function () {
    $('#sidebar').load('https://seicing.com/js/list/essay.html');
})

function overstep(a, b) {
    document.getElementById("hajime").style.display = "block";
    document.getElementById("hatten").style.display = "block";
    document.getElementById("tsuzuku").style.display = "block";
    document.getElementById("hanei").style.display = "block";
    document.getElementById(a).style.display = "none";
    document.getElementById("hajimediv").style.display = "none";
    document.getElementById("hattendiv").style.display = "none";
    document.getElementById("tsuzukudiv").style.display = "none";
    document.getElementById("haneidiv").style.display = "none";
    document.getElementById(b).style.display = "block";
}
