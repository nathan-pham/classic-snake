import Object from "./base/Object.js"
import config from "../config.js"

export default class Snake extends Object {
    name = "snake"
    body = []

    render(ctx, scale) {
        ctx.fillStyle = config.color.snake

        for(const cell of this.body) {
            const { x, y } = cell
            ctx.fillStyle(x * scale, y * scale, scale, scale)
        }
    }

    add(x, y) {
        this.body.push({ x, y })
    }
}