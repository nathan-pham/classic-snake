import Object from "./base/Object.js"
import config from "../config.js"

export default class Snake extends Object {
    type = "snake"
    dead = false
    body = []

    render(ctx, scale) {
        ctx.fillStyle = config.color.snake

        this.body.forEach(({ x, y }) => {
            ctx.fillRect(x * scale, y * scale, scale, scale)
        })
    }

    add(x, y) {
        this.body.push({ x, y })
    }
}