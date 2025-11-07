# 🧠 Day 2 — Asynchronous Programming in Node.js
________________________________________
# 🎯 Goals
By the end of Day 2, you’ll be able to:  
•	Understand how Node.js handles async code (callbacks, promises, async/await)  
•	Use Timers, Promises, and Async Functions correctly  
•	See how the event loop manages asynchronous tasks  
•	Build a small project that demonstrates async execution order  
________________________________________
# ⚙️ Theory  
1️⃣ **What “Asynchronous” Means**  
In Node.js, code doesn’t always run top-to-bottom. When a slow task (like file I/O, HTTP request, or timer) is encountered:  
•	Node offloads it to the Libuv thread pool or OS APIs  
•	Then continues executing other code  
•	When the task finishes, its callback or promise is queued for the event loop  
👉 Result: Node stays fast and non-blocking.  
________________________________________
2️⃣ **Key Async Mechanisms**  
| Concept       | Description                              | Example                          |
|----------------|------------------------------------------|----------------------------------|
| **Callback**   | Function executed when async task completes | `fs.readFile("file.txt", cb)`    |
| **Promise**    | Object that represents a future value       | `fetch().then(res => res.json())`|
| **Async/Await**| Syntactic sugar for promises               | `const data = await fetch()`     |
| **Timers**     | Schedule future code                       | `setTimeout(), setInterval()`    |
________________________________________
3️⃣ **Event Loop Stages (Simplified)**  
1.	**Timers Phase** → setTimeout, setInterval callbacks  
2.	**Pending Callbacks Phase** → deferred I/O callbacks  
3.	**Poll Phase** → new I/O events are handled  
4.	**Check Phase** → setImmediate() callbacks  
5.	**Close Callbacks Phase** → cleanup, socket close, etc.  
_Between these, microtasks (Promises) are processed right after each phase._
________________________________________
# 🧩 Practice Project: Async Flow Logger
You’ll create a small Node.js + TypeScript app to log the order of execution of async functions.  
📁 Folder Structure  
<pre>
node-day2/
├── src/
│   └── index.ts
├── tsconfig.json
├── package.json
└── .gitignore
</pre>
________________________________________
Run these commands in a new folder:  
```
mkdir node-day2
cd node-day2
npm init -y
npm install typescript @types/node --save-dev
npx tsc --init
```
This creates a **tsconfig.json **
Update **tsconfig.json** to configure **outDir** for compiles js files and **rootDir** from src folder
```
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "rootDir": "src",
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```
Update **package.json**
```
{
  "name": "day1-ts",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/node": "^24.9.2",
    "typescript": "^5.9.3"
  }
}
```
________________________________________

⚡ **Step 2: log the order of execution of async functions**  
Create src/app.ts with content as below:
```
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
```
Compile and run:
```
npx tsc
node dist/app.js
```
✅ Output:
```
1️⃣ Start
2️⃣ End of main script
💡 Promise then()
⏱️ setTimeout callback
⚙️ Async/Await completed
```
**🧠 Explanation** 
1.	console.log("Start") and "End" run first — synchronous code runs immediately.  
2.	The Promise.then() is queued as a microtask → runs before timers.  
3.	setTimeout(..., 0) is queued for the timer phase → runs after microtasks.  
4.	await pauses the async function, and its continuation is scheduled like a microtask.
✅ You now see the Node.js event loop in action.

🧠 **Summary Diagram**  
<pre>
┌──────────────┐
│ Your Code 🧠 │
└──────┬───────┘
       │
   Runs sync part
       │
       ▼
 Async task created
       │
Handled by Node (Libuv)
       │
Callback queued
       │
       ▼
 Event Loop picks it up
       │
Executes callback → back to main thread
  </pre>
________________________________________
🧰 **What You Learned**  
•	Node’s async nature: single-threaded but non-blocking  
•	Event loop microtasks vs macrotasks  
•	How to visualize async behavior  
•	Using Promise, setTimeout, and async/await together    
# Day 2 with Node.js ✅ Excited for the journey ahead!
