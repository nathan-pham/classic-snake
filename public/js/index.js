import Socket from "./game/Socket.js"
import Snake from "./game/Snake.js"
import Game from "./game/Game.js"
import Food from "./game/Food.js"

import animate from "./animate.js"

const game = new Game("#game-canvas")
game.resolution()
game.listen()

const food = new Food()

game.add(food)

const snake = new Snake()
snake.add(1, 10)
snake.add(2, 10)
snake.add(3, 10)
game.add(snake)

animate(() => game.core())

const socket = new Socket(game)
socket.listen()