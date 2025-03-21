import { WebSocketServer } from "ws";
import { ConnectDB } from '@repo/db/client';
import * as dotenv from "dotenv"
dotenv.config()

const server = new WebSocketServer({
    port: Number(process.env.PORT)
});

server.on("connection", (socket) => {
    socket.send("Hi there you are connected to the server");
})