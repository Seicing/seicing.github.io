(function () {

    const SPRITE_GROUPS = [
        {
            jsonUrl: "https://seicing.com/js/sheet/dnficon.json",
            root: "https://data.seicing.com/seicingdepot/dfclass/",
            folders: [
                "equipment", "equipment2", "equipment3", "equipment4",
                "equipment5", "equipment6", "equipment7", "equipment8",
                "equipmenta", "equipmentb", "equipmentc", "equipmentd",
                "equipmente", "equipmentf", "equipmentg", "equipmentx",
                "equipmenty", "奥兹玛", "希洛克", "100",
            ]
        },

        {
            jsonUrl: "https://seicing.com/js/sheet/测试用.json",
            root: "https://data.seicing.com/seicingdepot/dfclass/",
            folders: [
                "测试用",
            ]
        },
    ];

    /**
     * 独立的单项配置
     * 如果有的图集结构很简单，不想写在上面组里，也可以直接写在这里
     */
    const STANDALONE_CONFIGS = [
        {
            dirMatch: "https://data.seicing.com/seicingdepot/3fatcatpool/测试用2/",
            jsonUrl: "https://seicing.com/js/sheet/测试用2.json",
        }
    ];

    /* ================= 2. 自动生成配置数组 ================= */

    // 将 SPRITE_GROUPS 展平为最终的配置格式
    const GENERATED_CONFIGS = SPRITE_GROUPS.flatMap(group => {
        return group.folders.map(folder => ({
            dirMatch: group.root + folder + "/", // 拼接: https://data.seicing.com/seicingdepot/dfclass/ + skillicon + /
            jsonUrl: group.jsonUrl
        }));
    });

    // 合并所有配置
    const ATLAS_CONFIG_ARRAY = [
        ...GENERATED_CONFIGS,
        ...STANDALONE_CONFIGS
    ];

    /* ================= 3. 缓存与辅助函数 ================= */

    const atlasCache = new Map();
    const sheetImageCache = new Map();

    function getFileName(path) {
        return path.split("/").pop().split("?")[0].split("#")[0];
    }

    // 提取 Key：去除 https://seicing.com/res/ 前缀
    function getSpriteKey(src) {
        const cleanSrc = src.split("?")[0].split("#")[0];
        if (cleanSrc.indexOf("https://seicing.com/res/") === 0) {
            return cleanSrc.substring(5);
        }
        return cleanSrc;
    }

    function findAtlasConfig(src) {
        return ATLAS_CONFIG_ARRAY.find(cfg => src.includes(cfg.dirMatch)) || null;
    }

    /* ================= 4. 资源加载逻辑 ================= */

    async function loadAtlas(config) {
        if (atlasCache.has(config.dirMatch)) return atlasCache.get(config.dirMatch);

        const promise = (async () => {
            try {
                const res = await fetch(config.jsonUrl);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();

                // 拼接大图路径 (config.dirMatch 是包含文件夹的，这里需要注意)
                // ★ 注意：这里有一个潜在的路径拼接问题需要修正
                // 通常 JSON 里的 meta.image 是文件名 (例如 "sheet.png")
                // 但 config.dirMatch 是 "https://data.seicing.com/seicingdepot/dfclass/skillicon/"
                // 如果图集大图实际上放在 "https://data.seicing.com/seicingdepot/dfclass/skillicon/sheet.png" 那是对的。
                // 但如果大图是跟 JSON 在一起的？或者有固定的路径？

                // ★ 修正逻辑：
                // 1. 如果 JSON 和大图在一起，我们应该用 jsonUrl 的目录。
                // 2. 但你的原代码逻辑是用 config.dirMatch + json.meta.image。
                //    这意味着大图必须存在于 data-src 指向的那个“假路径”里。
                //    既然你在做假路径映射，说明这个路径下的资源应该能被浏览器访问到（或者被拦截）。
                //    我们暂时保持原逻辑，如果图片加载 404，请告知我调整这里。

                const sheetUrl = config.dirMatch + json.meta.image;

                return {
                    frames: json.frames,
                    sheetUrl: sheetUrl
                };
            } catch (e) {
                console.error("JSON 加载失败:", config.jsonUrl, e);
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

    /* ================= 5. 图片切割 ================= */

    async function cropSpriteToBlob(sheetUrl, x, y, w, h) {
        const image = await loadSheetImage(sheetUrl);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, x, y, w, h, 0, 0, w, h);

        return new Promise(resolve => {
            canvas.toBlob(blob => {
                resolve(URL.createObjectURL(blob));
            });
        });
    }

    /* ================= 6. 交互逻辑 ================= */

    let saveBtn = null;

    function removeSaveBtn() {
        if (saveBtn) {
            saveBtn.remove();
            saveBtn = null;
        }
    }

    function triggerDownload(blobUrl, filename) {
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    document.addEventListener("click", (e) => {
        if (saveBtn && saveBtn.contains(e.target)) return;
        removeSaveBtn();

        const img = e.target.closest("img");
        if (!img || !img.dataset.blobUrl) return;
        if (img.closest("a")) return;

        saveBtn = document.createElement("div");
        saveBtn.innerText = "保存原图";
        saveBtn.style.cssText = `
            position: absolute;
            z-index: 99999;
            background: rgba(0, 0, 0, 0.75);
            color: #fff;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 13px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            white-space: nowrap;
            top: ${e.pageY + 10}px;
            left: ${e.pageX + 10}px;
            user-select: none;
        `;

        saveBtn.addEventListener("click", (evt) => {
            evt.stopPropagation();
            const downloadName = getFileName(img.dataset.spriteKey || "image.png");
            triggerDownload(img.dataset.blobUrl, downloadName);
            removeSaveBtn();
        });

        document.body.appendChild(saveBtn);
    });

    /* ================= 7. 主流程 ================= */

    document.addEventListener("DOMContentLoaded", async () => {

        // 预加载所有配置里的 JSON
        await Promise.all(ATLAS_CONFIG_ARRAY.map(cfg => loadAtlas(cfg)));

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

            // Key 匹配逻辑
            const spriteKey = getSpriteKey(originalSrc);
            const frameData = atlas.frames[spriteKey];

            if (!frameData) {
                console.warn("[Sprite] 找不到 Key:", spriteKey);
                img.src = originalSrc;
                continue;
            }

            const { x, y, w, h } = frameData.frame;

            try {
                const blobUrl = await cropSpriteToBlob(atlas.sheetUrl, x, y, w, h);
                img.src = blobUrl;
                img.dataset.blobUrl = blobUrl;
                img.dataset.spriteKey = spriteKey;
                img.style.objectFit = "";
                img.style.objectPosition = "";

                if (img.getAttribute("width")) img.style.width = img.getAttribute("width") + "px";
                if (img.getAttribute("height")) img.style.height = img.getAttribute("height") + "px";

            } catch (err) {
                console.error("[Sprite] 切割失败:", err);
                img.src = originalSrc;
            }
        }
    });

})();