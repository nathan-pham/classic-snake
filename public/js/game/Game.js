import config from "../config.js"

export default class Game {
    name = "canvas"
    objects = []

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

    keyboard() {
        document.addEventListener("keydown", (e) => {
            console.log(e.key.toLowerCase())
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
}