const socket = require("socket.io")
const express = require("express")

const package = require("../package.json")
const { frameRate } = require("./config")
const { createState, gameLoop } = require("./game")
const path = require("path")

const app = express()

app.get("/version", (req, res) => {
    res.send(package.version)
})

app.use(express.static("public"))

const server = app.listen(8080)
const io = socket(server)

io.on("connection", client => {
    const gameState = createState()

    const intervalID = setInterval(() => {
        const newGameState = gameLoop(gameState)

        client.emit("game-state", JSON.stringify(newGameState))
    }, 1000 / frameRate)
})