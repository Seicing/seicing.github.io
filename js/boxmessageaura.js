var listText = ['atext', 'btext', 'ctext', 'dtext', 'etext', 'ftext', 'gtext', ]
var listButton = ['abutton', 'bbutton', 'cbutton', 'dbutton', 'ebutton', 'fbutton', 'gbutton', ]

function tipsg(a, b, c) {
    cleargasek(c);
    document.getElementById(a).style.display = "block";
    document.getElementById(b).style.color = "blue";
    $("#" + a + " img").each(function() {
        var src = $(this).attr("data-src");
        $(this).attr("src", src);
    });
}

function cleargasek(a) {
    for (var i = 0; i < listText.length; i++) {
        document.getElementById(listText[i] + a).style.display = "none";
    }
    for (var g = 0; g < listButton.length; g++) {
        document.getElementById(listButton[g] + a).style.color = "#D0C9B7";
    }
}