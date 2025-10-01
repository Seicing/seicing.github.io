// --- START OF FINAL board.js ---

var APP_ID = 'RqwWmVs4oKjmOTPAhYwMX2hy-gzGzoHsz';
var APP_KEY = 'UxXJUj4aTuecwlTdmn4u3AGV';
var PAGE_COUNT = 10;
var hasBoardInitialized = false;
var pageMax = 1;

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
            initBoard();
        } else {
            tryCount++;
            if (tryCount > maxTries) {
                clearInterval(intervalId);
                setStatus('错误: LeanCloud 服务未能加载，请检查网络或脚本链接。');
            }
        }
    }, 100);
}

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

        // 如果 URL 中有 page 参数，则执行重试，自动加载对应的页面
        if (pageParam) {
            var page = parseInt(pageParam) || pageMax;  // 如果 URL 参数无效，加载最后一页
            loadPage(page);  // 加载指定页面
        } else {
            // 默认加载最后一页
            loadPage(pageMax);
        }

    }).catch(function (error) {
        console.error('获取总数时出错:', error);

        // 根据错误类型显示不同提示
        if (error.message.includes('CORS')) {
            setStatus('跨域请求错误，请检查服务器设置。');
        } else {
            setStatus('获取留言总数失败，请检查网络或刷新页面重试。');
        }

        // 添加重试按钮
        let retryButton = document.createElement('button');
        retryButton.textContent = '重试';
        retryButton.onclick = function () {
            initBoard();
        };
        document.getElementById('comment-status').appendChild(retryButton);
        hasBoardInitialized = false;
    });
}

function loadPage(page) {
    // 记录当前的滚动位置
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

        // 渲染完成后，恢复滚动位置并聚焦到底部
        window.scrollTo(0, document.body.scrollHeight);  // 自动滚动到页面底部
    }, function (error) {
        console.error('加载页面时出错:', error);
        setStatus('加载留言失败，请检查网络连接并刷新页面重试。');
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


function loadPage(page) {
    // 记录当前的滚动位置
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

        // 渲染完成后，恢复滚动位置
        window.scrollTo(0, currentScroll);  // 保持原来的滚动位置
    }, function (error) {
        console.error('加载页面时出错:', error);
        setStatus('加载留言失败，请检查网络连接并刷新页面重试。');
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