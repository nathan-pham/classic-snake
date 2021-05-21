import { clipText } from "../utils.js"
import Object from "./base/Object.js"
import config from "../config.js"

export default class Snake extends Object {
    type = "snake"
    dead = false
    body = []
    color = config.color.snake

    render(ctx, scale) {
        ctx.fillStyle = this.color

        this.body.forEach(({ x, y }) => {
            ctx.fillRect(x * scale, y * scale, scale, scale)
        })

        ctx.fillStyle = "#000"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(clipText(this.display.trim()), this.pos.x * scale + scale / 2, this.pos.y * scale - 10)
    }
}