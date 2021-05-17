import "/socket.io/socket.io.js" 

export default class Socket {
    socket = io()

    constructor(game) {
        this.game = game
    }

    listen() {
        this.socket.on("init", (message) => {
            console.log(message)
        })
    }
}