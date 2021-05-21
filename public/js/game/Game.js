import config from "../config.js"
import Snake from "./Snake.js"
import Food from "./Food.js"
import Socket from "./Socket.js"

const classes = {
    food: Food,
    snake: Snake
}

export default class Game {
    type = "game"
    objects = []
    socket = new Socket(classes)

    constructor(target) {
        this.canvas = typeof target == "string" ? document.querySelector(target) : target

        if(this.canvas.tagName.toLowerCase() == "canvas") {
            this.ctx = this.canvas.getContext("2d")
        } else {
            throw new Error("selected element is not a canvas")
        }
    }

    resolution() {
        Object.assign(this.canvas, config.resolution)
        Object.assign(this.canvas.style, config.resolution)
    }

    listen() {
        this.socket.listen(this, classes)

        document.addEventListener("keydown", (e) => {
            this.socket.ref.emit("keydown", {
                key: e.key.toLowerCase(),
                name: this.socket.ref.id
            })
        })
    }

    update() {
        this.objects.forEach(object => object.update(this.objects))
    }

    render() {
        this.ctx.fillStyle = config.color.background
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        const scaledSize = config.resolution.width / config.grid
        this.objects.forEach(object => object.render(this.ctx, scaledSize))
    }

    core() {
        this.update()
        this.render()
    }

    add(object) {
        this.objects.push(object)
    }

    join(username) {
        this.socket.join(username)
    }
}