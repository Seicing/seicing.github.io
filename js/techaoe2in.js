(function () {
    let isInitialized = false;

    // 需要剔除的文件名列表（不含.html 后缀）
    const EXCLUDED_IDS = [
        '精锐战猫',
    ];

    // 检测当前页面文件名是否在剔除列表中
    function isExcludedPage() {
        try {
            const fileName = decodeURIComponent(window.location.pathname)
                .split('/')
                .pop()
                .replace(/\.html$/i, '')
                .trim();
            return EXCLUDED_IDS.includes(fileName);
        } catch (e) {
            return false;
        }
    }

    // 1. 从 #techno 内部提取所有真正点亮（不带 aoeTechIconOff）的可用文明
    function detectAvailableCivsFromTechno() {
        const availableCivs = [];
        const seenIds = new Set();

        $('#techno img').each(function () {
            const id = this.id;
            if (id && !seenIds.has(id) && !$(this).hasClass('aoeTechIconOff')) {
                seenIds.add(id);
                const title = $(this).attr('title') || id;
                const src = $(this).attr('src');
                const match = src.match(/CivIcon-[A-Za-z0-9_]+/);
                const token = match ? match[0] : ('CivIcon-' + id);

                availableCivs.push({
                    id: id,
                    name: title,
                    token: token,
                    iconSrc: src
                });
            }
        });
        return availableCivs;
    }

    // 2. 主初始化逻辑
    function safeInit() {
        if (isInitialized) return;

        // 如果在剔除名单中，直接退出，不生成选择列表
        if (isExcludedPage()) return;

        const availableCivs = detectAvailableCivsFromTechno();

        // 如果可用文明小于等于 1 个（如独有单位），保持网页原样
        if (availableCivs.length <= 1) return;

        isInitialized = true;

        const civMap = {};
        availableCivs.forEach(c => civMap[c.id] = c);

        const $spContainer = $('#sp').closest('div');
        const $hr = $spContainer.find('hr.hrsty');
        if (!$hr.length) return;

        // 预处理科技表格 #aoe4de (拆分多行科技为独立的 div)
        $('#aoe4de tr.textle').each(function () {
            const $td = $(this).find('td').eq(1);
            if (!$td.length) return;

            const lines = $td.html().split(/<br\s*\/?>/i).filter(l => l.trim() !== '');
            let newHtml = '';

            lines.forEach(line => {
                const funcMatch = line.match(/showPic2\(event\);\s*([A-Za-z0-9_]+)\(\)/);
                const funcName = funcMatch ? funcMatch[1] : '';
                newHtml += `<div class="tech-item" data-func="${funcName}" style="margin: 2px 0;">${line}</div>`;
            });

            $td.html(newHtml);
        });

        // 3. 构建排版舒展、带 6px 舒适间距的 Flex 图标栏
        let barHtml = `<div id="auto-civ-filter-bar" style="display: flex; flex-wrap: wrap; gap: 6px;margin: 3px 0 3px 0;">`;
        availableCivs.forEach(c => {
            barHtml += `
            <img class="civ-filter-icon civ-active936" 
                 width="25px" 
                 height="25px" 
                 data-civ="${c.id}" 
                 title="${c.name}" 
                 src="${c.iconSrc}" 
                 style="cursor: pointer;">
        `;
        });
        barHtml += `</div>`;

        $hr.after(barHtml);

        function getCivTokenFromElement(el) {
            const $img = $(el).find('img[src*="CivIcon-"]');
            if ($img.length > 0) {
                const match = $img.attr('src').match(/CivIcon-[A-Za-z0-9_]+/);
                return match ? match[0] : null;
            }
            return null;
        }

        // 4. 执行筛选的核心逻辑
        function executeFilter(selectedCivId) {
            const selectedCiv = civMap[selectedCivId];

            // 【关键修补】备份 #techno 中所有图标原本的 aoeTechIconOff 状态，防止被 CommonAllTech 全局点亮
            const technoStateBackup = [];
            $('#techno img').each(function () {
                technoStateBackup.push({
                    el: this,
                    isOff: $(this).hasClass('aoeTechIconOff')
                });
            });

            // A. 筛选加成 <ul> 列表
            $spContainer.find('ul li').each(function () {
                if (!selectedCivId) {
                    $(this).show();
                    return;
                }
                const token = getCivTokenFromElement(this);
                if (token) {
                    if (token === selectedCiv.token) $(this).show();
                    else $(this).hide();
                } else {
                    $(this).show();
                }
            });

            // B. 筛选科技表格 #aoe4de
            $('#aoe4de tr.textle').each(function () {
                let visibleCount = 0;
                const $items = $(this).find('.tech-item');

                $items.each(function () {
                    if (!selectedCivId) {
                        $(this).css({ 'text-decoration': '', 'color': '' }).show();
                        visibleCount++;
                        return;
                    }

                    const token = getCivTokenFromElement(this);

                    // 情况 1：带 CivIcon 图片（专属科技/特定文明加成） -> 不匹配直接隐藏
                    if (token) {
                        if (token === selectedCiv.token) {
                            $(this).css({ 'text-decoration': '', 'color': '' }).show();
                            visibleCount++;
                        } else {
                            $(this).hide();
                        }
                        return;
                    }

                    // 情况 2：通用科技（不带 CivIcon 图片） -> 不可用时红字+删除线
                    const funcName = $(this).attr('data-func');
                    let isAvailable = true;

                    if (funcName && typeof window[funcName] === 'function') {
                        if (typeof CommonAllTech === 'function') CommonAllTech();

                        window[funcName](); // 执行测试函数

                        const $civDummyNode = $('#' + selectedCivId + '2');
                        if ($civDummyNode.length && $civDummyNode.hasClass('aoeTechIconOff')) {
                            isAvailable = false;
                        }
                    }

                    if (isAvailable) {
                        $(this).css({ 'text-decoration': '', 'color': '' }).show();
                    } else {
                        $(this).css({ 'text-decoration': 'line-through', 'color': '#ff4d4d' }).show();
                    }
                    visibleCount++;
                });

                // C. 若整行没有任何科技符合条件，收起该 <tr>
                if (visibleCount === 0) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });

            // 【关键修补】还原 #techno 页面顶部的原始点亮/变灰状态
            technoStateBackup.forEach(item => {
                if (item.isOff) {
                    $(item.el).addClass('aoeTechIconOff');
                } else {
                    $(item.el).removeClass('aoeTechIconOff');
                }
            });
        }

        // 5. 点击图标切换激活/未激活样式
        $(document).on('click', '.civ-filter-icon', function () {
            const $this = $(this);
            const civId = $this.attr('data-civ');

            if ($this.hasClass('civ-active937')) {
                // 再次点击：恢复灰色未激活状态，恢复全部显示
                $this.removeClass('civ-active937').addClass('civ-active936');
                executeFilter(null);
            } else {
                // 点击灰色图标：激活该图标，其他变灰，执行筛选
                $('.civ-filter-icon').removeClass('civ-active937').addClass('civ-active936');
                $this.removeClass('civ-active936').addClass('civ-active937');
                executeFilter(civId);
            }
        });
    }

    // 6. 监听 JQuery 的 AJAX 完成事件
    $(document).ajaxComplete(function (event, xhr, settings) {
        if (settings.url && settings.url.indexOf('AOE2DIC') !== -1) {
            setTimeout(safeInit, 60);
        }
    });

    // 备用超时兜底
    setTimeout(function () {
        if (!isInitialized && $('#techno img').length > 0) {
            safeInit();
        }
    }, 600);
})();