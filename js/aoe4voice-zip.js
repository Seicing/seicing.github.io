
/**
 * AoE4 ZIP Voice Loader
 * 自动将 AoE4 页面语音路径转换为 ZIP 内的音频
 *
 * 原有 HTML onclick 无需修改：
 * playSound('https://data.seicing.com/seicingdepot/seicingmusic/aoe4/chi_monk/xxx.mp3')
 *
 * ZIP 路径：
 * https://data.seicing.com/seicingdepot/seicingmusic/aoe4/chi_monk.zip
 *
 * ZIP 内支持：
 * 1. xxx.mp3
 * 2. chi_monk/xxx.mp3
 *
 * ZIP 加载失败或找不到音频时，自动回退到原始 MP3。
 */

(function () {
    "use strict";

    const PATH_MARKER = "/aoe4/";

    // ZIP 加载缓存
    const zipCache = new Map();

    // 已解压音频缓存
    const audioCache = new Map();

    // 正在播放的音频，避免对象被提前回收
    const activeAudios = new Set();

    /**
     * 播放音频
     */
    function playAudio(url) {
        const audio = new Audio(url);

        activeAudios.add(audio);

        audio.addEventListener("ended", function () {
            activeAudios.delete(audio);
        }, { once: true });

        audio.addEventListener("error", function () {
            activeAudios.delete(audio);
        }, { once: true });

        return audio.play().catch(function (error) {
            activeAudios.delete(audio);
            throw error;
        });
    }

    /**
     * ZIP 加载
     */
    async function loadPageZip(zipPath) {

        if (zipCache.has(zipPath)) {
            return zipCache.get(zipPath);
        }

        const promise = (async function () {

            try {
                if (!window.JSZip) {
                    throw new Error(
                        "JSZip 未加载，请先引入 jszip.min.js"
                    );
                }

                const response = await fetch(zipPath);

                if (!response.ok) {
                    throw new Error(
                        "HTTP " + response.status
                    );
                }

                const buffer = await response.arrayBuffer();

                const zip = await JSZip.loadAsync(buffer);

                console.log("[AoE4 ZIP] 加载成功：", zipPath);

                return zip;

            } catch (error) {

                console.warn(
                    "[AoE4 ZIP] 加载失败：",
                    zipPath,
                    error
                );

                return null;
            }

        })();

        zipCache.set(zipPath, promise);

        return promise;
    }

    /**
     * 从 ZIP 获取音频
     */
    async function getZipAudio(aoe4Root, pageId, filename) {

        const zipPath = `${aoe4Root}/${pageId}.zip`;

        const cacheKey = `${zipPath}/${filename}`;

        if (audioCache.has(cacheKey)) {
            return audioCache.get(cacheKey);
        }

        const zip = await loadPageZip(zipPath);

        if (!zip) return null;

        // 兼容 ZIP 根目录和页面 ID 子目录
        const file =
            zip.file(filename) ||
            zip.file(`${pageId}/${filename}`);

        if (!file) {

            console.warn(
                "[AoE4 ZIP] 找不到音频：",
                filename
            );

            return null;
        }

        try {

            const blob = await file.async("blob");

            const ext = filename.split(".").pop().toLowerCase();

            const mimeTypes = {
                mp3: "audio/mpeg",
                ogg: "audio/ogg",
                wav: "audio/wav",
                flac: "audio/flac",
                m4a: "audio/mp4",
                aac: "audio/aac",
                opus: "audio/opus"
            };

            const audioBlob = new Blob(
                [blob],
                {
                    type: mimeTypes[ext] || "application/octet-stream"
                }
            );

            const blobUrl = URL.createObjectURL(audioBlob);

            audioCache.set(cacheKey, blobUrl);

            return blobUrl;

        } catch (error) {

            console.warn(
                "[AoE4 ZIP] 解压失败：",
                filename,
                error
            );

            return null;
        }
    }

    /**
     * 原始音频回退
     */
    function playOriginal(path) {

        playAudio(path).catch(function (error) {

            console.error(
                "[AoE4 Voice] 原始音频播放失败：",
                path,
                error
            );

        });
    }

    /**
     * 替代原有 playSound()
     */
    window.playSound = async function (path) {

        if (typeof path !== "string" || !path) {
            console.warn("[AoE4 Voice] 无效路径：", path);
            return;
        }

        // 识别 AoE4 语音路径
        const markerIndex = path.indexOf(PATH_MARKER);

        // 非 AoE4 路径，直接播放
        if (markerIndex === -1) {
            playOriginal(path);
            return;
        }

        // AoE4 资源根目录
        // https://data.seicing.com/seicingdepot/seicingmusic/aoe4
        const aoe4Root = path.substring(
            0,
            markerIndex + PATH_MARKER.length - 1
        );

        // 相对路径
        // chi_monk/xxx.mp3
        const relativePath = path.substring(
            markerIndex + PATH_MARKER.length
        );

        const parts = relativePath.split("/");

        if (parts.length < 2 || parts.some(part => !part)) {
            playOriginal(path);
            return;
        }

        // 页面 ID
        const pageId = parts.shift();

        // 音频文件名
        const filename = parts.join("/");

        try {

            const zipAudio = await getZipAudio(
                aoe4Root,
                pageId,
                filename
            );

            // ZIP 成功：播放压缩包内的音频
            if (zipAudio) {

                try {
                    await playAudio(zipAudio);
                    return;

                } catch (error) {

                    console.warn(
                        "[AoE4 ZIP] 播放失败，尝试原始音频：",
                        error
                    );
                }
            }

        } catch (error) {

            console.warn(
                "[AoE4 ZIP] 处理失败：",
                error
            );
        }

        // ZIP 不可用：回退到原始 MP3
        playOriginal(path);
    };

})();
