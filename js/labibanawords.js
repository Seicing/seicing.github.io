(function () {

    function applyFont(size) {
        if (size === 'big') {
            document.body.style.fontSize = '12pt';
        } else {
            document.body.style.fontSize = '9pt';
        }

        // 同步所有按钮状态（可能有多份 sidebar）
        document.querySelectorAll('#smallfonter').forEach(el => {
            el.style.color = size === 'small' ? '#6B1E1E' : '#857E6E';
        });
        document.querySelectorAll('#bigfonter').forEach(el => {
            el.style.color = size === 'big' ? '#6B1E1E' : '#857E6E';
        });
    }

    // ① 页面一加载就应用字体（不等 sidebar）
    const savedFont = localStorage.getItem('fontSize') || 'small';
    applyFont(savedFont);

    // ② 用事件委托，专治“后加载 / 复制 DOM”
    document.addEventListener('click', function (e) {
        if (e.target.id === 'smallfonter') {
            localStorage.setItem('fontSize', 'small');
            applyFont('small');
        }

        if (e.target.id === 'bigfonter') {
            localStorage.setItem('fontSize', 'big');
            applyFont('big');
        }
    });

})();
