document.addEventListener('DOMContentLoaded', function () {
    // 这个if判断确保只在移动端屏幕宽度下执行
    if (window.innerWidth <= 767) {

        const toggleButton = document.getElementById('sidebar-toggle-button');
        const overlay = document.getElementById('sidebar-overlay');
        const originalSidebar = document.getElementById('sidebar');

        // 检查所需的基本元素是否存在
        if (!toggleButton || !overlay || !originalSidebar) {
            console.error('Sidebar components not found.');
            return;
        }

        // 1. 创建我们自己的、干净的抽屉容器
        const mobileDrawer = document.createElement('div');
        mobileDrawer.id = 'mobile-drawer-container'; // 给它一个ID，方便用CSS控制

        // 2. 智能提取内容
        // 判断 #sidebar 里面是否有 #scroll-1
        const contentSource = originalSidebar.querySelector('#scroll-1') || originalSidebar;

        // 3. 内容迁移
        // 将源容器的所有子元素“过继”给我们的新抽屉容器
        while (contentSource.firstChild) {
            mobileDrawer.appendChild(contentSource.firstChild);
        }

        // 4. 将新的抽屉容器添加到body的末尾
        document.body.appendChild(mobileDrawer);

        // 5. 隐藏原始的、已被“掏空”的sidebar，以防万一
        originalSidebar.style.display = 'none';

        // 6. 定义切换函数，现在它只控制我们自己的新抽屉
        function toggleSidebar() {
            document.body.classList.toggle('sidebar-open');
        }

        // 7. 绑定事件
        toggleButton.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);
    }
});