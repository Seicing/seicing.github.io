/*
=====================================================================
=== Global Layout Controller v4.0 (SAFE PATCH)
=====================================================================
*/

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function conditionallyReplaceLinkColor(container) {
    if (!container) return;
    const links = container.querySelectorAll('a');
    const targetColor = 'rgb(3, 102, 214)';
    const replacementColor = '#D0C9B7';
    links.forEach(link => {
        const currentColor = window.getComputedStyle(link).color;
        if (currentColor === targetColor) {
            link.style.setProperty('color', replacementColor, 'important');
        }
    });
}

function cloneSidebarContent() {
    const originalSidebar = document.getElementById('sidebar');
    if (!originalSidebar) return;

    let attempts = 0;
    const maxAttempts = 20;

    const migrationInterval = setInterval(() => {
        attempts++;
        const contentSource =
            originalSidebar.querySelector('#scroll-1') || originalSidebar;

        if (contentSource.children.length > 0 || attempts >= maxAttempts) {
            clearInterval(migrationInterval);
            if (contentSource.children.length === 0) return;

            let mobileDrawer = document.getElementById('mobile-drawer-container');
            if (!mobileDrawer) {
                mobileDrawer = document.createElement('div');
                mobileDrawer.id = 'mobile-drawer-container';
                document.body.appendChild(mobileDrawer);
            }

            // ★ 防止重复 clone / transform
            if (mobileDrawer.dataset.cloned) return;
            mobileDrawer.dataset.cloned = 'true';

            mobileDrawer.innerHTML = '';

            for (const child of contentSource.childNodes) {
                mobileDrawer.appendChild(child.cloneNode(true));
            }

            conditionallyReplaceLinkColor(mobileDrawer);

            // ★ essay.js 安全调用
            if (typeof transformClonedEssayList === 'function') {
                try {
                    transformClonedEssayList(mobileDrawer);
                } catch (e) {
                    console.error('[Essay transform failed]', e);
                }
            }

            console.log('Success: Sidebar content has been cloned ONCE.');
        }
    }, 100);
}

function bindSidebarToggleEventsOnce() {
    const toggleButton = document.getElementById('sidebar-toggle-button');
    const overlay = document.getElementById('sidebar-overlay');
    const body = document.body;

    if (!toggleButton || !overlay || toggleButton.dataset.eventsBound) return;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('sidebar-fixed');
        body.classList.toggle('sidebar-open', body.classList.contains('sidebar-fixed'));
    });

    overlay.addEventListener('click', () => {
        body.classList.remove('sidebar-fixed', 'sidebar-open');
    });

    toggleButton.dataset.eventsBound = 'true';
}

function handleSpecialPageBackground() {
    if (window.innerWidth > 767) return;
    if (document.querySelector('.keep-original-background')) {
        document.querySelectorAll(
            'html, body, #wrapper, #page, #content, .post, .entry'
        ).forEach(el => {
            el.style.setProperty(
                'background',
                "url('https://seicing.com/res/textile_pattern_mip0.png')",
                'important'
            );
        });
    }
}

function bindBackToTopEventsOnce() {
    const btn = document.getElementById('back-to-top-button');
    if (!btn || btn.dataset.eventsBound) return;

    btn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.dataset.eventsBound = 'true';
}

function positionBackToTopButton() {
    const btn = document.getElementById('back-to-top-button');
    const wrapper = document.getElementById('wrapper');
    if (!btn || !wrapper) return;

    const toggleButton = document.getElementById('sidebar-toggle-button');
    const isMobile = toggleButton && getComputedStyle(toggleButton).display !== 'none';

    if (isMobile) {
        btn.style.left = '';
    } else {
        const rect = wrapper.getBoundingClientRect();
        let left = rect.right + 20;
        if (wrapper.offsetWidth === 1850) left -= 25;
        btn.style.left = left + 'px';
    }

    btn.style.opacity = '1';
}

function conditionallyManageLayout() {
    if (window.innerWidth >= 1280) return;

    const mobileDrawer = document.getElementById('mobile-drawer-container');
    if (mobileDrawer && mobileDrawer.children.length > 0) return;

    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    if (sidebar.children.length > 0) {
        cloneSidebarContent();
        handleSpecialPageBackground();
        return;
    }

    const observer = new MutationObserver((list, obs) => {
        for (const m of list) {
            if (m.type === 'childList' && m.addedNodes.length > 0) {
                cloneSidebarContent();
                handleSpecialPageBackground();
                obs.disconnect();
                break;
            }
        }
    });

    observer.observe(sidebar, { childList: true });

    setTimeout(() => observer.disconnect(), 10000);
}

document.addEventListener('DOMContentLoaded', () => {
    bindSidebarToggleEventsOnce();
    bindBackToTopEventsOnce();
    conditionallyManageLayout();
    positionBackToTopButton();
});

window.addEventListener(
    'resize',
    debounce(() => {
        conditionallyManageLayout();
        positionBackToTopButton();
    }, 250)
);
