// --- START OF FILE board.js (Fixed Version) ---

var {
    Query,
    User
} = AV;

var APP_ID = 'RqwWmVs4oKjmOTPAhYwMX2hy-gzGzoHsz';
var APP_KEY = 'UxXJUj4aTuecwlTdmn4u3AGV';
var PAGE_COUNT = 15;


AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');

function newComment(text, author, time, floor) {
    author = author == '' ? '佚名' : author;
    var group = document.getElementById('comments');

    // 安全检查：确保 'comments' 元素存在
    if (!group) {
        console.error("Error: Element with id 'comments' not found.");
        return;
    }

    var layer = document.createElement('div');
    layer.style.width = '650px'; // 建议使用CSS单位
    group.appendChild(layer);

    var lines = text.split('\n');

    for (var i in lines) {
        var content = document.createElement('div');
        content.textContent = lines[i];
        layer.appendChild(content);
    }

    var br1 = document.createElement('br');
    layer.appendChild(br1);

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

    var br2 = document.createElement('br');
    layer.appendChild(br2);
}

function newPage(page) {
    var group = document.getElementById('comment_pages');

    // 安全检查：确保 'comment_pages' 元素存在
    if (!group) {
        console.error("Error: Element with id 'comment_pages' not found.");
        return;
    }

    var link = document.createElement('a');
    link.href = '?page=' + page;
    link.textContent = '[' + page + ']' + '  ';
    group.appendChild(link);
}

function initMsg() {
    var query = new AV.Query(TestObject);

    query.exists('text');
    query.count().then(function (count) {
        var pageMax = Math.ceil(count / PAGE_COUNT);
        var category = window.location.search;
        var page = category.substring(category.lastIndexOf('=') + 1, category.length);

        // 如果 page 参数为空或不是有效数字，则默认为最大页
        page = (page === '' || isNaN(parseInt(page))) ? pageMax : parseInt(page);

        // 清空旧的页码，防止重复添加
        var pagesGroup = document.getElementById('comment_pages');
        if (pagesGroup) pagesGroup.innerHTML = '';

        for (var i = pageMax; i >= 1; i--) {
            newPage(i);
        }

        // 计算正确的 skip 值
        var skipCount = (page - 1) * PAGE_COUNT;

        // LeanCloud 的查询是从新到旧排序的，所以我们的 skip 逻辑需要调整
        // 如果要显示第 page 页，我们需要跳过 (pageMax - page) * PAGE_COUNT 条记录
        var floor = (pageMax - page) * PAGE_COUNT;

        query.descending('createdAt'); // 确保按时间倒序排列
        query.limit(PAGE_COUNT);
        query.skip(floor);
        query.find().then(function (results) {
            // 翻转数组，使得最新的留言显示在最下方
            recvMsg(results.reverse(), (page - 1) * PAGE_COUNT);
        }, function (error) {
            console.error("Error fetching comments: ", error);
            alert("加载留言失败，请检查网络连接或稍后重试。");
        });
    }, function (error) {
        console.error("Error counting comments: ", error);
        alert("无法获取留言总数，请刷新页面。");
    });
}


function recvMsg(results, floor) {
    // 清空旧留言，防止刷新时内容重复
    var commentsGroup = document.getElementById('comments');
    if (commentsGroup) commentsGroup.innerHTML = '';

    for (var i = 0; i < results.length; i++) {
        var r = results[i];
        // 将 Date 对象格式化为更易读的字符串
        var createdAtDate = new Date(r.createdAt);
        var formattedTime = createdAtDate.getFullYear() + '-' + (createdAtDate.getMonth() + 1) + '-' + createdAtDate.getDate() + ' ' + createdAtDate.getHours() + ':' + ('0' + createdAtDate.getMinutes()).slice(-2);
        newComment(r.attributes.text, r.attributes.author, formattedTime, floor + i);
    }
}


function sendMsg() {
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
        console.error("Error saving comment: ", error);
        alert("提交失败，请检查网络连接或稍后重试。");
    });
}

// --- 主要的改动部分 ---
// 使用 DOMContentLoaded 事件来确保在执行 initMsg 之前，页面的HTML已经完全加载。
document.addEventListener('DOMContentLoaded', function () {
    initMsg();
});
// --- END OF FILE board.js (Fixed Version) ---