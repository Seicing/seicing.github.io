var listText = ['atext', 'btext', 'ctext', 'dtext', 'etext', 'ftext', 'gtext', 'htext', 'itext', 'jtext', 'ktext', 'ltext', 'mtext', 'ntext', 'otext', 'ptext', 'qtext', 'rtext', 'stext', 'ttext', 'utext', 'vtext',  ]
var listButton = ['abutton', 'bbutton', 'cbutton', 'dbutton', 'ebutton', 'fbutton', 'gbutton', 'hbutton', 'ibutton', 'jbutton', 'kbutton', 'lbutton', 'mbutton', 'nbutton', 'obutton', 'pbutton', 'qbutton', 'rbutton', 'sbutton', 'tbutton',  'ubutton','vbutton',]

function tipsg(a, b, c) {
    cleargasek(c);
    document.getElementById(a).style.display = "block";
    document.getElementById(b).style.opacity = "1.0";
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
        document.getElementById(listButton[g] + a).style.opacity = "0.3";
    }
}