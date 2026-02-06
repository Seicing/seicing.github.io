(function () {

    /* ================= 配置 ================= */

    // 结构调整：使用数组更容易遍历和匹配
    const ATLAS_CONFIG_ARRAY = [
        {
            // dirMatch: 用于匹配 img.src 完整 URL 中的关键片段
            dirMatch: "https://data.seicing.com/seicingdepot/3fatcatpool/科技树/",
            jsonUrl: "https://seicing.com/js/sheet/科技树.json",
            // 假设 JSON 中有 meta.image 字段，不再需要 sheetImageName
        },
        // 可以无限扩充新的图集配置
        // {
        //     dirMatch: "https://seicing.com/res/other/icons/", 
        //     jsonUrl: "https://seicing.com/js/sheet/icons.json"
        // }
    ];

    // 缓存依然使用 Map，但 Key 存储完整的 dirMatch 字符串
    const atlasCache = new Map();

    /* ================= 工具 ================= */

    // 保持 getDir 和 getFileName 不变，它们用于从原始 src 中提取片段
    function getDir(src) {
        // 保持不变，它会返回一个包含协议、域名等的完整路径（如果 src 是完整 URL）
        return src.substring(0, src.lastIndexOf("/") + 1);
    }

    function getFileName(src) {
        return src.split("/").pop().split("?")[0];
    }

    // 新增工具：根据 img.src 查找匹配的配置
    function findAtlasConfig(src) {
        for (const config of ATLAS_CONFIG_ARRAY) {
            // 检查 img.src (完整URL) 是否包含配置中的 dirMatch 片段
            if (src.includes(config.dirMatch)) {
                return config;
            }
        }
        return null;
    }

    // loadAtlas 现在只需要配置对象
    async function loadAtlas(config) {
        // 使用 dirMatch 作为缓存的 Key
        const cacheKey = config.dirMatch;

        if (atlasCache.has(cacheKey)) {
            return atlasCache.get(cacheKey);
        }

        // ... (以下逻辑与原先类似)
        const promise = (async () => {
            try {
                // jsonUrl 已经被服务器替换为实际路径，可以直接使用
                const jsonUrl = config.jsonUrl;
                const res = await fetch(jsonUrl);
                if (!res.ok) throw 0;

                const json = await res.json();

                const sheetImageName = json.meta.image;

                // *** 关键：构造 sheetPath ***
                // 1. 获取 img.src (完整URL) 中 dirMatch 片段之前的部分 (baseURL)
                // 2. 将 sheetImageName 替换掉 dirMatch 片段中的最后一部分

                // 我们需要从 img.src 中逆推出 sheet 的目录。
                // 例如：如果 img.src 是 A/B/C/D.jpg，dirMatch 是 B/C/，我们需要找到 A/B/C/

                // 为了简单起见，我们假设 jsonUrl 所在的目录就是 sheet 应该所在的目录
                // 这需要您的服务器配置确保 sheetImageName 文件位于 jsonUrl 附近。

                // 假设：sheet 总是位于 dirMatch 对应的服务器目录中。
                // 我们可以通过 dirMatch 找到它在 img.src 中的位置
                const dirMatchIndex = config.dirMatch.lastIndexOf('/');
                // 截取 dirMatch 的目录部分（不包含最后一个 / 后面的内容，例如 https://data.seicing.com/seicingdepot/3fatcatpool/科技树/）
                const baseDirMatch = config.dirMatch.substring(0, dirMatchIndex + 1);

                // 尝试从 jsonUrl 构造 sheet 的目录路径
                // 如果 jsonUrl 是 https://seicing.com/js/sheet/科技树.json，则 sheet 的目录可能是 https://seicing.com/js/sheet/
                const sheetDir = config.jsonUrl.substring(0, config.jsonUrl.lastIndexOf('/') + 1);

                // 最简单且最符合您原始思路的路径构造：
                // sheet 路径 = sheet 所在目录 (由 dirMatch 确定) + meta.image
                // 我们需要确保 img.src 是被成功解析的，那么它的目录就是 sheet 的目录

                // 这是一个更安全的方法：使用原始 dirMatch 的目录和 meta.image 
                const sheetPath = baseDirMatch + sheetImageName;

                // 警告：这里假设 https://data.seicing.com/seicingdepot/3fatcatpool/科技树/科技树.png 已经被服务器正确替换
                // 如果服务器替换是针对单个文件的，这里可能仍需要更复杂的逻辑。
                // 最安全的方法是让 sheetPath 也使用一个相对路径，并依赖服务器的替换。

                return {
                    frames: json.frames,
                    sheet: sheetPath // https://data.seicing.com/seicingdepot/3fatcatpool/科技树/科技树.png
                };
            } catch (e) {
                console.error("加载图集失败:", config.jsonUrl, e);
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

            const src = img.src; // 浏览器解析后的完整 URL

            // 查找配置：检查 img.src 中是否包含任何 dirMatch 片段
            const config = findAtlasConfig(src);
            if (!config) continue; // 如果找不到配置，跳过

            // 使用 img.getAttribute('src') 获取原始的 https://seicing.com/res/... 路径来提取文件名
            const originalSrc = img.getAttribute('src');
            const name = getFileName(originalSrc);

            // 1. 加载对应的图集数据 
            const atlas = await loadAtlas(config);
            if (!atlas) continue;

            // 2. 检查文件是否在图集中
            const frame = atlas.frames[name];
            if (!frame) continue; // 文件不在图集中，浏览器会继续加载原始的 img.src (已发生的 404 无法阻止)

            const { x, y, w, h } = frame.frame;

            /* === sprite 化 === */

            // 3. 替换为 sheet 大图的 src
            img.dataset.originalSrc = originalSrc;
            img.src = atlas.sheet; // 替换为 https://data.seicing.com/seicingdepot/3fatcatpool/科技树/科技树.png (依赖服务器再次替换)

            // 4. 应用样式
            img.style.width = w + "px";
            img.style.height = h + "px";
            img.style.objectFit = "none";
            img.style.objectPosition = `-${x}px -${y}px`;
        }
    });

})();