# 🧠 Day 1 — Environment & Node.js Fundamentals

This project is part of a 2-week roadmap to master **Node.js**  
This day focuses on understanding how Node.js works under the hood, learning its module system, and writing your first HTTP server.  
It demonstrates how to set up a simple Node.js project using **TypeScript**, perform basic file I/O operations, and understand the Node.js execution flow (event loop).

---
🎯 **Goal**  
•	Understand what Node.js is and how it works.  
•	Learn the basics of modules, the event-driven model  
•	Build your first simple web server using Node’s built-in modules.
________________________________________
🧩 **Theory: Node.js Core Concepts** 

🧱  **What Is Node.js?**
•	Node.js is a JavaScript runtime built on Google’s V8 engine (the same engine that runs in Chrome).  
•	It lets you run JavaScript outside the browser, mainly for backend servers, APIs, CLI tools, etc.  

⚙️ **How Node.js Works** 
•	Node.js uses an event-driven, non-blocking I/O model.  
•	It runs on a single thread, but handles thousands of connections using an event loop and callback queue instead of spawning threads for each request.
________________________________________
🧩 **Node.js Architecture (Simplified)**
1.	**Event Loop** — runs continuously, checks if tasks (I/O) are done.
2.	**Callback Queue** — when I/O is done, callback gets queued.
3.	**Libuv** — a C++ library that handles async operations like file I/O and networking.
4.	**V8 Engine** — executes your JS code.
________________________________________
📦 **Node.js Modules**  
•	Node organizes code into modules.  
•	There are three types:  
1.	**Core modules** – built into Node (fs, path, http, etc.)
2.	**Local modules** – files you create yourself.
3.	**Third-party module**s – installed via npm (like express).
   
_Importing modules:_ 
```
// CommonJS syntax
const fs = require('fs');

// ES module syntax
import fs from 'fs';
```
________________________________________
🧮 **Node.js Execution Flow Example**  

When Node runs your script:
1.	It parses your JS code.
2.	Runs synchronous lines first.
3.	Schedules async operations (like file read) in the background.
4.	Once async tasks complete, the callbacks go into the event loop queue.
5.	Node executes them when the main thread is idle.

**🧠 1️⃣ Node.js Execution Flow (Detailed Explanation)**  
Let’s understand how Node.js actually runs your code — this is the foundation of mastering Node.
________________________________________
⚙️ **Step-by-Step Execution Flow** 
When you run: node app.js. Here’s what happens behind the scenes:
1. V8 Engine Parses and Executes
- Node.js runs on V8, a C++ engine that compiles JavaScript into machine code.
- It executes synchronous code line by line, top to bottom.
  
_Example:_
```
console.log('Start');
console.log('End');
```
_Output:_
```
Start
End
Nothing special yet — just normal synchronous execution.
```
________________________________________
2. **Libuv and the Event Loop**
Now, when you introduce asynchronous operations (like reading a file or waiting for a timer), Node uses a C++ library called Libuv to handle them in the background.

_Example:_
```
console.log('Start');

setTimeout(() => {
  console.log('Inside Timeout');
}, 1000);

console.log('End');
```
**Output:**
```
Start
End
Inside Timeout
```

**Let’s break this down:**  
Steps	What Happens	Where It Happens  
1.  console.log('Start') executes	V8 main thread  
2.  setTimeout() schedules a timer	Libuv (background)  
3.  console.log('End') executes	V8 main thread  
4.  After 1 second, Libuv moves callback to the callback queue	Libuv → Event Loop  
5.  Event Loop sees main thread is free → executes the callback	V8 again
________________________________________
🌀 3. **The Event Loop Phases**  
The event loop continuously checks:  
```
“Is the main thread busy? If not, is there any callback/task waiting to be executed?”
```
_It has several phases, but the main ones are:_  

| **Phase**	 | **What Happens** |
|-----------|-----------|
| Timers | Executes callbacks from setTimeout() and setInterval() |
| Pending | Callbacks	I/O callbacks deferred from previous cycle |
| Idle, Prepare | Internal use |
| Poll | Fetches new I/O events, executes I/O callbacks |
| Check | Executes setImmediate() callbacks |
| Close | Cleans up (e.g., socket close events) |

Between each phase, Node checks the microtask queue for:  
•	**Promise callbacks**  
•	**process.nextTick()**
________________________________________
⚡ _Example:_ **Promise vs setTimeout**  
```
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));

console.log('End');
```
**Output:**
```
Start
End
Promise
Timeout
```
**Why?**  
•	Promise.then() goes into the microtask queue (runs right after main code).  
•	setTimeout() goes into the callback queue, processed after microtasks. 

## ⚙️ **Summary Diagram**
<pre>
┌──────────────────────────────┐
│       Your JavaScript        │
└────────────┬─────────────────┘
             │
      V8 executes sync code
             │
             ▼
    Async call (e.g., setTimeout)
             │
        Handled by Libuv
             │
      Callback queued when done
             │
             ▼
    Event Loop checks the queue
             │
 Executes callback → back to V8
</pre>
So, Node.js feels multithreaded but it’s actually a single-threaded event loop managing asynchronous callbacks efficiently.
# 💻 2️⃣ Practical Examples in TypeScript  
Now let’s convert the Day 1 Node examples into TypeScript versions.
________________________________________
🧰 **Step 1: Initialize a TypeScript Project**  
Run these commands in a new folder:  
```
mkdir node-day1
cd node-day1
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

⚡ **Step 2: Hello Node.js in TypeScript**  
Create src/app.ts with content as below:
```
console.log("Hello Node.js with TypeScript!");
```
Compile and run:
```
npx tsc
node dist/app.js
```
✅ Output:
```
Hello Node.js with TypeScript!
```
________________________________________
📁 **Step 3: File System Example (fs)**  
Create a ‘file-demo.ts’ file  
```
import * as fs from "fs/promises";

async function main() {
  const fileName = "message.txt";

  await fs.writeFile(fileName, "Hello from Node.js + TypeScript!");

  const data: string = await fs.readFile(fileName, "utf8");

  console.log("📄 File content:", data);
}

main().catch(console.error);
```
Compile and run :
```
Npm install
Npm run build
node dist/file-demo.js
```
✅ Output:
```
Hello from Node.js + TypeScript!
```
________________________________________

🌐 **Step 4: HTTP Server Example**
Create file src/server.ts:
```
import * as http from "http";

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.url}`);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hello from Node.js Server (TypeScript)</h1>");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```
Run:
```
Npm run build
node dist/server.js
```
✅ Open browser → http://localhost:3000
________________________________________
🧾 **Step 5: Add Logging**
Create src/server-log.ts:
```
import * as http from "http";
import * as fs from "fs";

const server = http.createServer((req, res) => {
  const logEntry = `${new Date().toISOString()} - ${req.url}\n`;

  fs.appendFileSync("access.log", logEntry);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Request logged successfully!");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

✅ Now every request is logged in access.log.
________________________________________
🏁 **End of Day 1 Summary**
| **Concept**	 | **	What You Learned** |
|-----------|-----------|
| Node.js purpose | JavaScript runtime for backend apps |
| Architecture | Event loop, single-threaded async model |
| Modules | Core, local, and npm-based |
| Core module usage | fs, http, etc. |
| Created | A working web server with logging |  

# Day 1 with Node.js ✅ Excited for the journey ahead!
