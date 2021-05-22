import { gameLoop, createSnake } from "../game.js"
import { frameRate } from "../config.js"

const generateRoom = (length=6) => {
    const characters = "abcdefghijklmnopqrstuvwxyz1234567890"
    const room = []

    for(let i = 0; i < length; i++) {
        room.push(characters.charAt(Math.floor(Math.random() * characters.length)))
    }

    return room.map(char => Math.random() > 0.5 ? char : char.toUpperCase()).join('')
}

export default class Room {
    id = generateRoom()

    constructor(gameState) {
        this.gameState = gameState
        this.clientIDs = []
    }

    join(client, id, display) {
        this.clientIDs.push(id)

        client.join(this.id)
        client.emit("game-init", { name: id, roomID: this.id })

        client.on("disconnect", () => {
            this.clientIDs = this.clientIDs.filter(clientID => clientID !== id)
            console.log("disconnected", id)
        })

        if(display) {
            this.gameState.push(createSnake(id, display))
        }
    }

    revive(client) {
        client.emit("revived")

        const clientID = client.id
        const display = this.gameState.filter(object => object.name == clientID)[0].display
        const newGameState = this.gameState.filter(object => object.name !== clientID)
        
        newGameState.push(createSnake(clientID, display))
        this.gameState = newGameState
    }

    interval(io) {
        this.intervalID = setInterval(() => {
            const newGameState = gameLoop(this.gameState)
            this.gameState = newGameState

            // TODO: only send across changed data

            if(this.clientIDs.length > 0) {
                io.in(this.id).emit("game-state", JSON.stringify(this.gameState))
            } else {
                clearInterval(this.intervalID)
                console.log("closed room", this.id)
            }
        }, 1000 / frameRate)
    }

    keydown(client) {
        client.on("keydown", ({ key, name }) => {
            const keyMap = {
                "w": { y: -1, x: 0 },
                "a": { x: -1, y: 0 },
                "s": { y:  1, x: 0 },
                "d": { x:  1, y: 0 }
            }
            
            const player = this.gameState.filter(object => object.name === name)[0]

            if(keyMap.hasOwnProperty(key) && player) {
                if(!(player.vel.x == keyMap[key].x * -1 && player.vel.y == keyMap[key].y * -1) || player.body.length == 1) {
                    Object.assign(player.vel, keyMap[key])
                }
                
                this.gameState = this.gameState.filter(object => object.name !== name)
                this.gameState = [
                    ...this.gameState,
                    player
                ]
            }
        })
    }
}