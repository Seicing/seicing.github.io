var APP_ID = 'RqwWmVs4oKjmOTPAhYwMX2hy-gzGzoHsz';  // 请使用你自己的 APP_ID
var APP_KEY = 'UxXJUj4aTuecwlTdmn4u3AGV';  // 请使用你自己的 APP_KEY
var PAGE_COUNT = 10;
var hasBoardInitialized = false;
var pageMax = 1;

// 在页面加载时启动 LeanCloud 初始化
function startApp() {
    var tryCount = 0, maxTries = 100;
    var intervalId = setInterval(function () {
        if (typeof AV !== 'undefined') {
            clearInterval(intervalId);
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY,
                serverURL: "https://rqwwmvs4.lc-cn-n1-shared.com"
            });
            initBoard(); // 确保初始化完成后再调用初始化留言板的函数
        } else {
            tryCount++;
            if (tryCount > maxTries) {
                clearInterval(intervalId);
                setStatus('错误: LeanCloud 服务未能加载，请检查网络或脚本链接。');
            }
        }
    }, 100);
}

// 设置状态消息
function setStatus(message) {
    var statusDiv = document.getElementById('comment-status');
    if (statusDiv) statusDiv.innerHTML = message;
}

function initBoard() {
    if (hasBoardInitialized) return;
    hasBoardInitialized = true;
    setStatus('正在初始化留言板...');
    var query = new AV.Query('TestObject');
    query.exists('text');

    query.count().then(function (count) {
        pageMax = Math.ceil(count / PAGE_COUNT) || 1;

        // 检查 URL 中是否有 page 参数
        var pageParam = new URLSearchParams(window.location.search).get('page');

        // 如果 URL 中有 page 参数，则加载指定页面并滚动
        if (pageParam) {
            var page = parseInt(pageParam) || pageMax;  // 如果 URL 参数无效，加载最后一页
            loadPage(page, true);  // 第二个参数为 true，表示需要滚动
        } else {
            // 默认加载最后一页，且不滚动
            loadPage(pageMax, false); // 第二个参数为 false，表示不需要滚动
        }

    }).catch(function (error) {
        console.error('获取总数时出错:', error);

        // 根据错误类型显示不同提示
        if (error.message.includes('CORS')) {
            setStatus('跨域请求错误，请检查服务器设置。');
        } else {
            setStatus('留言板尝试加载中……');
        }

        // 自动调用重试
        setTimeout(function () {
            initBoard(); // 强制重试
        }, 1000);  // 延时1秒后执行重试

        hasBoardInitialized = false;
    });
}

function loadPage(page) {
    // 记录当前的滚动位置 (这行其实不再需要，但保留也无妨)
    var currentScroll = window.scrollY;

    setStatus('正在加载第 ' + page + ' 页...');
    history.pushState({ page: page }, '', '?page=' + page);
    renderPagination(page);

    var query = new AV.Query('TestObject');
    var floor = (page - 1) * PAGE_COUNT;
    query.limit(PAGE_COUNT);
    query.skip(floor);
    query.find().then(function (results) {
        renderComments(results, floor);

        // -- 已删除滚动相关的代码 --
        // 以下代码块已被完全移除，以防止任何自动滚动行为
        /*
        var commentsElement = document.getElementById('liuyanban');
        if (commentsElement) {
            commentsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo(0, document.body.scrollHeight);
        }
        */
    }, function (error) {
        console.error('尝试中:', error);
        setStatus('留言板加载中……');
    });
}

function renderPagination(currentPage) {
    var group = document.getElementById('comment_pages');
    if (!group) return;
    group.innerHTML = '';
    for (var i = pageMax; i >= 1; i--) {
        var link = document.createElement('a');
        link.href = '?page=' + i;
        link.setAttribute('data-page', i);
        link.textContent = '[' + i + ']' + '  ';
        if (i === currentPage) {
            link.style.fontWeight = 'bold';
            link.style.textDecoration = 'none';
        }
        group.appendChild(link);
    }
}

// 页面加载时启动 LeanCloud 初始化
window.onload = function () {
    startApp(); // 启动 LeanCloud 初始化
};


function renderComments(results, floor) {
    var commentsGroup = document.getElementById('comments');
    if (!commentsGroup) return;
    commentsGroup.innerHTML = '';
    setStatus('');
    if (results.length === 0) {
        setStatus('这里还没有留言哦。');
        return;
    }
    var htmlContent = '';
    for (var i = results.length - 1; i >= 0; i--) {
        var r = results[i];
        var createdAtDate = new Date(r.createdAt);
        var formattedTime = createdAtDate.getFullYear() + '-' + (createdAtDate.getMonth() + 1) + '-' + createdAtDate.getDate() + ' ' + ('0' + createdAtDate.getHours()).slice(-2) + ':' + ('0' + createdAtDate.getMinutes()).slice(-2);
        var author = r.attributes.author || '佚名';
        var text = (r.attributes.text || '').replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, '<br>');
        var authorHTML = author === 'python script -D' ? '<img src="https://seicing.com/res/seicingsign.png"><font color="red">精锐战猫</font>' : author;
        htmlContent += `<div style="width: 100%; max-width: 650px; overflow-wrap: break-word;"><div>${text}</div><br><div style="text-align: right;">${(floor + i + 1)}楼  Posted by: ${authorHTML} | ${formattedTime}</div><img src="https://seicing.com/res/131414.png" draggable="false" style="max-width: 100%;"><br></div>`;
    }
    commentsGroup.innerHTML = htmlContent;
}

function sendMsg() {
    var textEl = document.getElementById('comment_text'), authorEl = document.getElementById('comment_author');
    if (!textEl || !authorEl) return;
    var text = textEl.value, author = authorEl.value;
    if (text.trim() === "") return alert('请输入内容。');
    if (text.length > 200) return alert('内容不可超过200字节。');
    new AV.Object('TestObject').save({ text: text, author: author }).then(function () {
        alert('提交成功！');
        loadPage(pageMax);
    }, function (error) {
        console.error('提交留言时出错:', error);
        alert('提交失败，可能是网络问题，请稍后重试。');
    });
}

startApp();

// --- END OF FINAL board.js ---