(function () {

    /* ================= 配置 ================= */

    // 使用数组配置多个图集路径及其对应的 JSON 路径
    const ATLAS_CONFIG_ARRAY = [
        {
            dirMatch: "https://data.seicing.com/seicingdepot/3fatcatpool/科技树/",
            jsonUrl: "https://seicing.com/js/sheet/科技树.json",
        },
        {
            dirMatch: "https://data.seicing.com/seicingdepot/3fatcatpool/aoe2/Architecture/AOE2/EastAsia/",
            jsonUrl: "https://seicing.com/js/sheet/EastAsia.json",
        }
    ];

    // 缓存依然使用 Map，Key 使用 dirMatch 字符串
    const atlasCache = new Map();

    /* ================= 工具 ================= */

    /**
     * 从原始 src 路径中提取文件名 (例如：从 "https://seicing.com/res/path/file.jpg" 提取 "file.jpg")
     */
    function getFileName(src) {
        // 移除路径、问号和哈希
        return src.split("/").pop().split("?")[0].split("#")[0];
    }

    /**
     * 根据 img.src 字符串查找匹配的图集配置
     */
    function findAtlasConfig(src) {
        for (const config of ATLAS_CONFIG_ARRAY) {
            // 检查 src (HTML中原始的 https://seicing.com/res/... 路径) 是否包含配置中的 dirMatch 片段
            if (src.includes(config.dirMatch)) {
                return config;
            }
        }
        return null;
    }

    /**
     * 加载并缓存图集数据
     */
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

                // 从 JSON 的 meta 中获取 sheet 大图文件名
                const sheetImageName = json.meta.image;

                // 构造 sheetPath：配置的目录片段 + meta.image (依赖服务器再次替换 https://seicing.com/res/ 才能访问)
                const sheetPath = config.dirMatch + sheetImageName;

                return {
                    frames: json.frames,
                    sheet: sheetPath
                };
            } catch (e) {
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

            // 2. 查找配置并提取文件名
            const config = findAtlasConfig(originalSrc);
            if (!config) continue;

            const name = getFileName(originalSrc);

            // 3. 加载图集
            const atlas = await loadAtlas(config);
            if (!atlas) continue;

            // 4. 检查文件是否在图集中 (Fallback 逻辑)
            const frame = atlas.frames[name];
            if (!frame) continue; // 不在图集中，保持原样

            const { x, y, w, h } = frame.frame;

            /* === 尺寸判断与继承 === */

            // 尝试获取用户在 img 标签上定义的尺寸 (优先级：内联 style > HTML 属性)
            const htmlWidth = img.getAttribute('width');
            const htmlHeight = img.getAttribute('height');
            const cssWidth = img.style.width;
            const cssHeight = img.style.height;

            // 确定最终的显示尺寸，否则使用 JSON 中的原生尺寸 (w, h)
            const finalWidth = cssWidth || (htmlWidth ? htmlWidth + 'px' : w + 'px');
            const finalHeight = cssHeight || (htmlHeight ? htmlHeight + 'px' : h + 'px');

            // 检查是否有尺寸被定义，如果没有，则 finalWidth/Height 已经是原生尺寸 w/h
            const isDefaultSize = (finalWidth === w + 'px' && finalHeight === h + 'px');


            /* === sprite 化 === */

            img.dataset.originalSrc = originalSrc;
            img.src = atlas.sheet; // 替换为 sheet 大图的 src

            // 1. 设置对象定位的**基准尺寸** (JSON 的 w/h)
            // 这一步是为了让 object-position 的剪裁准确
            img.style.width = w + "px";
            img.style.height = h + "px";

            // 2. 应用裁剪定位
            img.style.objectFit = "none";
            img.style.objectPosition = `-${x}px -${y}px`;

            // 3. **应用最终显示尺寸** (如果不是原生尺寸，就覆盖基准尺寸)
            if (!isDefaultSize) {
                img.style.width = finalWidth;
                img.style.height = finalHeight;
            }
        }
    });

})();