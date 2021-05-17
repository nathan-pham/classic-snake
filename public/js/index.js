import "/socket.io/socket.io.js" 
import Game from "./game/Game.js"
import animate from "./animate.js"


const game = new Game("#game-canvas")
game.resolution()
game.keyboard()

animate(() => game.core())