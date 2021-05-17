import config from "./config.js"

class Canvas {
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
}

export default Canvas