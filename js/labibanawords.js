(function () {

    function applyFont(size) {
        if (!document.body) return; // 保险

        if (size === 'big') {
            document.body.style.fontSize = '12pt';
        } else {
            document.body.style.fontSize = '9pt';
        }

        document.querySelectorAll('#smallfonter').forEach(el => {
            el.style.color = size === 'small' ? '#6B1E1E' : '#857E6E';
        });
        document.querySelectorAll('#bigfonter').forEach(el => {
            el.style.color = size === 'big' ? '#6B1E1E' : '#857E6E';
        });
    }

    // 等 DOM 就绪后再开始一切
    document.addEventListener('DOMContentLoaded', () => {

        // ① 自动应用字体（不等 sidebar）
        const savedFont = localStorage.getItem('fontSize') || 'small';
        applyFont(savedFont);

        // ② 事件委托（sidebar 晚到 / 复制 都 OK）
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

    });

})();
