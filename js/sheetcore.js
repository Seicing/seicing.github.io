(function () {

    /* ================= 配置 ================= */

    const SPRITE_ROOT = "/https://data.seicing.com/seicingdepot/3fatcatpool/";

    /* ================= 缓存 ================= */

    const atlasCache = new Map();

    /* ================= 工具 ================= */

    function getDir(src) {
        return src.substring(0, src.lastIndexOf("/") + 1);
    }

    function getFileName(src) {
        return src.split("/").pop().split("?")[0];
    }

    async function loadAtlas(dir) {
        if (atlasCache.has(dir)) {
            return atlasCache.get(dir);
        }

        const promise = (async () => {
            try {
                const jsonUrl = dir + "科技树.json";
                const res = await fetch(jsonUrl);
                if (!res.ok) throw 0;

                const json = await res.json();
                return {
                    frames: json.frames,
                    sheet: dir + json.meta.image
                };
            } catch {
                return null;
            }
        })();

        atlasCache.set(dir, promise);
        return promise;
    }

    /* ================= 主逻辑 ================= */

    document.addEventListener("DOMContentLoaded", async () => {

        const imgs = document.querySelectorAll("img[src]");

        for (const img of imgs) {

            const src = img.src;
            if (!src.includes(SPRITE_ROOT)) continue;

            const dir = getDir(src);
            const name = getFileName(src);

            const atlas = await loadAtlas(dir);
            if (!atlas) continue;

            const frame = atlas.frames[name];
            if (!frame) continue;

            const { x, y, w, h } = frame.frame;

            /* === sprite 化 === */

            img.dataset.originalSrc = img.src;
            img.src = atlas.sheet;

            img.style.width = w + "px";
            img.style.height = h + "px";
            img.style.objectFit = "none";
            img.style.objectPosition = `-${x}px -${y}px`;
        }
    });

})();