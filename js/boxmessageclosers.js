var listText = ['captaintext', 'Christmastext', 'cybertext', 'darklighttext', 'dragoniantext', 'eveningtext', 'housekeepertext', 'midnighttext', 'nightmaretext', 'princesstext', 'secrettext', 'springtext', 'whitewingstext', 'wondertext', 'yohotext', 'baitext']
var listButton = ['captainbutton', 'Christmasbutton', 'cyberbutton', 'darklightbutton', 'dragonianbutton', 'eveningbutton', 'housekeeperbutton', 'midnightbutton', 'nightmarebutton', 'princessbutton', 'secretbutton', 'springbutton', 'whitewingsbutton', 'wonderbutton', 'yohobutton', 'baibutton']

function tipsg(a, b, c) {
    cleargasek(c);
    document.getElementById(a).style.display = "block";
    document.getElementById(b).style.color = "blue";
    $("#" + a + " img").each(function () {
        var src = $(this).attr("data-src");
        $(this).attr("src", src);
    });
}

function cleargasek(a) {
    for (var i = 0; i < listText.length; i++) {
        document.getElementById(listText[i] + a).style.display = "none";
    }
    for (var g = 0; g < listButton.length; g++) {
        document.getElementById(listButton[g] + a).style.color = "#6383a8";
    }
}