import Object from "./base/Object.js"
import config from "../config.js"

export default class Food extends Object {
    name = "food"
    
    render(ctx, scale) {
        ctx.fillStyle = config.color.food
        ctx.fillRect(this.x * scale, this.y * scale, scale, scale)
    }
}