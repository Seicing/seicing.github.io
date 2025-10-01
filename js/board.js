// --- START OF FILE board.js (Final Recommended Version) ---

var {
    Query,
    User
} = AV;

var APP_ID = 'RqwWmVs4oKjmOTPAhYwMX2hy-gzGzoHsz';
var APP_KEY = 'UxXJUj4aTuecwlTdmn4u3AGV';
var PAGE_COUNT = 10;

// --- 新增：哨兵变量，防止重复初始化 ---
var hasBoardInitialized = false;

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');

function newComment(text, author, time, floor) {
    author = author === '' ? '佚名' : author;
    var group = document.getElementById('comments');

    if (!group) {
        console.error("Fatal Error: Element with id 'comments' not found in the DOM.");
        return;
    }

    // ... (函数其余部分不变) ...
    var layer = document.createElement('div');
    layer.style.width = '650px';
    group.appendChild(layer);

    var lines = text.split('\n');
    for (var i in lines) {
        var content = document.createElement('div');
        content.textContent = lines[i];
        layer.appendChild(content);
    }

    layer.appendChild(document.createElement('br'));

    var msg = document.createElement('div');
    if (author == 'python script -D') {
        msg.innerHTML = (floor + 1) + '楼  Posted by: ' + '   ' + ' <img src="https://seicing.com/res/seicingsign.png"><font color="red">精锐战猫</font> ' + ' | ' + time;
    } else {
        msg.textContent = (floor + 1) + '楼  Posted by: ' + author + ' | ' + time;
    }
    msg.align = 'right';
    layer.appendChild(msg);

    var img = document.createElement('img');
    img.src = 'https://seicing.com/res/131414.png';
    img.draggable = false;
    layer.appendChild(img);

    layer.appendChild(document.createElement('br'));
}

function newPage(page) {
    var group = document.getElementById('comment_pages');
    if (!group) {
        console.error("Fatal Error: Element with id 'comment_pages' not found in the DOM.");
        return;
    }
    var link = document.createElement('a');
    link.href = '?page=' + page;
    link.textContent = '[' + page + ']' + '  ';
    group.appendChild(link);
}

function initMsg() {
    // --- 新增：检查哨兵变量 ---
    if (hasBoardInitialized) {
        return; // 如果已经初始化过了，就直接退出，不再执行
    }
    hasBoardInitialized = true; // 标记为已初始化

    var query = new AV.Query(TestObject);

    query.exists('text');
    query.count().then(function (count) {
        var pageMax = Math.ceil(count / PAGE_COUNT);
        var category = window.location.search;
        var page = category.substring(category.lastIndexOf('=') + 1, category.length);
        page = (page === '' || isNaN(parseInt(page))) ? pageMax : parseInt(page);

        var pagesGroup = document.getElementById('comment_pages');
        if (pagesGroup) pagesGroup.innerHTML = '';

        for (var i = pageMax; i >= 1; i--) {
            newPage(i);
        }

        var floor = (page - 1) * PAGE_COUNT;

        query.limit(PAGE_COUNT);
        query.skip(floor);
        query.find().then(function (results) {
            recvMsg(results, floor);
        }, function (error) {
            console.error('Error while fetching comments:', error);
            hasBoardInitialized = false; // 出错了，允许重试
        });
    }, function (error) {
        console.error('Error while counting comments:', error);
        hasBoardInitialized = false; // 出错了，允许重试
    });
}

function recvMsg(results, floor) {
    var commentsGroup = document.getElementById('comments');
    if (commentsGroup) commentsGroup.innerHTML = '';

    for (var i = results.length - 1; i >= 0; i--) {
        var r = results[i];
        var createdAtDate = new Date(r.createdAt);
        var formattedTime = createdAtDate.getFullYear() + '-' + (createdAtDate.getMonth() + 1) + '-' + createdAtDate.getDate() + ' ' + ('0' + createdAtDate.getHours()).slice(-2) + ':' + ('0' + createdAtDate.getMinutes()).slice(-2);
        newComment(r.attributes.text, r.attributes.author, formattedTime, floor + i);
    }
}

function sendMsg() {
    // ... sendMsg 函数不变 ...
    var text = document.getElementById('comment_text').value;
    var author = document.getElementById('comment_author').value;

    if (text.trim() === "") {
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
    }).then(function (object) {
        alert('提交成功！');
        location.reload();
    }, function (error) {
        console.error('Error while sending comment:', error);
        alert('提交失败，可能是网络问题，请稍后重试。');
    });
}


window.onload = function () {
    initMsg();
};

// --- END OF FILE board.js (Final Recommended Version) ---