(function () {
    // 1. 直接从 #techno 内的 <img> 节点提取可用文明信息
    function detectAvailableCivsFromTechno() {
        const availableCivs = [];

        $('#techno img').each(function () {
            const id = this.id;
            // 没有 aoeTechIconOff 类名的，即为当前页面点亮/可用的文明
            if (id && !$(this).hasClass('aoeTechIconOff')) {
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
    function initCivFilterExtension() {
        const availableCivs = detectAvailableCivsFromTechno();

        // 核心改进：如果可用文明小于等于 1 个（如文明独有单位），不生成筛选列表，维持网页原样！
        if (availableCivs.length <= 1) return;

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

        // 3. 构建与 #techno 完全一致的原生 25px 纯图标栏
        let barHtml = `<div id="auto-civ-filter-bar" style="text-align: left; margin: 0 0 0 0;">`;
        availableCivs.forEach(c => {
            barHtml += `
                <img class="civ-filter-icon civ-active936" 
                     data-civ="${c.id}" 
                     title="${c.name}" 
                     src="${c.iconSrc}" 
                     width="25px" 
                     style="cursor: pointer; margin-right: 3px; margin-bottom: 3px;">
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
                        $(this).show();
                        visibleCount++;
                        return;
                    }

                    const token = getCivTokenFromElement(this);

                    // 情况1：带 CivIcon 图片（专属科技/特定文明加成）
                    if (token) {
                        if (token === selectedCiv.token) {
                            $(this).show();
                            visibleCount++;
                        } else {
                            $(this).hide();
                        }
                        return;
                    }

                    // 情况2：通用科技（调用 techaoe2.js 函数测试选中文明是否被禁用）
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
                        $(this).show();
                        visibleCount++;
                    } else {
                        $(this).hide();
                    }
                });

                // C. 若整行没有任何科技符合条件，收起该 <tr>
                if (visibleCount === 0) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        }

        // 5. 点击图标切换激活/未激活样式
        $(document).on('click', '.civ-filter-icon', function () {
            const $this = $(this);
            const civId = $this.attr('data-civ');

            if ($this.hasClass('civ-active937')) {
                // 再次点击已激活图标：恢复灰色未激活状态，恢复全部显示
                $this.removeClass('civ-active937').addClass('civ-active936');
                executeFilter(null);
            } else {
                // 点击灰色图标：激活该图标，其他图标变灰，并筛选
                $('.civ-filter-icon').removeClass('civ-active937').addClass('civ-active936');
                $this.removeClass('civ-active936').addClass('civ-active937');
                executeFilter(civId);
            }
        });
    }

    // 6. 轮询侦听：等待原页面的 #techno 回调彻底执行完毕后启动
    let lastDisabledCount = -1;
    let stableTicks = 0;

    const waitForTechnoReady = setInterval(function () {
        const $technoList = $('#techno').find('img');
        if ($technoList.length > 0) {
            const currentDisabledCount = $('#techno .aoeTechIconOff').length;
            if (currentDisabledCount === lastDisabledCount) {
                stableTicks++;
            } else {
                lastDisabledCount = currentDisabledCount;
                stableTicks = 0;
            }

            // 状态稳定 200ms 后自动抓取并构建面板
            if (stableTicks >= 2) {
                clearInterval(waitForTechnoReady);
                initCivFilterExtension();
            }
        }
    }, 100);
})(); 