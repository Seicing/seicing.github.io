var listText = ['cntext', 'entext', 'jptext', 'kotext']
var listButton = ['cnbutton', 'enbutton', 'jpbutton', 'kobutton']

function tipsg(a, b, c) {
    cleargasek(c);
    document.getElementById(a).style.display = "block";
    document.getElementById(b).style.color = "blue";
}

function cleargasek(a) {
    for (var i = 0; i < listText.length; i++) {
        document.getElementById(listText[i] + a).style.display = "none";
    }
    for (var g = 0; g < listButton.length; g++) {
        document.getElementById(listButton[g] + a).style.color = "#D0C9B7";
    }
}