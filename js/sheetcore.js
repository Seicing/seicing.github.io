(function () {

    /* ================= 配置 ================= */

    const ATLAS_CONFIG_ARRAY = [
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment2/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment2.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment3/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment3.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment4/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment4.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment5/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment5.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment6/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment6.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment7/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment7.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment8/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment8.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmenta/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmenta.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmentb/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmentb.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmentc/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmentc.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmentd/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmentd.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmente/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmente.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmentf/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmentf.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmentg/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmentg.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmentx/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmentx.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmenty/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmenty.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/奥兹玛/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_奥兹玛.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/希洛克/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_希洛克.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/100/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_100.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/3fatcatpool/科技树/",
            jsonUrl: "https://seicing.com/js/sheet/科技树.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/3fatcatpool/aoe2/Architecture/AOE2/EastAsia/",
            jsonUrl: "https://seicing.com/js/sheet/aoe2_Architecture_EastAsia.json",
        },
    ];

    const atlasCache = new Map();
    const sheetImageCache = new Map();

    /* ================= 工具函数 ================= */

    function getFileName(src) {
        return src.split("/").pop().split("?")[0].split("#")[0];
    }

    function findAtlasConfig(src) {
        return ATLAS_CONFIG_ARRAY.find(cfg => src.includes(cfg.dirMatch)) || null;
    }

    async function loadAtlas(config) {

        if (atlasCache.has(config.dirMatch)) {
            return atlasCache.get(config.dirMatch);
        }

        const promise = (async () => {
            try {
                const res = await fetch(config.jsonUrl);
                if (!res.ok) throw 0;

                const json = await res.json();

                return {
                    frames: json.frames,
                    sheet: config.dirMatch + json.meta.image
                };
            } catch (e) {
                console.error("Atlas 加载失败:", config.jsonUrl, e);
                return null;
            }
        })();

        atlasCache.set(config.dirMatch, promise);
        return promise;
    }

    function loadSheetImage(src) {
        if (sheetImageCache.has(src)) {
            return sheetImageCache.get(src);
        }

        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous"; // ★ 新增
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });

        sheetImageCache.set(src, promise);
        return promise;
    }

    /* ================= 保存 sprite 子图 ================= */

    async function saveSpriteImage(img) {

        const sheetUrl = img.dataset.spriteSheet;
        if (!sheetUrl) return;

        const x = +img.dataset.spriteX;
        const y = +img.dataset.spriteY;
        const w = +img.dataset.spriteW;
        const h = +img.dataset.spriteH;

        const image = await loadSheetImage(sheetUrl);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, x, y, w, h, 0, 0, w, h);

        canvas.toBlob(blob => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = img.dataset.spriteName || "sprite.png";
            a.click();
            URL.revokeObjectURL(a.href);
        });
    }

    /* ================= 交互：显示保存按钮 ================= */

    function showSaveButton(img, e) {

        // 阻止默认行为（如<a>标签的跳转），即使被<a>包裹也能阻止
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const container = img.parentElement;

        // 检查是否已经存在保存按钮，如果存在则移除（实现点击切换效果）
        const existingButton = container.querySelector(".sprite-save-button");
        if (existingButton) {
            existingButton.remove();
            // 移除全局监听器，防止内存泄漏，虽然下面还会加
            document.removeEventListener('click', hideButtonLogic);
            return;
        }

        const button = document.createElement("button");
        button.className = "sprite-save-button";
        button.textContent = "保存";

        // 样式：内联样式，避免修改外部 CSS 文件
        button.style.cssText = `
            position: absolute;
            top: 2px;
            right: 2px;
            z-index: 1000; 
            padding: 2px 4px;
            font-size: 12px;
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            border-radius: 2px;
            opacity: 0.9;
            line-height: 1; /* 确保小尺寸文字居中 */
        `;

        // 确保父元素是 position: relative，以便按钮能正确定位
        if (window.getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }

        button.onclick = (btnE) => {
            btnE.stopPropagation(); // 阻止点击按钮触发父级事件
            saveSpriteImage(img);
            button.remove(); // 保存后移除按钮
            document.removeEventListener('click', hideButtonLogic); // 移除监听器
        };

        container.appendChild(button);

        // 自动隐藏逻辑：点击页面其他地方时隐藏按钮
        function hideButtonLogic(docE) {
            // 如果点击的不是按钮，也不是原始图片，则隐藏
            if (docE.target !== button && docE.target !== img) {
                // 确保按钮确实存在再移除，避免报错
                if (button.parentNode) {
                    button.remove();
                }
                document.removeEventListener('click', hideButtonLogic);
            }
        }

        // 延迟添加监听器，防止当前点击事件立即触发隐藏
        setTimeout(() => {
            document.addEventListener('click', hideButtonLogic);
        }, 0);
    }


    /* ================= 主流程 ================= */

    document.addEventListener("DOMContentLoaded", async () => {

        /* 1️⃣ 预加载所有 atlas */
        await Promise.all(
            ATLAS_CONFIG_ARRAY.map(cfg => loadAtlas(cfg))
        );

        /* 2️⃣ sprite 化所有 data-src img */
        const imgs = document.querySelectorAll("img[data-src]");

        for (const img of imgs) {

            const originalSrc = img.dataset.src;
            if (!originalSrc) continue;

            const config = findAtlasConfig(originalSrc);
            if (!config) {
                img.src = originalSrc;
                continue;
            }

            const atlas = await loadAtlas(config);
            if (!atlas) {
                img.src = originalSrc;
                continue;
            }

            const name = getFileName(originalSrc);
            const frame = atlas.frames[name];
            if (!frame) {
                img.src = originalSrc;
                continue;
            }

            const { x, y, w, h } = frame.frame;

            /* === sprite 化 === */

            img.dataset.originalSrc = originalSrc;
            img.dataset.spriteSheet = atlas.sheet;
            img.dataset.spriteX = x;
            img.dataset.spriteY = y;
            img.dataset.spriteW = w;
            img.dataset.spriteH = h;
            img.dataset.spriteName = name;

            img.src = atlas.sheet;

            // 裁剪基准
            img.style.objectFit = "none";
            img.style.objectPosition = `-${x}px -${y}px`;

            // HTML width / height 覆盖显示尺寸 **修正点 1**
            const htmlW = img.getAttribute("width");
            const htmlH = img.getAttribute("height");

            // **新的尺寸逻辑**：只有在 HTML 属性中明确设置了 width/height 时，才设置内联 style。
            // 否则，让外部 CSS（如 max-width: 100px）来控制尺寸。
            if (htmlW) {
                img.style.width = htmlW + "px";
            }
            if (htmlH) {
                img.style.height = htmlH + "px";
            }
        }
    });

    /* ================= 交互：左键点击显示保存按钮 **修正点 2** ================= */

    // 移除右键保存单独子图的逻辑
    // document.addEventListener("contextmenu", ...); 

    // 移除拖拽保存单独子图的逻辑
    // document.addEventListener("dragstart", ...); 

    // 新增左键点击显示保存按钮的逻辑
    document.addEventListener("click", e => {
        const img = e.target.closest("img");
        // 仅处理带有 sprite 数据的 img，且确保是左键点击 (button === 0)
        if (!img || !img.dataset.spriteSheet || e.button !== 0) return;

        showSaveButton(img, e);
    });

})();