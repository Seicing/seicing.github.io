(function () {

    /* ================= 1. 配置区域 ================= */

    const SPRITE_GROUPS = [
        // === 第 1 组：DNF 装备与图标 ===
        {
            jsonUrl: "https://seicing.com/js/sheet/dnficon.json",
            sheetUrl: "https://seicing.com/res/dnficon.png",
            root: "https://data.seicing.com/seicingdepot/dfclass/",
            folders: [
                "equipment", "equipment2", "equipment3", "equipment4",
                "equipment5", "equipment6", "equipment7", "equipment8",
                "equipmenta", "equipmentb", "equipmentc", "equipmentd",
                "equipmente", "equipmentf", "equipmentg", "equipmentx",
                "equipmenty",
                "奥兹玛", "希洛克", "100"
            ]
        },

    ];

    /* ================= 2. 自动生成配置 ================= */

    const GENERATED_CONFIGS = SPRITE_GROUPS.flatMap(group => {
        return group.folders.map(folder => {
            // 原始配置路径: https://data.seicing.com/seicingdepot/dfclass/希洛克/
            const fullDirMatch = group.root + folder + "/";

            // ★ 核心修复：生成一个“特征路径”用于匹配
            // 去掉 "https://seicing.com/res/" 前缀 -> "dfclass/希洛克/"
            // 无论域名怎么变，URL 里一定包含 "dfclass/希洛克/"
            const matchKey = fullDirMatch.replace("https://seicing.com/res/", "");

            return {
                dirMatch: fullDirMatch, // 原始配置保留
                matchKey: matchKey,     // 新增：用于在 URL 中查找的特征串
                jsonUrl: group.jsonUrl,
                sheetUrl: group.sheetUrl
            };
        });
    });

    const ATLAS_CONFIG_ARRAY = [
        ...GENERATED_CONFIGS,
        // 单独配置项也需要遵循这个逻辑
        {
            dirMatch: "https://data.seicing.com/seicingdepot/3fatcatpool/科技树/",
            matchKey: "3fatcatpool/科技树/", // 手动指定特征路径
            jsonUrl: "https://seicing.com/js/sheet/科技树.json"
        }
    ];

    const atlasCache = new Map();
    const sheetImageCache = new Map();

    /* ================= 3. 辅助函数 ================= */

    function getFileName(path) {
        return path.split("/").pop().split("?")[0].split("#")[0];
    }

    /**
     * ★ 核心修复：更健壮的 Key 提取逻辑
     * 不再傻傻地切掉前5个字符，而是根据配置里的 matchKey 来定位
     * 
     * @param {string} src - 图片完整地址 (可能是 https://data.seicing.com/.../dfclass/...)
     * @param {string} matchKey - 特征路径 (例如 "dfclass/希洛克/")
     */
    function getSpriteKey(src, matchKey) {
        // 清理 URL 参数
        const cleanSrc = src.split("?")[0].split("#")[0];

        // 在 URL 里查找特征路径的位置
        // 例如：在 "https://.../dfclass/希洛克/img.png" 里找 "dfclass/希洛克/"
        const index = cleanSrc.indexOf(matchKey);

        if (index !== -1) {
            // 从特征路径开始截取，正好就是 JSON 里的 Key
            // 结果: "dfclass/希洛克/img.png"
            return cleanSrc.substring(index);
        }

        // 兜底：如果找不到特征路径，说明这个 config 匹配有问题，返回原串
        return cleanSrc;
    }

    /**
     * ★ 核心修复：更健壮的 Config 查找逻辑
     * 不再检测 src.includes("https://seicing.com/res/...")，而是检测 matchKey
     */
    function findAtlasConfig(src) {
        return ATLAS_CONFIG_ARRAY.find(cfg => src.includes(cfg.matchKey)) || null;
    }

    /* ================= 4. 资源加载 ================= */

    async function loadAtlas(config) {
        if (atlasCache.has(config.dirMatch)) return atlasCache.get(config.dirMatch);

        const promise = (async () => {
            try {
                const res = await fetch(config.jsonUrl);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();

                let finalSheetUrl;
                if (config.sheetUrl) {
                    finalSheetUrl = config.sheetUrl;
                } else {
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
            // 如果有 spriteKey 就用它提取文件名，否则用默认
            const key = img.dataset.spriteKey || "image.png";
            triggerDownload(img.dataset.blobUrl, getFileName(key));
            removeSaveBtn();
        });

        document.body.appendChild(saveBtn);
    });

    /* ================= 7. 主流程 ================= */

    document.addEventListener("DOMContentLoaded", async () => {
        // 预加载配置列表里的所有 JSON
        await Promise.all(ATLAS_CONFIG_ARRAY.map(cfg => loadAtlas(cfg)));

        const imgs = document.querySelectorAll("img[data-src]");

        for (const img of imgs) {
            const originalSrc = img.dataset.src;
            if (!originalSrc) continue;

            // 1. 查找匹配的配置 (使用 matchKey 而不是 https://seicing.com/res 路径)
            const config = findAtlasConfig(originalSrc);
            if (!config) {
                // 没匹配到配置，说明是普通图片
                img.src = originalSrc;
                continue;
            }

            const atlas = await loadAtlas(config);
            if (!atlas) {
                img.src = originalSrc;
                continue;
            }

            // 2. ★ 提取 Key (传入 config.matchKey 进行精确定位)
            // 原链接: https://data.seicing.com/depot/dfclass/希洛克/image.png
            // matchKey: dfclass/希洛克/
            // 结果 Key: dfclass/希洛克/image.png (完美匹配 JSON)
            const spriteKey = getSpriteKey(originalSrc, config.matchKey);

            const frameData = atlas.frames[spriteKey];

            if (!frameData) {
                console.warn("[Sprite] JSON里找不到Key:", spriteKey);
                img.src = originalSrc;
                continue;
            }

            const { x, y, w, h } = frameData.frame;

            try {
                const blobUrl = await cropSpriteToBlob(atlas.sheetUrl, x, y, w, h);
                img.src = blobUrl;

                img.dataset.blobUrl = blobUrl;
                img.dataset.spriteKey = spriteKey; // 存下来用于下载时命名

                img.style.objectFit = "";
                img.style.objectPosition = "";

                if (img.getAttribute("width")) img.style.width = img.getAttribute("width") + "px";
                if (img.getAttribute("height")) img.style.height = img.getAttribute("height") + "px";

            } catch (err) {
                console.error("[Sprite] 切图失败:", err);
                img.src = originalSrc;
            }
        }
    });

})();