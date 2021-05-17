import "/socket.io/socket.io.js" 

export default class Socket {
    ref = io()
    id = 0

    listen(game, classes) {
        this.ref.on("init", ({ id }) => {
            this.id = id
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
}