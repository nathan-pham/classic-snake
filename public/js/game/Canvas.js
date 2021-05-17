import config from "./config.js"

class Canvas {
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
        this.objects.forEach(object => object.update())
    }

    render() {
        this.ctx.fillStyle = config.color.background
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.objects.forEach(object => object.render())
    }

    core() {
        this.update()
        this.render()
    }
}

export default Canvas