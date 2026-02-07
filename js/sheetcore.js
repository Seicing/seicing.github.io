(function () {

    /* ================= 配置 ================= */

    const ATLAS_CONFIG_ARRAY = [
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment2/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment2.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment3/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment3.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment4/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment4.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment5/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment5.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment6/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment6.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment7/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment7.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment8/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment8.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmenta/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmenta.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmentb/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmentb.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmentc/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmentc.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmentd/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmentd.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmente/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmente.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmentf/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmentf.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmentg/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmentg.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmentx/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmentx.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipmenty/", jsonUrl: "https://seicing.com/js/sheet/dfclass_equipmenty.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/奥兹玛/", jsonUrl: "https://seicing.com/js/sheet/dfclass_奥兹玛.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/希洛克/", jsonUrl: "https://seicing.com/js/sheet/dfclass_希洛克.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/dfclass/100/", jsonUrl: "https://seicing.com/js/sheet/dfclass_100.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/3fatcatpool/科技树/", jsonUrl: "https://seicing.com/js/sheet/科技树.json" },
        { dirMatch: "https://data.seicing.com/seicingdepot/3fatcatpool/aoe2/Architecture/AOE2/EastAsia/", jsonUrl: "https://seicing.com/js/sheet/aoe2_Architecture_EastAsia.json" }
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
        if (atlasCache.has(config.dirMatch)) return atlasCache.get(config.dirMatch);
        const promise = (async () => {
            try {
                const res = await fetch(config.jsonUrl);
                if (!res.ok) throw 0;
                const json = await res.json();
                return { frames: json.frames, sheet: config.dirMatch + json.meta.image };
            } catch (e) {
                console.error("Atlas 加载失败:", config.jsonUrl, e);
                return null;
            }
        })();
        atlasCache.set(config.dirMatch, promise);
        return promise;
    }

    function loadSheetImage(src) {
        if (sheetImageCache.has(src)) return sheetImageCache.get(src);
        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
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

    /* ================= 主流程 ================= */

    document.addEventListener("DOMContentLoaded", async () => {

        // 预加载所有 atlas
        await Promise.all(ATLAS_CONFIG_ARRAY.map(cfg => loadAtlas(cfg)));

        // sprite 化所有 data-src img
        const imgs = document.querySelectorAll("img[data-src]");
        for (const img of imgs) {
            const originalSrc = img.dataset.src;
            if (!originalSrc) continue;

            const config = findAtlasConfig(originalSrc);
            if (!config) { img.src = originalSrc; continue; }

            const atlas = await loadAtlas(config);
            if (!atlas) { img.src = originalSrc; continue; }

            const name = getFileName(originalSrc);
            const frame = atlas.frames[name];
            if (!frame) { img.src = originalSrc; continue; }

            const { x, y, w, h } = frame.frame;

            img.dataset.originalSrc = originalSrc;
            img.dataset.spriteSheet = atlas.sheet;
            img.dataset.spriteX = x;
            img.dataset.spriteY = y;
            img.dataset.spriteW = w;
            img.dataset.spriteH = h;
            img.dataset.spriteName = name;

            img.src = atlas.sheet;
            img.style.objectFit = "none";
            img.style.objectPosition = `-${x}px -${y}px`;

            // 尺寸处理
            const htmlW = img.getAttribute("width");
            const htmlH = img.getAttribute("height");
            if (htmlW) img.style.width = htmlW + "px";
            if (htmlH) img.style.height = htmlH + "px";

            // 自动根据父容器缩放（没有 HTML 宽高）
            if (!htmlW && !htmlH) {
                const parentWidth = img.parentElement.clientWidth || w;
                const parentHeight = img.parentElement.clientHeight || h;
                const ratio = w / h;
                let finalWidth = w;
                let finalHeight = h;

                if (w > parentWidth) { finalWidth = parentWidth; finalHeight = finalWidth / ratio; }
                if (finalHeight > parentHeight) { finalHeight = parentHeight; finalWidth = finalHeight * ratio; }

                img.style.width = finalWidth + "px";
                img.style.height = finalHeight + "px";
            }

            img.classList.add("sprite-inited");
        }
    });

    /* ================= 交互：单击显示保存按钮 ================= */

    (function () {
        let saveButton = null;
        let currentImg = null;

        function createSaveButton() {
            if (saveButton) return;
            saveButton = document.createElement('button');
            saveButton.textContent = "保存图片";
            Object.assign(saveButton.style, {
                position: 'fixed', right: '20px', bottom: '20px',
                zIndex: 9999, padding: '8px 12px',
                background: '#007bff', color: '#fff',
                border: 'none', borderRadius: '4px',
                cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                fontSize: '14px', display: 'none'
            });
            document.body.appendChild(saveButton);

            saveButton.addEventListener('click', async () => {
                if (currentImg) await saveSpriteImage(currentImg);
                hideSaveButton();
            });
        }

        function showSaveButton(img) {
            createSaveButton();
            currentImg = img;
            saveButton.style.display = 'block';
        }

        function hideSaveButton() {
            if (saveButton) saveButton.style.display = 'none';
            currentImg = null;
        }

        document.addEventListener("click", e => {
            const img = e.target.closest("img.sprite-inited");
            if (!img || img.closest("a")) { hideSaveButton(); return; }
            e.stopPropagation();
            showSaveButton(img);
        });

        document.addEventListener("click", () => { hideSaveButton(); });

    })();

})();
