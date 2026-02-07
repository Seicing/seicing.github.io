(function () {

    /* ================= 配置 ================= */

    const ATLAS_CONFIG_ARRAY = [
        {
            dirMatch: "https://data.seicing.com/seicingdepot/dfclass/equipment/",
            jsonUrl: "https://seicing.com/js/sheet/dfclass_equipment.json",
        },
        // 可继续追加
    ];

    const atlasCache = new Map();

    /* ================= 工具 ================= */

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

    /* ================= 主流程 ================= */

    document.addEventListener("DOMContentLoaded", async () => {

        // 1️⃣ 预加载所有 atlas（一次）
        await Promise.all(
            ATLAS_CONFIG_ARRAY.map(cfg => loadAtlas(cfg))
        );

        // 2️⃣ 处理 data-src 图片
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

            /* ===== sprite 化 ===== */

            img.dataset.originalSrc = originalSrc;
            img.src = atlas.sheet;

            // 裁剪基准（JSON 尺寸）
            img.style.width = w + "px";
            img.style.height = h + "px";

            img.style.objectFit = "none";
            img.style.objectPosition = `-${x}px -${y}px`;

            // HTML width / height 作为最终显示尺寸
            const htmlW = img.getAttribute("width");
            const htmlH = img.getAttribute("height");

            if (htmlW) img.style.width = htmlW + "px";
            if (htmlH) img.style.height = htmlH + "px";
        }
    });

})();
