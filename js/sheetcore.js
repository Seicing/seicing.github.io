(function () {
    /* ================= 0. 全局路径映射 (核心修复) ================= */
    // 定义 https://seicing.com/js 和 https://seicing.com/res 对应的真实服务器地址
    const PATH_MAP = {
        "https://seicing.com/js/": "https://seicing.com/js/",
        "https://seicing.com/res/": "https://data.seicing.com/seicingdepot/"
    };

    /* ================= 1. 配置区域 (可扩展) ================= */

    const SPRITE_GROUPS = [
        // === 第 1 组：DNF 装备与图标 ===
        {
            name: "DNF_Icon",
            jsonUrl: "https://seicing.com/js/sheet/dnficon.json",
            sheetUrl: "https://seicing.com/res/dnficon.png",
            rootMatch: "dfclass/",
            folders: [
                "equipment", "equipment2", "equipment3", "equipment4",
                "equipment5", "equipment6", "equipment7", "equipment8",
                "equipmenta", "equipmentb", "equipmentc", "equipmentd",
                "equipmente", "equipmentf", "equipmentg", "equipmentx",
                "equipmenty",
                "奥兹玛", "希洛克", "100"
            ]
        },

        {
            name: "DNF_skillicon",
            jsonUrl: "https://seicing.com/js/sheet/dnfskillicon.json",
            sheetUrl: "https://seicing.com/res/dnfskillicon.png",
            rootMatch: "dfclass/",
            folders: ["skillicon"]
        },

        {
            name: "DNF_skillicon_new",
            jsonUrl: "https://seicing.com/js/sheet/dnfskilliconnew.json",
            sheetUrl: "https://seicing.com/res/dnfskilliconnew.png",
            rootMatch: "dfclass/",
            folders: ["characters"]
        },

        {
            name: "lolsprite",
            jsonUrl: "https://seicing.com/js/sheet/lolsprite.json",
            sheetUrl: "https://seicing.com/res/lolsprite.jpg",
            rootMatch: "3fatcatpool/",
            folders: ["lol"]
        },

        {
            name: "magiccard",
            jsonUrl: "https://seicing.com/js/sheet/magiccard.json",
            sheetUrl: "https://seicing.com/res/magiccard.jpg",
            rootMatch: "3fatcatpool/",
            folders: ["magiccard"]
        },
    ];

    /* ================= 2. 缓存管理 ================= */

    const resourcesCache = new Map();

    /* ================= 3. 辅助函数：路径解析 (新增) ================= */

    /**
     * 将配置中的 https://seicing.com/res/xxx 替换为真实的 URL
     */
    function resolveUrl(path) {
        if (!path) return "";

        // 遍历映射表进行替换
        for (const [prefix, domain] of Object.entries(PATH_MAP)) {
            if (path.startsWith(prefix)) {
                return path.replace(prefix, domain);
            }
        }
        return path; // 如果没有特殊前缀，返回原路径
    }

    /* ================= 4. 核心匹配逻辑 ================= */

    function findMatchConfig(src) {
        if (!src) return null;

        const cleanSrc = src.split("?")[0].split("#")[0];

        for (const config of SPRITE_GROUPS) {
            const rootIndex = cleanSrc.indexOf(config.rootMatch);
            if (rootIndex === -1) continue;

            const relativePath = cleanSrc.substring(rootIndex);

            // 检查文件夹前缀 (支持多级目录)
            const isValidFolder = config.folders.some(folder => {
                const prefix = config.rootMatch + folder + "/";
                return relativePath.startsWith(prefix);
            });

            if (isValidFolder) {
                return {
                    config: config,
                    key: relativePath // 这就是 JSON 里的 Key
                };
            }
        }

        return null;
    }

    /* ================= 5. 资源加载器 (已修复) ================= */

    function loadGroupResources(config) {
        // ★ 修复点：使用 resolveUrl 解析真实地址
        // 这样 resourcesCache 的 Key 也会是真实地址，避免重复加载
        const realJsonUrl = resolveUrl(config.jsonUrl);
        const realSheetUrl = resolveUrl(config.sheetUrl);

        if (resourcesCache.has(realJsonUrl)) {
            return resourcesCache.get(realJsonUrl);
        }

        const promise = (async () => {
            try {
                console.log(`[Sprite Loader] 正在加载组: ${config.name}`);

                // 1. 加载 JSON
                const jsonPromise = fetch(realJsonUrl).then(r => {
                    if (!r.ok) throw new Error(`JSON ${r.status}`);
                    return r.json();
                });

                // 2. 加载图片
                const imgPromise = new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.src = realSheetUrl; // 使用真实地址
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(new Error(`Image Load Failed: ${realSheetUrl}`));
                });

                const [json, image] = await Promise.all([jsonPromise, imgPromise]);

                if (!json.frames) throw new Error("JSON format error: no frames");

                return {
                    frames: json.frames,
                    image: image
                };

            } catch (e) {
                console.error(`[Sprite Loader] 加载失败 [${config.name}]:`, e);
                return null;
            }
        })();

        resourcesCache.set(realJsonUrl, promise);
        return promise;
    }

    /* ================= 6. 切图逻辑 ================= */

    async function cropSprite(imageObj, frameData) {
        if (!imageObj || !frameData) return null;

        const { x, y, w, h } = frameData.frame;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(imageObj, x, y, w, h, 0, 0, w, h);

        return new Promise(resolve => {
            canvas.toBlob(blob => {
                if (blob) resolve(URL.createObjectURL(blob));
                else resolve(null);
            });
        });
    }

    /* ================= 7. 保存功能 ================= */

    let saveBtn = null;
    function removeSaveBtn() { if (saveBtn) { saveBtn.remove(); saveBtn = null; } }

    document.addEventListener("click", (e) => {
        if (saveBtn && saveBtn.contains(e.target)) return;
        removeSaveBtn();

        const img = e.target.closest("img");
        if (!img || !img.dataset.blobUrl) return;
        if (img.closest("a")) return;

        saveBtn = document.createElement("div");
        saveBtn.innerText = "保存原图";
        saveBtn.style.cssText = `position: absolute; z-index: 99999; background: rgba(0,0,0,0.8); color: #fff; padding: 5px 10px; border-radius: 4px; font-size: 12px; cursor: pointer; top: ${e.pageY + 10}px; left: ${e.pageX + 10}px;`;

        saveBtn.addEventListener("click", (evt) => {
            evt.stopPropagation();
            const a = document.createElement("a");
            a.href = img.dataset.blobUrl;
            a.download = (img.dataset.spriteKey || "icon").split("/").pop();
            a.click();
            removeSaveBtn();
        });
        document.body.appendChild(saveBtn);
    });

    /* ================= 8. 主流程 ================= */

    document.addEventListener("DOMContentLoaded", async () => {
        const allImages = document.querySelectorAll("img[data-src]");
        const tasksMap = new Map();

        // 1. 扫描并归类
        for (const img of allImages) {
            const rawSrc = img.dataset.src;
            const match = findMatchConfig(rawSrc);

            if (match) {
                if (!tasksMap.has(match.config)) {
                    tasksMap.set(match.config, []);
                }
                tasksMap.get(match.config).push({
                    el: img,
                    key: match.key,
                    rawSrc: rawSrc
                });
            } else {
                img.src = rawSrc;
            }
        }

        if (tasksMap.size === 0) return;

        // 2. 处理每个配置组
        const groupPromises = Array.from(tasksMap.entries()).map(async ([config, items]) => {
            const resources = await loadGroupResources(config);

            if (!resources) {
                items.forEach(item => item.el.src = item.rawSrc);
                return;
            }

            for (const item of items) {
                const frameData = resources.frames[item.key];

                if (!frameData) {
                    console.warn(`[Sprite] Key not found in ${config.name}:`, item.key);
                    item.el.src = item.rawSrc;
                    continue;
                }

                try {
                    const blobUrl = await cropSprite(resources.image, frameData);
                    item.el.src = blobUrl;

                    item.el.dataset.blobUrl = blobUrl;
                    item.el.dataset.spriteKey = item.key;

                    item.el.style.objectFit = "";
                    if (item.el.getAttribute("width")) item.el.style.width = item.el.getAttribute("width") + "px";
                    if (item.el.getAttribute("height")) item.el.style.height = item.el.getAttribute("height") + "px";

                } catch (err) {
                    console.error("Cut error:", err);
                    item.el.src = item.rawSrc;
                }
            }
        });

        await Promise.all(groupPromises);
    });

})();