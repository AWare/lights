const MIN_H = 359 / 360;
const MAX_H = 190 / 360; //290 / 360;
const FADE_IN_DURATION = 0;
const SUNRISE_FADE = 60 * 1000;
const COLD_DURATION = 60 * 1000;
const TEMP = 9000;
const TEMP_STABLE = 3500;
const SNOOZE = 1000 * 60 * 5;
const TIME = 1000 * 60 * 15;
const START_BRIGHTNESS = 0.01;
const FINISH_BRIGHTNESS = 1;

import { getSwitch, NOT_CHANGED, TURNED_OFF, onChange } from "../tp.js";
import Lifx from "node-lifx-lan";

const wait = (t) =>
  new Promise((resolve) => {
    console.log("WAITING ", t);
    setTimeout(() => resolve(), t);
  });

const ease = (n) => 1 - Math.cos((n * Math.PI) / 2); //easings.net

const colourStep = (i, steps) => {
  const time = Math.max(TIME / steps, SUNRISE_FADE);
  const hue = MIN_H + (MAX_H - MIN_H) * (i / steps) ** 5;
  const brightness =
    START_BRIGHTNESS + (FINISH_BRIGHTNESS - START_BRIGHTNESS) * ease(i / steps);
  const color = {
    hue,
    saturation: 1,
    brightness,
    kelvin: TEMP,
  };
  return async () => {
    console.log("step ", i, color);
    await Lifx.setColorBroadcast({
      color,
      duration: SUNRISE_FADE,
    });
    await wait(time);
  };
};

const colourSteps = (steps) =>
  [...new Array(steps)].map((_, i) => colourStep(i, steps));
console.log(colourStep(10, 100));

//TODO add long waits
//TOOD handle restarts
const steps = [
  async () => {
    console.log("starting");
    await Lifx.turnOffBroadcast();
    await Lifx.setColorBroadcast({
      color: {
        hue: MIN_H,
        saturation: 1,
        brightness: 0.01,
        kelvin: TEMP,
      },
    });
  },
  async () => {
    console.log("turn on");
    await Lifx.turnOnBroadcast({
      duration: 3000,
    });
    await wait(3000);
  },
  ...colourSteps(20),
  async () => {
    console.log("white");
    await Lifx.setColorBroadcast({
      color: {
        css: "white",
        brightness: 1,
        kelvin: TEMP,
      },
      duration: COLD_DURATION,
    });
    await wait(COLD_DURATION);
  },
];

const run = async () => {
  console.log("Starting to wake up.");
  const sw = await getSwitch();
  sw.power(true);
  const buttonWatcher = onChange(sw);
  buttonWatcher.then((_) => {
    console.log("button pushed");
    Lifx.turnOffBroadcast({ duration: 4000 });
  });
  let stop;
  for await (let step of steps) {
    stop = await Promise.race([buttonWatcher, Promise.resolve(NOT_CHANGED)]);
    console.log(stop);
    if (stop == TURNED_OFF) {
      await wait(SNOOZE);
      break;
    }
    console.log("running", step);
    await step();
    console.log("ran");
  }
  return stop === TURNED_OFF ? run() : Promise.resolve();
};
await run();
console.log("END");
process.exit(0);
