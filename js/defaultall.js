// 全局函数，用于设置和初始化移动端侧边栏
function setupMobileSidebar() {
    // 这个if判断确保只在移动端屏幕宽度下执行
    if (window.innerWidth > 767) {
        return; // 如果不是移动端，则不执行任何操作
    }

    const toggleButton = document.getElementById('sidebar-toggle-button');
    const overlay = document.getElementById('sidebar-overlay');
    const originalSidebar = document.getElementById('sidebar');

    // 检查所需的基本元素是否存在
    if (!toggleButton || !overlay || !originalSidebar) {
        console.error('Sidebar components not found.');
        return;
    }

    // --- 核心改进：延迟检查机制 ---
    let attempts = 0;
    const maxAttempts = 20; // 最多尝试20次 (总共2秒)

    const migrationInterval = setInterval(function () {
        attempts++;

        // 1. 智能提取内容
        const contentSource = originalSidebar.querySelector('#scroll-1') || originalSidebar;

        // 2. 检查内容是否已加载
        // 如果 #sidebar (或 #scroll-1) 里面有子元素了，说明jQuery.load()很可能已完成
        if (contentSource.children.length > 0) {

            clearInterval(migrationInterval); // 找到内容，停止检查

            // 3. 创建我们自己的、干净的抽屉容器
            // 检查是否已存在，避免重复创建
            let mobileDrawer = document.getElementById('mobile-drawer-container');
            if (!mobileDrawer) {
                mobileDrawer = document.createElement('div');
                mobileDrawer.id = 'mobile-drawer-container';
                document.body.appendChild(mobileDrawer);
            }

            // 4. 内容迁移
            while (contentSource.firstChild) {
                mobileDrawer.appendChild(contentSource.firstChild);
            }

            // 5. 隐藏原始的sidebar
            originalSidebar.style.display = 'none';

            // 6. 绑定事件 (确保只绑定一次)
            if (!toggleButton.dataset.listenerAttached) {
                function toggleSidebar() {
                    document.body.classList.toggle('sidebar-open');
                }
                toggleButton.addEventListener('click', toggleSidebar);
                overlay.addEventListener('click', toggleSidebar);
                toggleButton.dataset.listenerAttached = 'true'; // 添加一个标记，表示已绑定
            }

        } else if (attempts >= maxAttempts) {
            // 如果2秒后还没加载内容，就停止检查，避免无限循环
            clearInterval(migrationInterval);
            console.warn('Sidebar content did not load in time.');
        }

    }, 100); // 每100毫秒检查一次
}

// 在文档加载完成后，开始执行我们的设置函数
document.addEventListener('DOMContentLoaded', setupMobileSidebar);