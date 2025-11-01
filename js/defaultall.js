
document.addEventListener('DOMContentLoaded', function () {
    // 只在移动端执行
    if (window.innerWidth <= 767) {

        // --- 逻辑1：智能处理表格滚动 ---
        const tables = document.querySelectorAll('.entry table');

        tables.forEach(function (table) {
            // 检查表格是否在HTML中手动定义了width属性
            if (table.hasAttribute('width')) {
                const definedWidth = parseInt(table.getAttribute('width'), 10);

                // 如果定义的宽度是有效的数字，并且大于767
                if (!isNaN(definedWidth) && definedWidth > 767) {
                    // 为这个表格添加 'table-force-scroll' 类，触发CSS中的滚动样式
                    table.classList.add('table-force-scroll');
                }
            }
            // 对于没有定义宽度，或者宽度小于767的表格，我们什么都不做。
            // 浏览器会自动尝试挤压它们以适应屏幕，这正是您想要的效果。
        });
    }
});