(() => {
    const root = document.currentScript.closest(".vl");
    if (!root || root.dataset.bound) return;
    root.dataset.bound = "1";
    let audio = null, button = null;
    function stop() {
        if (audio) { audio.pause(); audio.currentTime = 0; }
        if (button) button.classList.remove("p");
        audio = null; button = null;
    }
    root.addEventListener("click", async e => {
        const b = e.target.closest(".vp");
        if (!b) return;
        if (button === b && audio && !audio.paused) {
            audio.pause(); b.classList.remove("p"); return;
        }
        stop();
        const a = new Audio(b.dataset.a);
        audio = a; button = b;
        b.classList.add("p");
        a.addEventListener("ended", () => {
            if (audio === a) stop();
        }, { once: true });
        a.addEventListener("error", () => {
            if (audio === a) stop();
            console.error("Voice playback failed:", a.error);
        }, { once: true });
        try { await a.play(); }
        catch (error) {
            if (audio === a) stop();
            console.error("Voice playback failed:", error);
        }
    });
})(); 