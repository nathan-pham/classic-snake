import Socket from "./game/Socket.js"
import Snake from "./game/Snake.js"
import Food from "./game/Food.js"
import Game from "./game/Game.js"

const game = new Game("#game-canvas")
game.resolution()
game.listen()

const classes = {
    food: Food,
    snake: Snake
}

const socket = new Socket(game, classes)
socket.listen()