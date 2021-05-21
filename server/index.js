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
    client.on("create-room", (data) => {
        const name = client.id
        const display = data.username
        const room = new Room(createState({ name, display }))
            
        room.join(client, name)
        room.keydown(client)
        room.interval(io)

        rooms.add(room)
    })

    // TODO: create room w/ variable # of snakes
})