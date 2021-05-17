import "/socket.io/socket.io.js" 

import Snake from "./game/Snake.js"
import animate from "./animate.js"
import Game from "./game/Game.js"
import Food from "./game/Food.js"


const game = new Game("#game-canvas")
game.resolution()
game.keyboard()

const food = new Food()

game.add(food)

const snake = new Snake()
snake.add(1, 10)
snake.add(2, 10)
snake.add(3, 10)
game.add(snake)

animate(() => game.core())