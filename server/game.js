const config = require("./config")

const createState = () => ([
    { 
        type: "snake",
        name: "player-1",
        dead: false,
        pos: { x: 3, y: 10 },
        vel: { x: 1, y: 0 },
        body: [
            { x: 1, y: 10 },
            { x: 2, y: 10 },
            { x: 3, y: 10 }
        ]
    },
    {
        type: "food",
        pos: {
            x: 0,
            y: 0
        }
    }
])

const randomFood = (players) => {
    const random = () => Math.floor(Math.random() * config.grid)

    const food = {
        type: "food",
        pos: {
            x: random(),
            y: random()
        }
    }

    for(const player of players) {
        for(const cell of player.body) {
            if(cell.x == food.pos.x && cell.y == food.pos.y) {
                return randomFood(players)
            }
        }
    }
}

const gameLoop = (gameState={}) => {
    const players = gameState.filter(object => String(object.name).includes("player") && object.type === "snake")
    const food = gameState.filter(object => object.type == "food" )[0] 

    players.forEach(player => {
        if(player.dead) {
            return
        }

        player.pos.x += player.vel.x
        player.pos.y += player.vel.y

        if(player.pos.x < 0 || player.pos.x > config.grid || player.pos.y < 0 || player.pos.y > config.grid) {
            player.dead = true
            return
        }

        if(food.pos.x == player.pos.x && food.pos.y == player.pos.y) {
            player.body.push({ ...player.pos })

            player.pos.x += player.vel.x
            player.pos.y += player.vel.y
            
            food = randomFood(players)
        }

        for(const cell of player.body) {
            if(cell.x == player.pos.x && cell.y == player.pos.y) {
                player.dead = true
                return
            }
        }

        player.body.push({ ...player.pos })
        player.body.shift()
    })

    return [
        ...players,
        food
    ]
}

module.exports = {
    createState,
    gameLoop
}