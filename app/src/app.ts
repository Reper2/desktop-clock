import { Background, Database } from "../lib/db-typings";

/**
 * Asynchronously fetch the contents of a json file.
 * @param filename Name of json file without extension.
 * @returns Promise with type \<T\> of the parsed json or empty object if error.
 * @throws an error if the json cannot be found or other issue.
 */
async function fetchDB<T>(filename: string): Promise<T> {
  try {
    const res = await fetch(`/app/databases/${filename}.json`);
    const data = await res.text();
    return <T>JSON.parse(data);
  } catch (e) {
    console.error(`Error fetching ${filename}.json: ${e}`);
    return {} as T;
  }
}

const bg: Background.Config = {
  elem: <HTMLBodyElement>document.getElementById("_bg"),
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

type Name = string | number;

class RandomPicker {
  constructor(private names: Name[]) { }

  private randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private randomName(): Name {
    return this.randomItem(this.names);
  }

  pick<T>(
    getContents: (name: Name) => T[],
    useFile: (name: Name, file: T) => void,
  ): void {
    const k = this.randomName();
    const contents = getContents(k);
    const file = this.randomItem(contents);
    useFile(k, file);
  }
}

const clock = document.getElementById("clock") as HTMLSpanElement;

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();

  /* ms remaining until next second */
  const delay = 1000 - now.getMilliseconds();

  setTimeout(updateClock, delay);
}

updateClock();
$(function () {
  const bgPicker = new RandomPicker(bg.game);
  bgPicker.pick(
    k => bg.db[k][0].contents,
    (k, file: Database.File) => {
      bg.elem.style.backgroundImage =
        `url('https://raw.githubusercontent.com/reper2/switch-album/${k}/${file.name}')`;
      console.log(`🎮Randomly selected background from ${k}:`, file.name);
    },
  );
});