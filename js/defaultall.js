// 全局函数，用于设置和初始化移动端侧边栏
function setupMobileSidebar() {
    // 这个if判断确保只在移动端屏幕宽度下执行
    if (window.innerWidth > 767) {
        return;
    }

    const toggleButton = document.getElementById('sidebar-toggle-button');
    const overlay = document.getElementById('sidebar-overlay');
    const originalSidebar = document.getElementById('sidebar');

    if (!toggleButton || !overlay || !originalSidebar) {
        return;
    }

    // --- 核心修改：从“移动”内容变为“复制”内容 ---

    let attempts = 0;
    const maxAttempts = 20; // 最多尝试2秒

    const migrationInterval = setInterval(function () {
        attempts++;
        const contentSource = originalSidebar.querySelector('#scroll-1') || originalSidebar;

        if (contentSource.children.length > 0) {
            clearInterval(migrationInterval);

            // 1. 获取或创建抽屉容器
            let mobileDrawer = document.getElementById('mobile-drawer-container');
            if (!mobileDrawer) {
                mobileDrawer = document.createElement('div');
                mobileDrawer.id = 'mobile-drawer-container';
                document.body.appendChild(mobileDrawer);
            } else {
                // 如果已存在，先清空内容，以防万一
                mobileDrawer.innerHTML = '';
            }

            // 2. 使用 cloneNode(true) 进行“深拷贝”
            // 这是最关键的修改，它会复制节点及其所有子节点
            for (const child of contentSource.childNodes) {
                const clonedNode = child.cloneNode(true);
                mobileDrawer.appendChild(clonedNode);
            }

            // 3. 绑定事件 (确保只绑定一次)
            if (!toggleButton.dataset.listenerAttached) {
                function toggleSidebar() {
                    document.body.classList.toggle('sidebar-open');
                }
                toggleButton.addEventListener('click', toggleSidebar);
                overlay.addEventListener('click', toggleSidebar);
                toggleButton.dataset.listenerAttached = 'true';
            }

            // 注意：我们不再隐藏原始的 sidebar，CSS会处理它

        } else if (attempts >= maxAttempts) {
            clearInterval(migrationInterval);
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', setupMobileSidebar);

// ========================================================
// === 模块3: 独立处理“特殊页面”的黑色背景 ===
// ========================================================
function handleSpecialPageBackground() {
    // 1. 寻找页面上的“信标”div
    const beaconDiv = document.querySelector('.keep-original-background');

    // 2. 如果找到了信标...
    if (beaconDiv) {
        // 3. 选中所有需要改变背景的容器
        const elementsToChange = document.querySelectorAll(
            'html, body, #wrapper, #page, #content, .post, .entry'
        );

        // 4. 强行将它们的背景设置为黑色
        elementsToChange.forEach(element => {
            // 使用 setProperty 可以添加 !important，确保最高优先级
            element.style.setProperty('background', 'black', 'important');
        });
    }
}

// 在文档加载完成后，立即执行这个检查
document.addEventListener('DOMContentLoaded', handleSpecialPageBackground);