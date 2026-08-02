(function () {
    let isInitialized = false;

    // 1. 从 #techno 提取所有可用文明
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

        const availableCivs = detectAvailableCivsFromTechno();

        // 可用文明小于等于 1 个（如独有单位），保持网页原样
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

        // 3. 构建纯图标筛选栏
        let barHtml = `<div id="auto-civ-filter-bar">`;
        availableCivs.forEach(c => {
            barHtml += `
                <img class="civ-filter-icon civ-active936" 
                     data-civ="${c.id}" 
                     title="${c.name}" 
                     src="${c.iconSrc}">
            `;
        });
        barHtml += `</div>`;

        $hr.after(barHtml);

        // 4. 【精准同步】将筛选栏的宽度、间距、换行规则与顶部 #techno 完全同步
        const $techno = $('#techno');
        const $bar = $('#auto-civ-filter-bar');
        const $firstTechnoImg = $techno.find('img').first();

        if ($techno.length && $bar.length) {
            $bar.css({
                'width': $techno.css('width') || '100%',
                'max-width': $techno.css('max-width') || 'none',
                'padding': $techno.css('padding') || '0',
                'margin': '10px 0 15px 0',
                'text-align': $techno.css('text-align') || 'left',
                'box-sizing': 'border-box'
            });

            if ($firstTechnoImg.length) {
                const imgWidth = $firstTechnoImg.attr('width') ? ($firstTechnoImg.attr('width') + 'px') : '25px';

                $('.civ-filter-icon').css({
                    'width': imgWidth,
                    'height': 'auto',
                    'margin': $firstTechnoImg.css('margin') || '0',
                    'padding': $firstTechnoImg.css('padding') || '0',
                    'vertical-align': $firstTechnoImg.css('vertical-align') || 'baseline'
                });
            }
        }

        function getCivTokenFromElement(el) {
            const $img = $(el).find('img[src*="CivIcon-"]');
            if ($img.length > 0) {
                const match = $img.attr('src').match(/CivIcon-[A-Za-z0-9_]+/);
                return match ? match[0] : null;
            }
            return null;
        }

        // 5. 执行筛选的核心逻辑
        function executeFilter(selectedCivId) {
            const selectedCiv = civMap[selectedCivId];

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
                    // 未选中文明时（恢复全部）：清除删除线和红字，正常显示
                    if (!selectedCivId) {
                        $(this).css({ 'text-decoration': '', 'color': '' }).show();
                        visibleCount++;
                        return;
                    }

                    const token = getCivTokenFromElement(this);

                    // 情况 1：带 CivIcon 图片（专属科技 / 仅某文明） -> 不匹配直接隐藏
                    if (token) {
                        if (token === selectedCiv.token) {
                            $(this).css({ 'text-decoration': '', 'color': '' }).show();
                            visibleCount++;
                        } else {
                            $(this).hide();
                        }
                        return;
                    }

                    // 情况 2：通用科技（不带 CivIcon 图片） -> 不可用时不隐藏，而是红字+删除线
                    const funcName = $(this).attr('data-func');
                    let isAvailable = true;

                    if (funcName && typeof window[funcName] === 'function') {
                        if (typeof CommonAllTech === 'function') CommonAllTech();

                        window[funcName](); // 执行测试函数

                        const $civDummyNode = $('#' + selectedCivId + '2');
                        if ($civDummyNode.length && $civDummyNode.hasClass('aoeTechIconOff')) {
                            isAvailable = false;
                        }

                        if (typeof CommonAllTech === 'function') CommonAllTech();
                    }

                    if (isAvailable) {
                        // 科技可用：正常显示，清除禁用样式
                        $(this).css({ 'text-decoration': '', 'color': '' }).show();
                    } else {
                        // 科技不可用：加上红字 + 删除线
                        $(this).css({ 'text-decoration': 'line-through', 'color': '#ff4d4d' }).show();
                    }
                    visibleCount++; // 保留在视图中，计入可见数
                });

                // 若整行没有任何科技（例如全是不匹配的专属科技被隐藏了），收起该 <tr>
                if (visibleCount === 0) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        }

        // 6. 点击图标切换激活/未激活样式
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

    // 7. 监听 JQuery 的 AJAX 完成事件
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