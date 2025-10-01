// --- START OF FILE board.js (Final Version with AJAX Pagination) ---

// ========================================================================
// 配置
// ========================================================================
var APP_ID = 'RqwWmVs4oKjmOTPAhYwMX2hy-gzGzoHsz';
var APP_KEY = 'UxXJUj4aTuecwlTdmn4u3AGV';
var PAGE_COUNT = 10;
var hasBoardInitialized = false;
var pageMax = 1; // 全局存储最大页数

// ========================================================================
// 核心启动函数：等待 LeanCloud SDK 就绪
// ========================================================================
function startApp() {
    var tryCount = 0;
    var maxTries = 100; // 等待10秒

    var intervalId = setInterval(function () {
        if (typeof AV !== 'undefined') {
            clearInterval(intervalId);
            AV.init({ appId: APP_ID, appKey: APP_KEY });
            initBoard(); // 改为调用初始化函数
        } else {
            tryCount++;
            if (tryCount > maxTries) {
                clearInterval(intervalId);
                setStatus('留言服务加载失败，请检查网络并刷新。');
            }
        }
    }, 100);
}

// ========================================================================
// UI 和业务逻辑函数
// ========================================================================

function setStatus(message) {
    var statusDiv = document.getElementById('comment-status');
    if (statusDiv) statusDiv.innerHTML = message;
}

// 初始设置 (只执行一次)
function initBoard() {
    if (hasBoardInitialized) return;
    hasBoardInitialized = true;

    setStatus('正在初始化留言板...');
    var query = new AV.Query('TestObject');
    query.exists('text');

    // 1. 先获取总数，计算出最大页码
    query.count().then(function (count) {
        pageMax = Math.ceil(count / PAGE_COUNT) || 1;

        // 2. 设置翻页链接的点击事件监听 (使用事件委托)
        var pagesContainer = document.getElementById('comment_pages');
        if (pagesContainer) {
            pagesContainer.addEventListener('click', function (event) {
                // 检查点击的是否是页码链接
                if (event.target.matches('a[data-page]')) {
                    event.preventDefault(); // 阻止页面跳转
                    var page = parseInt(event.target.getAttribute('data-page'));
                    loadPage(page);
                }
            });
        }

        // 3. 确定初始要加载的页码
        var initialPage = new URLSearchParams(window.location.search).get('page');
        initialPage = (initialPage === null || isNaN(parseInt(initialPage))) ? pageMax : parseInt(initialPage);

        // 4. 加载初始页面
        loadPage(initialPage);

    }, function (error) {
        console.error('Error counting comments:', error);
        setStatus('获取留言总数失败，请刷新页面重试。');
        hasBoardInitialized = false;
    });
}

// 加载指定页码内容的函数
function loadPage(page) {
    setStatus('正在加载第 ' + page + ' 页...');

    // 更新浏览器地址栏，但不刷新页面
    var url = new URL(window.location);
    url.searchParams.set('page', page);
    history.pushState({ page: page }, '', url);

    // 重新渲染页码链接，并高亮当前页
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

// 渲染页码链接的函数
function renderPagination(currentPage) {
    var group = document.getElementById('comment_pages');
    if (!group) return;
    group.innerHTML = ''; // 清空旧的页码

    for (var i = pageMax; i >= 1; i--) {
        var link = document.createElement('a');
        link.href = '?page=' + i;
        link.setAttribute('data-page', i); // 使用 data-* 属性存储页码
        link.textContent = '[' + i + ']' + '  ';
        if (i === currentPage) {
            link.style.fontWeight = 'bold'; // 高亮当前页
            link.style.textDecoration = 'none';
        }
        group.appendChild(link);
    }
}

// 渲染留言列表的函数
function renderComments(results, floor) {
    var commentsGroup = document.getElementById('comments');
    if (!commentsGroup) return;
    commentsGroup.innerHTML = ''; // 清空旧的留言

    setStatus(''); // 清空状态消息
    if (results.length === 0) {
        setStatus('这里还没有留言哦。');
        return;
    }

    for (var i = results.length - 1; i >= 0; i--) {
        var r = results[i];
        var createdAtDate = new Date(r.createdAt);
        var formattedTime = createdAtDate.getFullYear() + '-' + (createdAtDate.getMonth() + 1) + '-' + createdAtDate.getDate() + ' ' + ('0' + createdAtDate.getHours()).slice(-2) + ':' + ('0' + createdAtDate.getMinutes()).slice(-2);

        var author = r.attributes.author || '佚名';
        var text = r.attributes.text || '';

        // --- 调用 newComment 渲染单条留言 ---
        var commentHTML = `
            <div style="width: 100%; max-width: 650px;">
                <div>${text.replace(/\n/g, '<br>')}</div>
                <br>
                <div style="text-align: right;">
                    ${(floor + i + 1)}楼  Posted by: 
                    ${author === 'python script -D' ? '<img src="https://seicing.com/res/seicingsign.png"><font color="red">精锐战猫</font>' : author} 
                    | ${formattedTime}
                </div>
                <img src="https://seicing.com/res/131414.png" draggable="false">
                <br>
            </div>
        `;
        commentsGroup.innerHTML += commentHTML;
    }
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
        // 跳转到第一页查看最新留言
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

// --- END OF FILE board.js (Final Version with AJAX Pagination) ---