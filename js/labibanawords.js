function applyFont(size) {
    if (size === 'big') {
        document.body.style.fontSize = '12pt';
        smallfonter.style.color = '#857E6E';
        bigfonter.style.color = '#6B1E1E';
    } else {
        document.body.style.fontSize = '9pt';
        smallfonter.style.color = '#6B1E1E';
        bigfonter.style.color = '#857E6E';
    }
}

// 绑定点击事件
const smallfonter = document.getElementById('smallfonter');
const bigfonter = document.getElementById('bigfonter');

smallfonter.addEventListener('click', () => {
    localStorage.setItem('fontSize', 'small');
    applyFont('small');
});

bigfonter.addEventListener('click', () => {
    localStorage.setItem('fontSize', 'big');
    applyFont('big');
});

// 页面加载时自动应用
document.addEventListener('DOMContentLoaded', () => {
    const savedFont = localStorage.getItem('fontSize') || 'small';
    applyFont(savedFont);
}); 