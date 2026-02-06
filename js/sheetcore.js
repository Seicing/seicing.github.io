(function () {

    /* ================= 配置 ================= */

    const ATLAS_CONFIG_ARRAY = [
        {
            // 确保这个字符串是您 HTML 中 img src 路径的“目录片段”
            dirMatch: "https://data.seicing.com/seicingdepot/3fatcatpool/科技树/",
            jsonUrl: "https://seicing.com/js/sheet/科技树.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/3fatcatpool/aoe2/Architecture/AOE2/EastAsia",
            jsonUrl: "https://seicing.com/js/sheet/EastAsia.json",
        }
        // ... 其他配置
    ];

    const atlasCache = new Map();

    /* ================= 工具 ================= */

    // 我们不再需要依赖 getDir() 对完整 URL 的解析

    function getFileName(src) {
        // 从原始的 https://seicing.com/res/xxx/yyy.jpg 路径中提取文件名
        return src.split("/").pop().split("?")[0];
    }

    function findAtlasConfig(src) {
        for (const config of ATLAS_CONFIG_ARRAY) {
            // 核心匹配逻辑：检查 img.src 字符串是否包含配置的目录片段
            if (src.includes(config.dirMatch)) {
                return config;
            }
        }
        return null;
    }

    async function loadAtlas(config) {
        // 使用 dirMatch 作为缓存 Key
        const cacheKey = config.dirMatch;
        if (atlasCache.has(cacheKey)) {
            return atlasCache.get(cacheKey);
        }

        const promise = (async () => {
            try {
                // jsonUrl 应该能被服务器正确替换并加载
                const res = await fetch(config.jsonUrl);
                if (!res.ok) throw 0;

                const json = await res.json();

                const sheetImageName = json.meta.image;

                // 构造 sheetPath：配置的目录片段 + meta.image
                // 例如： https://data.seicing.com/seicingdepot/3fatcatpool/科技树/ + 科技树.png
                const sheetPath = config.dirMatch + sheetImageName;

                return {
                    frames: json.frames,
                    sheet: sheetPath
                };
            } catch (e) {
                // 如果 JSON 404，它会在这里报错
                console.error("加载图集 JSON 失败:", config.jsonUrl, e);
                return null;
            }
        })();

        atlasCache.set(cacheKey, promise);
        return promise;
    }


    /* ================= 主逻辑 ================= */

    document.addEventListener("DOMContentLoaded", async () => {

        const imgs = document.querySelectorAll("img[src]");

        for (const img of imgs) {

            // 1. 获取 HTML 中原始的 src 属性值（带 https://seicing.com/res/ 的那个）
            const originalSrc = img.getAttribute('src');
            if (!originalSrc) continue;

            // 2. 查找配置：基于原始 src 字符串进行匹配
            const config = findAtlasConfig(originalSrc);
            if (!config) continue;

            // 3. 提取文件名
            const name = getFileName(originalSrc);

            // 4. 加载对应的图集数据 
            const atlas = await loadAtlas(config);
            if (!atlas) continue; // JSON 加载失败，跳过

            // 5. 检查文件是否在图集中
            const frame = atlas.frames[name];
            if (!frame) continue; // 不在图集中，保持原样（继续 404 或加载单文件）

            const { x, y, w, h } = frame.frame;

            /* === sprite 化 === */

            img.dataset.originalSrc = originalSrc;

            // 6. **关键替换**：将 src 替换为 sheet 路径（等待服务器替换 https://seicing.com/res/）
            img.src = atlas.sheet;

            // 7. 应用样式
            img.style.width = w + "px";
            img.style.height = h + "px";
            img.style.objectFit = "none";
            img.style.objectPosition = `-${x}px -${y}px`;
        }
    });

})();