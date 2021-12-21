var {
    Query,
    User
} = AV;

var APP_ID = 'RqwWmVs4oKjmOTPAhYwMX2hy-gzGzoHsz';
var APP_KEY = 'UxXJUj4aTuecwlTdmn4u3AGV';
var PAGE_COUNT = 10;


AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');

function newComment(text, author, time, floor) {


    author = author == '' ? '佚名' : author;
    var group = document.getElementById('comments');

    var layer = document.createElement('div');
    layer.style.width = 650;
    group.appendChild(layer);

    var lines = text.split('\n');

    for (var i in lines) {
        var content = document.createElement('div');
        content.textContent = lines[i];
        layer.appendChild(content);
    }

    var br = document.createElement('br');
    layer.appendChild(br);

    if (author == 'python script -D') {
        var msg = document.createElement('div');
        msg.innerHTML = (floor + 1) + '楼  Posted by: ' + '   ' + ' <img src="http://seicing.com/res/seicingsign.png"><font color="red">精锐战猫</font> ' + ' | ' + time;
        msg.align = 'right';
        layer.appendChild(msg);
    } else {
        var msg = document.createElement('div');
        msg.textContent = (floor + 1) + '楼  Posted by: ' + author + ' | ' + time;
        msg.align = 'right';
        layer.appendChild(msg);
    }

    var img = document.createElement('img');
    img.src = 'http://seicing.com/res/131414.png';
    img.draggable = false;
    layer.appendChild(img);

    var br = document.createElement('br');
    layer.appendChild(br);
}

function newPage(page) {
    var group = document.getElementById('comment_pages');
    var link = document.createElement('a');
    link.href = '?page=' + page;
    link.textContent = '[' + page + ']' + '  ';
    group.appendChild(link);
}

function initMsg() {
    var query = new AV.Query(TestObject);

    query.exists('text');
    query.count().then(function(count) {
        var pageMax = Math.ceil(count / PAGE_COUNT);
        var category = window.location.search;
        var page = category.substring(category.lastIndexOf('=') + 1, category.length);
        page = page == '' ? pageMax : page;

        for (var i = pageMax; i >= 1; i--) {
            newPage(i);
        }

        var floor = (page - 1) * PAGE_COUNT;

        query.limit(PAGE_COUNT);
        query.skip(floor);
        query.find().then(function(results) {
            recvMsg(results, floor);
        });
    });
}

function recvMsg(results, floor) {
    for (var i = results.length - 1; i >= 0; i--) {
        var r = results[i];
        newComment(r.attributes.text, r.attributes.author, r.createdAt, floor + i);
    }
}

function sendMsg() {
    var text = document.getElementById('comment_text').value;
    var author = document.getElementById('comment_author').value;

    if (text == "") {
        alert('请输入内容。');
        return;
    } else if (text.length > 200) {
        alert('内容不可超过200字节。');
        return;
    }

    var testObject = new TestObject();
    testObject.save({
        text: text,
        author: author
    }).then(function(object) {
        alert('提交成功！');
        location.reload();
    });



}