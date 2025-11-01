document.addEventListener('DOMContentLoaded', function () {
    // 只在桌面端执行
    if (window.innerWidth >= 768) {

        // --- 功能1：动态设置 z-index ---
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');

        if (sidebar && content) {
            // 获取 sidebar 最终计算后的样式
            const sidebarStyle = window.getComputedStyle(sidebar);
            const sidebarZIndex = sidebarStyle.zIndex;

            // 如果 z-index 是 'auto' 或非数字，则视作 0
            const baseZIndex = isNaN(parseInt(sidebarZIndex, 10)) ? 0 : parseInt(sidebarZIndex, 10);

            // 将 content 的 z-index 设置为 sidebar 的 z-index + 1
            content.style.zIndex = baseZIndex + 1;
        }

        // --- 功能2：默认滚动到最右 ---
        const scrollableElement = document.documentElement;
        if (scrollableElement.scrollWidth > scrollableElement.clientWidth) {
            scrollableElement.scrollLeft = scrollableElement.scrollWidth - scrollableElement.clientWidth;
        }
    }
});