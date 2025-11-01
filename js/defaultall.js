document.addEventListener('DOMContentLoaded', function () {
    // 定义一个处理表格滚动的函数
    function handleTableScrolling() {
        // 只在移动端屏幕尺寸下执行
        if (window.innerWidth > 767) {
            // 如果屏幕宽度大于767px，可以考虑移除已添加的样式，以恢复桌面端表现
            // （此部分为可选的额外优化）
            const tablesWithScroll = document.querySelectorAll('.entry .table-force-scroll');
            tablesWithScroll.forEach(function (table) {
                table.classList.remove('table-force-scroll');
            });
            return;
        }

        const currentScreenWidth = window.innerWidth;
        const tables = document.querySelectorAll('.entry table');

        tables.forEach(function (table) {
            // 检查表格是否在HTML中手动定义了width属性
            if (table.hasAttribute('width')) {
                const definedWidth = parseInt(table.getAttribute('width'), 10);

                if (!isNaN(definedWidth) && definedWidth > currentScreenWidth) {
                    // 当表格宽度大于当前屏幕宽度时，添加滚动样式
                    table.classList.add('table-force-scroll');
                } else {
                    // 如果表格宽度不再大于屏幕宽度，则移除滚动样式
                    table.classList.remove('table-force-scroll');
                }
            }
        });
    }

    // 1. 页面首次加载时，运行一次
    handleTableScrolling();

    // 2. 当浏览器窗口大小改变时，再次运行
    window.addEventListener('resize', handleTableScrolling);
});