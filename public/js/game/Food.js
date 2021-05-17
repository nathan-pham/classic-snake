import Object from "./base/Object.js"
import config from "../config.js"

export default class Food extends Object {
    type = "food"
    
    render(ctx, scale) {
        ctx.fillStyle = config.color.food
        ctx.fillRect(this.pos.x * scale, this.pos.y * scale, scale, scale)
    }
}