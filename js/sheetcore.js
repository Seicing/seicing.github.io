(function () {

    /* ================= 配置 ================= */

    // 使用一个对象来配置多个图集路径及其对应的JSON和Sheet图片
    const ATLAS_CONFIG = {
        // Key: 图片所在的目录路径，必须以 '/' 结尾
        "https://data.seicing.com/seicingdepot/3fatcatpool/科技树/": {
            jsonUrl: "https://seicing.com/js/sheet/科技树.json",
            sheetImageName: "科技树.png"
        },
        // 可以无限扩充新的图集配置，例如：
        // "https://seicing.com/res/other/icons/": {
        //     jsonUrl: "https://seicing.com/js/sheet/icons.json",
        //     sheetImageName: "icons.png"
        // }
    };

    /* ================= 缓存 ================= */

    const atlasCache = new Map();

    /* ================= 工具 ================= */

    function getDir(src) {
        // 确保获取到的目录路径以 / 结尾，以便在 ATLAS_CONFIG 中查找
        return src.substring(0, src.lastIndexOf("/") + 1);
    }

    function getFileName(src) {
        return src.split("/").pop().split("?")[0];
    }

    // loadAtlas 接受目录路径，从 ATLAS_CONFIG 中查找并加载图集
    async function loadAtlas(dir) {
        if (atlasCache.has(dir)) {
            return atlasCache.get(dir);
        }

        // 1. 根据目录查找配置
        const config = ATLAS_CONFIG[dir];
        if (!config) {
            // 如果没有找到对应的图集配置，则返回 null
            return Promise.resolve(null);
        }

        const promise = (async () => {
            try {
                // 2. 使用配置中的 jsonUrl
                const jsonUrl = config.jsonUrl;
                const res = await fetch(jsonUrl);
                if (!res.ok) throw 0;

                const json = await res.json();

                // 3. 构造 sheet 大图的完整路径：目录 + sheetImageName
                const sheetPath = dir + config.sheetImageName;

                return {
                    frames: json.frames,
                    sheet: sheetPath // 使用构造好的 sheet 路径
                };
            } catch {
                // JSON 加载失败
                return null;
            }
        })();

        atlasCache.set(dir, promise);
        return promise;
    }

    /* ================= 主逻辑 ================= */

    document.addEventListener("DOMContentLoaded", async () => {

        const imgs = document.querySelectorAll("img[src]");

        // 获取所有已配置的图集目录列表
        const configuredDirs = Object.keys(ATLAS_CONFIG);

        for (const img of imgs) {

            const src = img.src;
            const dir = getDir(src);
            const name = getFileName(src);

            // 1. 检查当前图片路径的目录是否在配置列表中
            if (!configuredDirs.includes(dir)) {
                // 如果目录未配置，跳过，浏览器会加载原始 src
                continue;
            }

            // 2. 加载对应的图集数据 (会从缓存或网络加载)
            const atlas = await loadAtlas(dir);
            if (!atlas) {
                // 图集加载失败（例如JSON 404），跳过
                continue;
            }

            // 3. 检查文件是否在图集中
            const frame = atlas.frames[name];
            if (!frame) {
                // *核心逻辑:* 文件不在图集中，跳过。
                // 此时 img.src 仍是原始路径（例如 https://data.seicing.com/seicingdepot/3fatcatpool/科技树/农田.jpg），
                // 浏览器会正常加载这个单独的图片文件。
                continue;
            }

            const { x, y, w, h } = frame.frame;

            /* === sprite 化 === */

            // 4. 如果找到frame，执行 sprite 化替换
            img.dataset.originalSrc = img.src; // 存储原始 src
            img.src = atlas.sheet; // 替换为 sheet 大图的 src

            img.style.width = w + "px";
            img.style.height = h + "px";
            img.style.objectFit = "none";
            img.style.objectPosition = `-${x}px -${y}px`;
        }
    });

})();