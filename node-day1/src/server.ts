import * as http from "http";

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.url}`);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hello from Node.js Server (TypeScript)</h1>");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
