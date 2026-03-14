const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket-Chatserver läuft.\n");
});

const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);

  ws.on("message", (msg) => {
    for (let c of clients) {
      if (c.readyState === WebSocket.OPEN) {
        c.send(msg.toString());
      }
    }
  });

  ws.on("close", () => {
    clients = clients.filter((c) => c !== ws);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});
