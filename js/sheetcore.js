(function () {

    /* ================= 1. 配置区域 (可扩展) ================= */

    const SPRITE_GROUPS = [
        // === 第 1 组：DNF 装备与图标 ===
        {
            name: "DNF_Icon", // 标识名字(调试用)
            jsonUrl: "https://seicing.com/js/sheet/dnficon.json",
            sheetUrl: "https://seicing.com/res/dnficon.png",
            rootMatch: "dfclass/", // URL中用于定位的特征字符串
            folders: [
                "equipment", "equipment2", "equipment3", "equipment4",
                "equipment5", "equipment6", "equipment7", "equipment8",
                "equipmenta", "equipmentb", "equipmentc", "equipmentd",
                "equipmente", "equipmentf", "equipmentg", "equipmentx",
                "equipmenty",
                "奥兹玛", "希洛克", "100"
            ]
        },

        // === 第 2 组：示例（比如科技树） ===
        // 你可以随时复制上面的格式添加新组
        /*
        {
            name: "TechTree",
            jsonUrl: "https://seicing.com/js/sheet/techtree.json",
            sheetUrl: "https://seicing.com/res/techtree.png",
            rootMatch: "3fatcatpool/科技树/", 
            folders: [ "image" ] // 如果根目录下直接是图片，这里可以留空或写个通配逻辑，具体看需求
        }
        */
    ];

    /* ================= 2. 缓存管理 ================= */

    // 存储已加载的 JSON 数据和 Image 对象
    // Key: config.jsonUrl, Value: { frames: Object, image: ImageElement }
    const resourcesCache = new Map();

    /* ================= 3. 核心匹配逻辑 ================= */

    /**
     * 遍历所有配置组，找到该图片所属的配置组
     * @param {string} src - 图片 URL
     * @returns {Object|null} - 返回 { config, key } 或 null
     */
    function findMatchConfig(src) {
        if (!src) return null;

        // 去除 URL 参数
        const cleanSrc = src.split("?")[0].split("#")[0];

        for (const config of SPRITE_GROUPS) {
            // 1. 检查根路径特征
            const rootIndex = cleanSrc.indexOf(config.rootMatch);
            if (rootIndex === -1) continue;

            // 2. 提取相对路径 (例如: "dfclass/希洛克/abc.png")
            const relativePath = cleanSrc.substring(rootIndex);

            // 3. 检查是否在指定的文件夹列表中
            // 构造检查路径: "dfclass/equipment/"
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

    /* ================= 4. 资源加载器 ================= */

    /**
     * 加载指定配置组的 JSON 和大图
     * (如果已加载则直接返回缓存)
     */
    function loadGroupResources(config) {
        if (resourcesCache.has(config.jsonUrl)) {
            return resourcesCache.get(config.jsonUrl);
        }

        const promise = (async () => {
            try {
                console.log(`[Sprite Loader] 正在加载组: ${config.name || "Unknown"}`);

                // 1. 并行加载 JSON 和 图片 (如果想串行可改为 await fetch 后再 load image)
                const jsonPromise = fetch(config.jsonUrl).then(r => {
                    if (!r.ok) throw new Error(`JSON ${r.status}`);
                    return r.json();
                });

                // 预加载大图对象
                const imgPromise = new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.src = config.sheetUrl;
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(new Error(`Image Load Failed: ${config.sheetUrl}`));
                });

                const [json, image] = await Promise.all([jsonPromise, imgPromise]);

                // 如果 json 里没有 frames 字段，说明格式不对
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

        resourcesCache.set(config.jsonUrl, promise);
        return promise;
    }

    /* ================= 5. 切图逻辑 ================= */

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

    /* ================= 6. 保存功能 (可选) ================= */

    let saveBtn = null;
    function removeSaveBtn() { if (saveBtn) { saveBtn.remove(); saveBtn = null; } }

    document.addEventListener("click", (e) => {
        if (saveBtn && saveBtn.contains(e.target)) return;
        removeSaveBtn();

        const img = e.target.closest("img");
        if (!img || !img.dataset.blobUrl) return;
        if (img.closest("a")) return; // 如果图片本身是链接，不干扰

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

    /* ================= 7. 主流程 ================= */

    document.addEventListener("DOMContentLoaded", async () => {
        const allImages = document.querySelectorAll("img[data-src]");

        // 临时存储需要处理的任务
        // 结构: Map<ConfigObject, Array<{el, key, rawSrc}>>
        const tasksMap = new Map();

        // 1. 扫描并归类
        for (const img of allImages) {
            const rawSrc = img.dataset.src;
            const match = findMatchConfig(rawSrc);

            if (match) {
                // 这是一个需要处理的雪碧图
                if (!tasksMap.has(match.config)) {
                    tasksMap.set(match.config, []);
                }
                tasksMap.get(match.config).push({
                    el: img,
                    key: match.key,
                    rawSrc: rawSrc
                });
            } else {
                // 不匹配任何规则，普通懒加载
                img.src = rawSrc;
            }
        }

        // 2. 如果没有任何匹配的任务，退出
        if (tasksMap.size === 0) return;

        // 3. 处理每个配置组 (并行处理不同组)
        const groupPromises = Array.from(tasksMap.entries()).map(async ([config, items]) => {

            // 加载该组的资源
            const resources = await loadGroupResources(config);

            if (!resources) {
                // 加载失败，回退
                items.forEach(item => item.el.src = item.rawSrc);
                return;
            }

            // 处理该组下的所有图片
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

                    // 标记数据供下载用
                    item.el.dataset.blobUrl = blobUrl;
                    item.el.dataset.spriteKey = item.key;

                    // 样式修正
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