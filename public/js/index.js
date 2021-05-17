import "/socket.io/socket.io.js" 
import Canvas from "./game/Canvas.js"

const canvas = new Canvas("#game-canvas")
canvas.resolution()
canvas.keyboard()

canvas.render()