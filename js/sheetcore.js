(function () {

    /* ================= 1. 配置区域 ================= */

    const SPRITE_GROUPS = [
        {
            jsonUrl: "https://seicing.com/js/sheet/dnficon.json",
            sheetUrl: "https://seicing.com/res/dnficon.png",
            root: "https://data.seicing.com/seicingdepot/dfclass/",
            folders: [
                "equipment", "equipment2", "equipment3", "equipment4",
                "equipment5", "equipment6", "equipment7", "equipment8",
                "equipmenta", "equipmentb", "equipmentc", "equipmentd",
                "equipmente", "equipmentf", "equipmentg", "equipmentx",
                "equipmenty", "奥兹玛", "希洛克", "100"
            ]
        },

        // === 第 2 组：其他示例 ===
        {
            jsonUrl: "https://seicing.com/js/sheet/dnfskillicon测试.json",
            // sheetUrl: "https://seicing.com/res/skillicon.png", // 如果需要指定路径就写
            root: "https://data.seicing.com/seicingdepot/dfclass/",
            folders: ["skillicon测试"]
        }
    ];

    /* ================= 2. 自动生成配置 ================= */

    const GENERATED_CONFIGS = SPRITE_GROUPS.flatMap(group => {
        return group.folders.map(folder => ({
            dirMatch: group.root + folder + "/",
            jsonUrl: group.jsonUrl,
            sheetUrl: group.sheetUrl // 传递大图路径配置
        }));
    });

    const ATLAS_CONFIG_ARRAY = [
        ...GENERATED_CONFIGS,
        // 单独配置项
        {
            dirMatch: "https://data.seicing.com/seicingdepot/3fatcatpool/科技树测试/",
            jsonUrl: "https://seicing.com/js/sheet/科技树测试.json"
        }
    ];

    const atlasCache = new Map();
    const sheetImageCache = new Map();

    /* ================= 3. 辅助函数 ================= */

    function getFileName(path) {
        return path.split("/").pop().split("?")[0].split("#")[0];
    }

    function getSpriteKey(src) {
        const cleanSrc = src.split("?")[0].split("#")[0];
        // 严格移除 https://seicing.com/res/ 前缀，完全匹配 JSON 里的 Key 格式
        if (cleanSrc.indexOf("https://seicing.com/res/") === 0) {
            return cleanSrc.substring(5);
        }
        return cleanSrc;
    }

    function findAtlasConfig(src) {
        return ATLAS_CONFIG_ARRAY.find(cfg => src.includes(cfg.dirMatch)) || null;
    }

    /* ================= 4. 资源加载 (核心修正) ================= */

    async function loadAtlas(config) {
        if (atlasCache.has(config.dirMatch)) return atlasCache.get(config.dirMatch);

        const promise = (async () => {
            try {
                const res = await fetch(config.jsonUrl);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();

                let finalSheetUrl;

                // 优先使用配置里写死的 sheetUrl (例如 https://seicing.com/res/dnficon.png)
                if (config.sheetUrl) {
                    finalSheetUrl = config.sheetUrl;
                }
                // 否则默认认为图片在 JSON 文件的同级目录下
                else {
                    // 获取 JSON 的目录: "https://seicing.com/js/sheet/dnficon.json" -> "https://seicing.com/js/sheet/"
                    const jsonDir = config.jsonUrl.substring(0, config.jsonUrl.lastIndexOf("/") + 1);
                    finalSheetUrl = jsonDir + json.meta.image;
                }

                return {
                    frames: json.frames,
                    sheetUrl: finalSheetUrl
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

    /* ================= 5. Canvas 切图 ================= */

    async function cropSpriteToBlob(sheetUrl, x, y, w, h) {
        const image = await loadSheetImage(sheetUrl);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");

        // 使用 JSON 里的 x, y, w, h 进行精确裁剪
        ctx.drawImage(image, x, y, w, h, 0, 0, w, h);

        return new Promise(resolve => {
            canvas.toBlob(blob => {
                resolve(URL.createObjectURL(blob));
            });
        });
    }

    /* ================= 6. 交互：保存按钮 ================= */

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

            // 1. 提取 Key: 去掉 https://seicing.com/res/
            const spriteKey = getSpriteKey(originalSrc);
            // 2. 匹配 JSON
            const frameData = atlas.frames[spriteKey];

            if (!frameData) {
                console.warn("[Sprite] Key not found:", spriteKey);
                img.src = originalSrc;
                continue;
            }

            const { x, y, w, h } = frameData.frame;

            try {
                // 3. 使用定位到的大图进行切割
                const blobUrl = await cropSpriteToBlob(atlas.sheetUrl, x, y, w, h);
                img.src = blobUrl;
                img.dataset.blobUrl = blobUrl;
                img.dataset.spriteKey = spriteKey;
                img.style.objectFit = "";
                img.style.objectPosition = "";

                if (img.getAttribute("width")) img.style.width = img.getAttribute("width") + "px";
                if (img.getAttribute("height")) img.style.height = img.getAttribute("height") + "px";

            } catch (err) {
                console.error("[Sprite] Cut error:", err);
                img.src = originalSrc;
            }
        }
    });

})();