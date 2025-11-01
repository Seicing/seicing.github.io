document.addEventListener('DOMContentLoaded', function () {
    // 只在移动端执行
    if (window.innerWidth <= 767) {

        // --- 逻辑1：智能处理表格滚动 ---

        // 关键修复：首先获取当前屏幕的【实际宽度】
        const currentScreenWidth = window.innerWidth;

        const tables = document.querySelectorAll('.entry table');

        tables.forEach(function (table) {
            // 检查表格是否在HTML中手动定义了width属性
            if (table.hasAttribute('width')) {
                const definedWidth = parseInt(table.getAttribute('width'), 10);

                // 关键修复：将表格的定义宽度与【当前屏幕的实际宽度】进行比较
                // 而不是与固定的 767 比较
                if (!isNaN(definedWidth) && definedWidth > currentScreenWidth) {
                    // 只有当表格宽度确实大于当前屏幕宽度时，才添加滚动样式
                    table.classList.add('table-force-scroll');
                }
            }
            // 对于没有定义宽度，或者宽度小于当前屏幕宽度的表格，我们什么都不做。
            // 浏览器会自动尝试挤压它们以适应屏幕。
        });
    }
});