import * as fs from "fs/promises";

async function main() {
  const fileName = "message.txt";

  await fs.writeFile(fileName, "Hello from Node.js + TypeScript!");

  const data: string = await fs.readFile(fileName, "utf8");

  console.log("📄 File content:", data);
}

main().catch(console.error);