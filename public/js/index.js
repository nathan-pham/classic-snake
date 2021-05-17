import "/socket.io/socket.io.js" 
import Canvas from "./game/Canvas.js"
import { version } from "./config.js"
import animate from "./animate.js"

const currentVersion = async () => {
    const fetchedVersion = await fetch("/version").then(res => res.text())
    return fetchedVersion == version
}

const canvas = new Canvas("#game-canvas")
canvas.resolution()
canvas.keyboard()

animate(() => canvas.core())