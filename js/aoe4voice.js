
(() => {
    "use strict";

    // ==============================
    // ZIP 配置
    // ==============================

    const ZIP_ROOT = "https://data.seicing.com/seicingdepot/seicingmusic/aoe4/";

    // ZIP 下载缓存
    const zipCache = new Map();

    // 解压后的音频缓存
    const audioCache = new Map();

    // ==============================
    // ZIP 加载模块
    // ==============================

    async function loadZip(pageId) {
        if (!zipCache.has(pageId)) {
            const url = ZIP_ROOT + pageId + ".zip";

            const promise = fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(
                            "ZIP 下载失败: " + response.status + " " + url
                        );
                    }

                    return response.arrayBuffer();
                })
                .then(data => JSZip.loadAsync(data));

            zipCache.set(pageId, promise);
        }

        try {
            return await zipCache.get(pageId);
        } catch (error) {
            // 下载失败后允许下次重新尝试
            zipCache.delete(pageId);
            throw error;
        }
    }

    async function getZipAudio(pageId, filename) {
        const cacheKey = pageId + "/" + filename;

        if (audioCache.has(cacheKey)) {
            return audioCache.get(cacheKey);
        }

        const zip = await loadZip(pageId);

        // 支持 ZIP 根目录和文明目录
        const file =
            zip.file(filename) ||
            zip.file(pageId + "/" + filename);

        if (!file) {
            throw new Error("ZIP 中不存在文件: " + filename);
        }

        const blob = await file.async("blob");
        const objectUrl = URL.createObjectURL(blob);

        audioCache.set(cacheKey, objectUrl);

        return objectUrl;
    }

    // ==============================
    // 音频路径解析
    // ==============================

    function parseAudioPath(url) {
        const marker = "/aoe4/";
        const index = url.indexOf(marker);

        if (index === -1) return null;

        const relative = url.substring(index + marker.length);
        const parts = relative.split("/");

        if (parts.length < 2) return null;

        return {
            pageId: parts[0],
            filename: parts.slice(1).join("/")
        };
    }

    // ==============================
    // 原有播放器逻辑
    // ==============================

    function initVoicePlayers() {
        document.querySelectorAll(".vl").forEach(root => {

            if (root.dataset.bound === "1") return;
            root.dataset.bound = "1";

            let audio = null;
            let button = null;

            function stop() {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }

                if (button) {
                    button.classList.remove("p");
                }

                audio = null;
                button = null;
            }

            root.addEventListener("click", async event => {

                const b = event.target.closest(".vp");

                if (!b || !root.contains(b)) return;

                // 再次点击正在播放的按钮：暂停
                if (button === b && audio && !audio.paused) {
                    audio.pause();
                    b.classList.remove("p");
                    return;
                }

                // 停止之前的音频
                stop();

                const url = b.dataset.a;

                if (!url) {
                    console.error("Voice audio URL is missing:", b);
                    return;
                }

                // 创建音频对象
                const a = new Audio();

                audio = a;
                button = b;

                b.classList.add("p");

                // 播放结束
                a.addEventListener("ended", () => {
                    if (audio === a) stop();
                }, { once: true });

                // 音频加载或播放失败
                a.addEventListener("error", () => {
                    if (audio === a) stop();

                    console.error(
                        "Voice playback failed:",
                        a.error,
                        a.src
                    );
                }, { once: true });

                try {

                    // --------------------------
                    // 优先尝试 ZIP
                    // --------------------------

                    let playbackUrl = url;

                    const parsed = parseAudioPath(url);

                    if (parsed && typeof JSZip !== "undefined") {
                        try {
                            playbackUrl = await getZipAudio(
                                parsed.pageId,
                                parsed.filename
                            );

                            console.log(
                                "ZIP audio loaded:",
                                parsed.pageId,
                                parsed.filename
                            );

                        } catch (zipError) {

                            console.warn(
                                "ZIP loading failed, using original audio:",
                                zipError
                            );

                            // ZIP 失败时保留原始 URL
                            playbackUrl = url;
                        }
                    }

                    // 用户在等待 ZIP 加载期间可能已经切换了音频
                    if (audio !== a) return;

                    // --------------------------
                    // 使用最终 URL 播放
                    // --------------------------

                    a.src = playbackUrl;

                    await a.play();

                } catch (error) {

                    if (audio === a) stop();

                    console.error(
                        "Voice playback failed:",
                        error,
                        a.src || url
                    );
                }
            });
        });
    }

    // ==============================
    // 初始化
    // ==============================

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initVoicePlayers);
    } else {
        initVoicePlayers();
    }

})();
