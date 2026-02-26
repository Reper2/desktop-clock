const sw = {
    sessStart: sessionStorage.getItem("session_started"),
    i: {
        _: document.getElementById("install"),
        btn: document.createElement("button"),
        tt: document.createElement("span"),
        msg: "Thank you for installing the app!"
    }
};
let installListener = null;
let appInstalledListener = null;
window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js")
            .then(reg => {
            console.groupCollapsed("Service Worker Status");
            if (reg.installing)
                console.log("Service worker installing");
            if (reg.waiting)
                console.log("Service worker installed");
            if (reg.active)
                console.log("Service worker active");
            console.log("Scope:", reg.scope);
            console.groupEnd();
        })
            .catch(console.error);
    }
    const isStandalone = matchMedia("(display-mode: standalone)").matches ||
        navigator.standalone === true;
    if (!isStandalone) {
        let deferredPrompt = null;
        installListener = (e) => {
            e.preventDefault();
            deferredPrompt = e;
            sw.i._.className = "tooltip";
            sw.i.btn.innerHTML = "📲";
            [sw.i.tt.className, sw.i.tt.innerHTML] =
                ["tooltiptext", "Install App"];
            sw.i.btn.appendChild(sw.i.tt);
            sw.i._.appendChild(sw.i.btn);
        };
        window.addEventListener("beforeinstallprompt", installListener);
        sw.i._.onclick = async () => {
            if (!deferredPrompt)
                return;
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                deferredPrompt = null;
            }
        };
    }
    appInstalledListener = () => {
        if (installListener)
            window.removeEventListener("beforeinstallprompt", installListener);
        console.log(sw.i.msg);
    };
    window.addEventListener("appinstalled", appInstalledListener);
});
export {};
//# sourceMappingURL=sw-installer.js.map