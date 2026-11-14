
/**
 * AoE2 ZIP Voice Loader
 * 自动将文明语音路径转换为 ZIP 内的 OGG
 *
 * 原有 HTML onclick 无需修改
 * ZIP 下载失败时自动回退到原始 OGG
 */

(function () {
    const SOUND_MARKER = "/sound/";

    // 缓存已加载的 ZIP
    const zipCache = new Map();

    // 缓存已经生成的 Blob URL
    const audioCache = new Map();

    /**
     * 加载文明 ZIP
     */
    async function loadCivilizationZip(zipPath) {
        if (zipCache.has(zipPath)) {
            return zipCache.get(zipPath);
        }

        const promise = (async () => {
            try {
                const response = await fetch(zipPath);

                if (!response.ok) {
                    throw new Error("ZIP not found: " + zipPath);
                }

                const buffer = await response.arrayBuffer();

                return await JSZip.loadAsync(buffer);

            } catch (error) {
                console.warn("[Voice ZIP] Loading failed:", zipPath, error);
                return null;
            }
        })();

        zipCache.set(zipPath, promise);

        return promise;
    }

    /**
     * 从 ZIP 中获取音频
     */
    async function getZipAudio(soundRoot, civId, filename) {
        const zipPath = `${soundRoot}/${civId}.zip`;
        const cacheKey = `${zipPath}/${filename}`;

        if (audioCache.has(cacheKey)) {
            return audioCache.get(cacheKey);
        }

        const zip = await loadCivilizationZip(zipPath);

        if (!zip) return null;

        // 支持 ZIP 根目录存放文件
        // 也支持 ZIP 内部保留文明目录
        const file =
            zip.file(filename) ||
            zip.file(`${civId}/${filename}`);

        if (!file) {
            console.warn("[Voice ZIP] Audio not found:", filename);
            return null;
        }

        const blob = await file.async("blob");

        const url = URL.createObjectURL(
            new Blob([blob], { type: "audio/ogg" })
        );

        audioCache.set(cacheKey, url);

        return url;
    }

    /**
     * 替代原有 playSound()
     */
    window.playSound = async function (path) {

        // 识别文明语音路径
        const markerIndex = path.indexOf(SOUND_MARKER);

        if (markerIndex === -1) {
            new Audio(path).play();
            return;
        }

        const soundRoot = path.substring(
            0,
            markerIndex + SOUND_MARKER.length - 1
        );

        const relativePath = path.substring(
            markerIndex + SOUND_MARKER.length
        );

        const parts = relativePath.split("/");

        if (parts.length !== 2) {
            new Audio(path).play();
            return;
        }

        const civId = parts[0];
        const filename = parts[1];

        try {
            const zipAudio = await getZipAudio(
                soundRoot,
                civId,
                filename
            );

            // ZIP 成功：播放压缩包内的音频
            if (zipAudio) {
                const audio = new Audio(zipAudio);
                await audio.play();
                return;
            }

        } catch (error) {
            console.warn("[Voice ZIP] Playback failed:", error);
        }

        // ZIP 不可用：回退到原始 OGG
        const audio = new Audio(path);
        audio.play().catch(error => {
            console.error("[Voice] Original audio playback failed:", error);
        });
    };

})();
