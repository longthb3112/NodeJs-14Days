console.log("1️⃣ Start");

setTimeout(() => {
  console.log("⏱️ setTimeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("💡 Promise then()");
});

(async () => {
  await new Promise(resolve => setTimeout(resolve, 0));
  console.log("⚙️ Async/Await completed");
})();

console.log("2️⃣ End of main script");