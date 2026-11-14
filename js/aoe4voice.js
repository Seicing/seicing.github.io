
(() => {
    "use strict";

    function initVoicePlayers() {
        document.querySelectorAll(".vl").forEach(root => {
            // 防止重复绑定
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

                const a = new Audio(url);

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
                        url
                    );
                }, { once: true });

                try {
                    await a.play();
                } catch (error) {
                    if (audio === a) stop();

                    console.error(
                        "Voice playback failed:",
                        error,
                        url
                    );
                }
            });
        });
    }

    // 正常页面加载
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initVoicePlayers);
    } else {
        initVoicePlayers();
    }

})();
