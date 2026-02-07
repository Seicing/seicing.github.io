(function () {

    /* ================= 配置 (保持不变) ================= */

    const ATLAS_CONFIG_ARRAY = [
        { dirMatch: "https://seicing.com/res/", jsonUrl: "https://seicing.com/js/sheet/dnficon.json" },
    ];

    const atlasCache = new Map();
    const sheetImageCache = new Map();

    /* ================= 工具函数 ================= */

    function getFileName(src) {
        return src.split("/").pop().split("?")[0].split("#")[0];
    }

    function findAtlasConfig(src) {
        return ATLAS_CONFIG_ARRAY.find(cfg => src.includes(cfg.dirMatch)) || null;
    }

    async function loadAtlas(config) {
        if (atlasCache.has(config.dirMatch)) return atlasCache.get(config.dirMatch);

        const promise = (async () => {
            try {
                const res = await fetch(config.jsonUrl);
                if (!res.ok) throw 0;
                const json = await res.json();
                return {
                    frames: json.frames,
                    sheetUrl: config.dirMatch + json.meta.image
                };
            } catch (e) {
                console.error("Atlas 加载失败:", config.jsonUrl, e);
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
            img.crossOrigin = "anonymous"; // 必须开启跨域，否则无法裁剪
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });

        sheetImageCache.set(src, promise);
        return promise;
    }

    /* ================= 核心：切割图片并替换 src ================= */

    async function cropSpriteToBlob(sheetUrl, x, y, w, h) {
        const image = await loadSheetImage(sheetUrl);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");

        // 从大图中切出小图
        ctx.drawImage(image, x, y, w, h, 0, 0, w, h);

        return new Promise(resolve => {
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                resolve(url);
            });
        });
    }

    /* ================= 交互：左键点击 -> 显示保存按钮 ================= */

    let saveBtn = null;

    function removeSaveBtn() {
        if (saveBtn) {
            saveBtn.remove();
            saveBtn = null;
        }
    }

    // 真正的下载逻辑
    function triggerDownload(url, filename) {
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    }

    document.addEventListener("click", (e) => {
        // 1. 如果点击的是保存按钮本身，忽略
        if (saveBtn && saveBtn.contains(e.target)) return;

        // 2. 任何点击先清除现有的按钮
        removeSaveBtn();

        const img = e.target.closest("img");

        // 3. 检查是否是我们处理过的 Sprite 图片 (有 blobUrl)
        if (!img || !img.dataset.blobUrl) return;

        // 4. 【关键】如果在 <a> 标签内，直接返回，不拦截，让链接生效
        if (img.closest("a")) return;

        // 5. 生成保存按钮
        saveBtn = document.createElement("div");
        saveBtn.innerText = "保存原图";
        saveBtn.style.cssText = `
            position: absolute;
            z-index: 10000;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 13px;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            white-space: nowrap;
            top: ${e.pageY + 10}px;
            left: ${e.pageX + 10}px;
        `;

        saveBtn.addEventListener("click", (evt) => {
            evt.stopPropagation();
            // 使用 img 上绑定的 blobUrl 和原始文件名下载
            triggerDownload(img.dataset.blobUrl, img.dataset.spriteName || "image.png");
            removeSaveBtn();
        });

        document.body.appendChild(saveBtn);
    });

    /* ================= 主流程 ================= */

    document.addEventListener("DOMContentLoaded", async () => {

        // 1. 预加载 Atlas 配置
        await Promise.all(ATLAS_CONFIG_ARRAY.map(cfg => loadAtlas(cfg)));

        // 2. 遍历所有 img
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
            const frameData = atlas.frames[name];
            if (!frameData) {
                img.src = originalSrc;
                continue;
            }

            const { x, y, w, h } = frameData.frame;

            /* === 关键修改：Canvas 切割 === */
            // 我们不使用 object-fit，而是直接把图片切出来，变成一个新的 URL
            try {
                const blobUrl = await cropSpriteToBlob(atlas.sheetUrl, x, y, w, h);

                // 设置新的 src
                img.src = blobUrl;

                // 记录数据供下载使用
                img.dataset.blobUrl = blobUrl;
                img.dataset.spriteName = name;

                // 清除之前的样式干扰，让 CSS max-width 生效
                img.style.objectFit = "";
                img.style.objectPosition = "";

                // 如果 HTML 上写死了 width/height，还是尊重一下，否则自然撑开
                // 注意：这里不再强制设置 px，从而允许 max-width: 100px 生效
                if (img.getAttribute("width")) img.style.width = img.getAttribute("width") + "px";
                if (img.getAttribute("height")) img.style.height = img.getAttribute("height") + "px";

            } catch (err) {
                console.error("Sprite 切割失败", err);
                img.src = originalSrc; // 降级回原图
            }
        }
    });

})();