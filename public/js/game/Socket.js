import "/socket.io/socket.io.js" 

export default class Socket {
    socket = io()
    classes = {}
    
    constructor(game, classes) {
        this.game = game
        this.classes = classes
    }

    listen() {
        this.socket.on("init", console.log)

        this.socket.on("game-state", state => {
            const serverObjects = JSON.parse(state)
            const clientObjects = []

            serverObjects.forEach(serverObject => {
                const clientObject = new this.classes[serverObject.type]()
                Object.assign(clientObject, serverObject)
                
                clientObjects.push(clientObject)
            })

            this.game.objects = clientObjects

            console.log(serverObjects)

            requestAnimationFrame(() => this.game.core())
        })
    }
}