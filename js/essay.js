$(document).ready(function () {
    $('#sidebar').load('https://seicing.com/js/list/essay.html');
})

function overstep(a, b) {
    document.getElementById("y2019").style.display = "block";
    document.getElementById("y2020").style.display = "block";
    document.getElementById("y2021").style.display = "block";
    document.getElementById("y2022").style.display = "block";
    document.getElementById(a).style.display = "none";
    document.getElementById("y2019div").style.display = "none";
    document.getElementById("y2020div").style.display = "none";
    document.getElementById("y2021div").style.display = "none";
    document.getElementById("y2022div").style.display = "none";
    document.getElementById(b).style.display = "block";
}
