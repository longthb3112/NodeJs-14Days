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
