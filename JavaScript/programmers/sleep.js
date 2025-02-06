/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
  let promise = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    });
  });
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

let t = Date.now();

sleep(100).then(() => console.log(Date.now() - t));

let myPromise = new Promise((resolve) => setTimeout(() => resolve("after")));
