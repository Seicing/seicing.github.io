(function () {

    function applyFont(size) {
        if (!document.body) return;

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

    document.addEventListener('DOMContentLoaded', () => {

        const getSavedFont = () => localStorage.getItem('fontSize') || 'small';

        // ① 首次应用（保证字体正确）
        applyFont(getSavedFont());

        // ② 点击切换
        document.addEventListener('click', e => {
            if (e.target.id === 'smallfonter') {
                localStorage.setItem('fontSize', 'small');
                applyFont('small');
            }
            if (e.target.id === 'bigfonter') {
                localStorage.setItem('fontSize', 'big');
                applyFont('big');
            }
        });

        // ③ 监听 sidebar / 弹窗 被插入 DOM
        const observer = new MutationObserver(() => {
            applyFont(getSavedFont());
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });

})();
