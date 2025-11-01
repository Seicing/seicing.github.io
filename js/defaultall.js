// 等待整个网页文档加载完成后再执行
document.addEventListener('DOMContentLoaded', function () {
    // 这个if判断确保只在移动端屏幕宽度下执行，避免影响桌面端
    if (window.innerWidth <= 767) {

        // 获取我们需要的元素
        const toggleButton = document.getElementById('sidebar-toggle-button');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');

        // 检查元素是否存在，避免出错
        if (toggleButton && sidebar && overlay) {

            // 定义一个函数来切换侧边栏的显示/隐藏
            function toggleSidebar() {
                // 这是核心：在 body 元素上添加/移除一个叫 'sidebar-open' 的 class
                // 所有的CSS动画都依赖于这个class
                document.body.classList.toggle('sidebar-open');
            }

            // 当悬浮按钮被点击时，执行切换函数
            toggleButton.addEventListener('click', toggleSidebar);

            // 当遮罩层被点击时，也执行切换函数（即关闭侧边栏）
            overlay.addEventListener('click', toggleSidebar);
        }
    }
});