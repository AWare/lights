export const wait = (t) =>
  new Promise((resolve) => {
    console.log("WAITING ", t);
    setTimeout(() => resolve(), t);
  });