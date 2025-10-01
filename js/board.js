// --- START OF FILE board.js (Final Version with Permission Check) ---

// ========================================================================
// 配置
// ========================================================================
var APP_ID = 'RqwWmVs4oKjmOTPAhYwMX2hy-gzGzoHsz';
var APP_KEY = 'UxXJUj4aTuecwlTdmn4u3AGV';
var PAGE_COUNT = 10;
var hasBoardInitialized = false;
var pageMax = 1;

// ========================================================================
// 核心启动函数
// ========================================================================
function startApp() {
    var tryCount = 0;
    var maxTries = 100;

    var intervalId = setInterval(function () {
        if (typeof AV !== 'undefined') {
            clearInterval(intervalId);
            AV.init({ appId: APP_ID, appKey: APP_KEY });
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

// ========================================================================
// UI 和业务逻辑
// ========================================================================

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
        var pagesContainer = document.getElementById('comment_pages');
        if (pagesContainer) {
            pagesContainer.addEventListener('click', function (event) {
                if (event.target.matches('a[data-page]')) {
                    event.preventDefault();
                    var page = parseInt(event.target.getAttribute('data-page'));
                    if (page) loadPage(page);
                }
            });
        }
        var initialPage = parseInt(new URLSearchParams(window.location.search).get('page')) || pageMax;
        loadPage(initialPage);
    }, function (error) {
        console.error('Error counting comments:', error);
        // --- 关键改进：检查特定错误码 ---
        if (error && error.code === 403) {
            setStatus('获取留言总数失败：权限被拒绝。<br>请登录 LeanCloud 后台，在 TestObject 表的“权限”设置中，将 `count` 权限对“所有用户”开放。');
        } else {
            setStatus('获取留言总数失败，请刷新页面重试。');
        }
        hasBoardInitialized = false;
    });
}

function loadPage(page) {
    setStatus('正在加载第 ' + page + ' 页...');
    var url = new URL(window.location);
    url.searchParams.set('page', page);
    history.pushState({ page: page }, '', url);
    renderPagination(page);

    var query = new AV.Query('TestObject');
    query.exists('text');
    var floor = (page - 1) * PAGE_COUNT;
    query.limit(PAGE_COUNT);
    query.skip(floor);

    query.find().then(function (results) {
        renderComments(results, floor);
    }, function (error) {
        console.error('Error fetching comments:', error);
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

        htmlContent += `
            <div style="width: 100%; max-width: 650px; overflow-wrap: break-word;">
                <div>${text}</div>
                <br>
                <div style="text-align: right;">
                    ${(floor + i + 1)}楼  Posted by: ${authorHTML} | ${formattedTime}
                </div>
                <img src="https://seicing.com/res/131414.png" draggable="false" style="max-width: 100%;">
                <br>
            </div>
        `;
    }
    commentsGroup.innerHTML = htmlContent;
}

function sendMsg() {
    var textEl = document.getElementById('comment_text');
    var authorEl = document.getElementById('comment_author');
    if (!textEl || !authorEl) return;

    var text = textEl.value;
    var author = authorEl.value;

    if (text.trim() === "") return alert('请输入内容。');
    if (text.length > 200) return alert('内容不可超过200字节。');

    new AV.Object('TestObject').save({
        text: text,
        author: author
    }).then(function () {
        alert('提交成功！');
        loadPage(pageMax);
    }, function (error) {
        console.error('Error sending comment:', error);
        alert('提交失败，可能是网络问题，请稍后重试。');
    });
}

// ========================================================================
// 脚本入口
// ========================================================================
startApp();

// --- END OF FILE board.js (Final Version with Permission Check) ---