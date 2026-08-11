(function () {
    let isInitialized = false;


    // ==============================
    // 排除不生成文明筛选按钮的单位 ID
    // ==============================
    const EXCLUDED_IDS = [
        '希腊步兵',
        '精锐希腊步兵',
        '战车',
        '精锐战车',
        '精锐步兵',
        '长生军',
        '将军',
        '三百卫士',
        '军事执政官',
        '伙伴骑兵',
        '方阵步兵',
        '桑纳哈亚',
        '帕提尤达长弓兵',
        '长柄逆刃刀战士',
        '小艇',
        '战争小艇',
        '重型小艇',
        '精锐小艇',
        '单列桨座战船',
        '桡桨船',
        '三列桨座战船',
        '投石船',
        '中型投石船',
        '利维坦'
    ];


    // 1. 从 #techno 内部提取所有真正点亮（不带 aoeTechIconOff）的可用文明
    function detectAvailableCivsFromTechno() {

        const availableCivs = [];
        const seenIds = new Set();


        $('#techno img').each(function () {

            const id = this.id;


            // 排除指定单位
            if (EXCLUDED_IDS.includes(id)) {
                return;
            }


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


        // 如果可用文明小于等于 1 个，保持网页原样
        if (availableCivs.length <= 1) return;


        isInitialized = true;


        const civMap = {};

        availableCivs.forEach(c => {
            civMap[c.id] = c;
        });



        const $spContainer = $('#sp').closest('div');

        const $hr = $spContainer.find('hr.hrsty');

        if (!$hr.length) return;



        // 预处理科技表格
        $('#aoe4de tr.textle').each(function () {

            const $td = $(this).find('td').eq(1);

            if (!$td.length) return;


            const lines = $td.html()
                .split(/<br\s*\/?>/i)
                .filter(l => l.trim() !== '');


            let newHtml = '';


            lines.forEach(line => {

                const funcMatch =
                    line.match(/showPic2\(event\);\s*([A-Za-z0-9_]+)\(\)/);


                const funcName = funcMatch ? funcMatch[1] : '';


                newHtml +=
                    `<div class="tech-item" data-func="${funcName}" style="margin:2px 0;">${line}</div>`;

            });


            $td.html(newHtml);

        });




        // 3. 创建文明过滤栏

        let barHtml =
            `<div id="auto-civ-filter-bar" style="display:flex;flex-wrap:wrap;gap:6px;margin:3px 0;">`;


        availableCivs.forEach(c => {

            barHtml += `
            <img class="civ-filter-icon civ-active936"
                 width="25px"
                 height="25px"
                 data-civ="${c.id}"
                 title="${c.name}"
                 src="${c.iconSrc}"
                 style="cursor:pointer;">
            `;

        });


        barHtml += `</div>`;


        $hr.after(barHtml);




        function getCivTokenFromElement(el) {

            const $img = $(el).find('img[src*="CivIcon-"]');


            if ($img.length > 0) {

                const match =
                    $img.attr('src').match(/CivIcon-[A-Za-z0-9_]+/);


                return match ? match[0] : null;

            }


            return null;
        }





        // 4. 执行筛选

        function executeFilter(selectedCivId) {


            const selectedCiv = civMap[selectedCivId];



            // A. 筛选加成列表

            $spContainer.find('ul li').each(function () {


                if (!selectedCivId) {

                    $(this).show();

                    return;

                }


                const token = getCivTokenFromElement(this);


                if (token) {

                    if (token === selectedCiv.token)

                        $(this).show();

                    else

                        $(this).hide();


                } else {

                    $(this).show();

                }


            });





            // B. 筛选科技

            $('#aoe4de tr.textle').each(function () {


                let visibleCount = 0;


                const $items = $(this).find('.tech-item');



                $items.each(function () {


                    if (!selectedCivId) {

                        $(this)
                            .css({ 'text-decoration': '', 'color': '' })
                            .show();

                        visibleCount++;

                        return;

                    }



                    const token = getCivTokenFromElement(this);



                    if (token) {


                        if (token === selectedCiv.token) {

                            $(this)
                                .css({ 'text-decoration': '', 'color': '' })
                                .show();

                            visibleCount++;

                        } else {

                            $(this).hide();

                        }


                        return;

                    }





                    const funcName = $(this).attr('data-func');


                    let isAvailable = true;



                    if (funcName && typeof window[funcName] === 'function') {


                        if (typeof CommonAllTech === 'function')
                            CommonAllTech();



                        window[funcName]();



                        const $civDummyNode =
                            $('#' + selectedCivId + '2');



                        if ($civDummyNode.length &&
                            $civDummyNode.hasClass('aoeTechIconOff')) {

                            isAvailable = false;

                        }



                        if (typeof CommonAllTech === 'function')
                            CommonAllTech();

                    }





                    if (isAvailable) {

                        $(this)
                            .css({ 'text-decoration': '', 'color': '' })
                            .show();

                    } else {

                        $(this)
                            .css({
                                'text-decoration': 'line-through',
                                'color': '#ff4d4d'
                            })
                            .show();

                    }


                    visibleCount++;


                });




                if (visibleCount === 0)

                    $(this).hide();

                else

                    $(this).show();


            });

        }





        // 5. 点击文明图标

        $(document).on('click', '.civ-filter-icon', function () {


            const $this = $(this);

            const civId = $this.attr('data-civ');



            if ($this.hasClass('civ-active937')) {


                $this
                    .removeClass('civ-active937')
                    .addClass('civ-active936');


                executeFilter(null);


            } else {


                $('.civ-filter-icon')
                    .removeClass('civ-active937')
                    .addClass('civ-active936');



                $this
                    .removeClass('civ-active936')
                    .addClass('civ-active937');



                executeFilter(civId);

            }


        });


    }





    // 6. AJAX监听

    $(document).ajaxComplete(function (event, xhr, settings) {

        if (settings.url &&
            settings.url.indexOf('AOE2DIC') !== -1) {

            setTimeout(safeInit, 60);

        }

    });



    // 备用

    setTimeout(function () {

        if (!isInitialized &&
            $('#techno img').length > 0) {

            safeInit();

        }

    }, 600);



})();