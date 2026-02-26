async function fetchDB(filename) {
    try {
        const res = await fetch(`/app/databases/${filename}.json`);
        const data = await res.text();
        return JSON.parse(data);
    }
    catch (e) {
        console.error(`Error fetching ${filename}.json: ${e}`);
        return {};
    }
}
const bg = {
    elem: document.getElementById("_bg"),
    db: {
        acnh: await fetchDB("bg-acnh"),
        dkb: await fetchDB("bg-dkb"),
        hw_aoi: await fetchDB("bg-hw-aoi"),
        katfl: await fetchDB("bg-katfl"),
        lm3: await fetchDB("bg-lm3"),
        mk8dx: await fetchDB("bg-mk8dx"),
        mps: await fetchDB("bg-mps"),
        miitopia: await fetchDB("bg-miitopia"),
        pm_ttyd: await fetchDB("bg-pm-ttyd"),
        pik4: await fetchDB("bg-pik4"),
        poke_la: await fetchDB("bg-poke-la"),
        poke_sword: await fetchDB("bg-poke-sword"),
        sm3da: await fetchDB("bg-sm3da"),
        sm3dw_bf: await fetchDB("bg-sm3dw_bf"),
        smbw: await fetchDB("bg-smbw"),
        smg2: await fetchDB("bg-smg2"),
        smo: await fetchDB("bg-smo"),
        smp: await fetchDB("bg-smp"),
        ssbu: await fetchDB("bg-ssbu"),
        loz_botw: await fetchDB("bg-loz-botw"),
        loz_eow: await fetchDB("bg-loz-eow"),
        loz_ss: await fetchDB("bg-loz-ss"),
        loz_totk: await fetchDB("bg-loz-totk")
    },
    game: ["acnh", "dkb", "hw_aoi", "katfl", "lm3", "mk8dx", "mps", "miitopia", "pm_ttyd", "pik4", "poke_la", "poke_sword", "sm3da", "sm3dw_bf", "smbw", "smg2", "smo", "smp", "ssbu", "loz_botw", "loz_eow", "loz_ss", "loz_totk"]
};
class RandomPicker {
    names;
    constructor(names) {
        this.names = names;
    }
    randomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    randomName() {
        return this.randomItem(this.names);
    }
    pick(getContents, useFile) {
        const k = this.randomName();
        const contents = getContents(k);
        const file = this.randomItem(contents);
        useFile(k, file);
    }
}
const clock = document.getElementById("clock");
function updateClock() {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
    const delay = 1000 - now.getMilliseconds();
    setTimeout(updateClock, delay);
}
updateClock();
$(function () {
    const bgPicker = new RandomPicker(bg.game);
    bgPicker.pick(k => bg.db[k][0].contents, (k, file) => {
        bg.elem.style.backgroundImage =
            `url('https://raw.githubusercontent.com/reper2/switch-album/${k}/${file.name}')`;
        console.log(`🎮Randomly selected background from ${k}:`, file.name);
    });
});
export {};
//# sourceMappingURL=app.js.map