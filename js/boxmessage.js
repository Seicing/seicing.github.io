var listText = ['cntext', 'entext', 'jptext', 'kotext']
var listButton = ['cnbutton', 'enbutton', 'jpbutton', 'kobutton']

function tipsg(a, b, c) {
    // 1. 先清除所有文本的显示状态和所有按钮的特殊样式
    cleargasek(c);

    // 2. 显示当前文本
    var textElem = document.getElementById(a);
    if (textElem) {
        textElem.style.display = "block";
    }

    // 3. 为当前点击的按钮加上 "special-link" class
    var btnElem = document.getElementById(b);
    if (btnElem) {
        btnElem.classList.add("special-link");
        btnElem.classList.remove("special-text-link");
    }
}

function cleargasek(a) {
    // 隐藏所有文本
    for (var i = 0; i < listText.length; i++) {
        var textElem = document.getElementById(listText[i] + a);
        if (textElem) {
            textElem.style.display = "none";
        }
    }

    // 重置所有按钮的样式，并去掉 "special-link" class
    for (var g = 0; g < listButton.length; g++) {
        var btnElem = document.getElementById(listButton[g] + a);
        if (btnElem) {
            btnElem.classList.add("special-text-link");
            btnElem.classList.remove("special-link");
        }
    }
}