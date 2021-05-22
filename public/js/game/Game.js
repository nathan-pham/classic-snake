import { h, $ } from "../utils.js"
import config from "../config.js"
import Snake from "./Snake.js"
import Food from "./Food.js"
import Socket from "./Socket.js"

const classes = {
    food: Food,
    snake: Snake
}

const keyMap = {
    "up": "w",
    "left": "a",
    "down": "s",
    "right": "d"
}

export default class Game {
    type = "game"
    objects = []
    socket = new Socket(classes)
    modal = false

    constructor(target) {
        this.canvas = typeof target == "string" ? $(target)[0] : target

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
            let key = e.key.toLowerCase().replace("arrow", '').trim()

            if(keyMap.hasOwnProperty(key)) {
                key = keyMap[key]
            }

            this.socket.ref.emit("keydown", {
                key,
                name: this.socket.ref.id
            })
        })

        this.socket.ref.on("revived", () => {
            this.modal = false
        })
    }

    update() {
        this.objects.forEach(object => {
            object.update(this.objects)
        
            if(object.dead && object.name == this.socket.ref.id && !this.modal) {
                this.modal = true

                const homeButton = h("button", { className: "default", style: "margin: 0 0 1rem 0", onClick: () => {
                    location.reload()
                }}, "back home")
                const replayButton = h("button", { className: "default", onClick: () => {
                    this.socket.replay()
                    modal.remove()
                }}, "replay")
            
                const modal = h("div", { className: "modal-wrapper" },
                    h("div", { className: "modal" },
                        h("h1", {}, "you died"),
                        homeButton,
                        replayButton
                    )
                )

                const gameWrapper = $(".game-wrapper")[0]
                gameWrapper.appendChild(modal)
            }
        })
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