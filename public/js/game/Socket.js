import "/socket.io/socket.io.js" 
import { h, $ } from "../utils.js"

export default class Socket {
    ref = io()
    roomID = "000000"

    listen(game, classes) {
        this.ref.on("game-init", ({ name, roomID }) => {
            if(name == this.ref.id) {
                console.log("connected to room", roomID)
                this.roomID = roomID
                
                const gameWrapper = $(".game-wrapper")[0]
                gameWrapper.appendChild(h("span", { id: "room-id" }, `join code: ${ roomID }`))

                // TODO: leaderboard
            } else {
                throw new Error("socket mismatch")
            }
        })

        this.ref.on("game-state", state => {
            const serverObjects = JSON.parse(state)
            const clientObjects = []

            serverObjects.forEach(serverObject => {
                const clientObject = new classes[serverObject.type]()
                Object.assign(clientObject, serverObject)
                
                clientObjects.push(clientObject)
            })

            game.objects = clientObjects

            requestAnimationFrame(() => game.core())
        })
    }

    replay() {
        this.ref.emit("replay", { roomID: this.roomID })
    }

    createRoom(username) {
        this.ref.emit("create-room", { username })
    }

    joinRoom(username, roomID) {
        this.ref.emit("join-room", { username, roomID })
    }
}