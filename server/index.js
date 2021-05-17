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
    const id = client.id
    client.emit("init", { id })

    let gameState = createState(id)

    const intervalID = setInterval(() => {
        const newGameState = gameLoop(gameState)
        gameState = newGameState

        client.emit("game-state", JSON.stringify(newGameState))
    }, 1000 / frameRate)

    client.on("keydown", ({ key, name }) => {
        const keyMap = {
            "w": { y: -1, x: 0 },
            "a": { x: -1, y: 0 },
            "s": { y:  1, x: 0 },
            "d": { x:  1, y: 0 }
        }
        
        const player = gameState.filter(object => object.name === name)[0]

        if(keyMap.hasOwnProperty(key) && player) {
            Object.assign(player.vel, keyMap[key])
            
            gameState = gameState.filter(object => object.name !== name)
            gameState = [
                ...gameState,
                player
            ]
        }
    })
})