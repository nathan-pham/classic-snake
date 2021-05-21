import "/socket.io/socket.io.js" 

export default class Socket {
    ref = io()

    listen(game, classes) {
        this.ref.on("game-init", ({ name, roomID }) => {
            if(name == this.ref.id) {
                console.log("connected to room", roomID)
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

    join(username) {
        this.ref.emit("create-room", { username })
    }
}