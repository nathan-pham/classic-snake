import { Server } from "socket.io"
import express from "express"

import { createState, gameLoop } from "./game.js"
import Manager from "./rooms/Manager.js"
import Room from "./rooms/Room.js"

import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const version = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"))).version
const app = express()

app.get("/version", (req, res) => {
    res.send(version)
})

app.use(express.static("public"))

const server = app.listen(8080)
const io = new Server(server)
const rooms = new Manager()

io.on("connection", client => {
    const name = client.id
    const room = new Room(createState(name))

    console.log(room.id)

    room.join(client, name)
    room.interval(io)
    room.keydown(client)
})