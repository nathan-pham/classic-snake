import { grid } from "./config.js"

const random = (start=0, end=grid) => {
    return Math.floor(Math.random() * (end - start))+ start
}

const createState = (name) => {
    const snake = createSnake(name)

    return [
        snake,
        createFood([ snake ])
    ]
}

const createSnake = (name) => {
    const randomPosition = { x: random(2, grid - 2), y: random(2, grid - 2) }
    
    return ({
        type: "snake",
        name,
        dead: false,
        pos: randomPosition,
        vel: { x: 1, y: 0 },
        body: [ randomPosition ]
    })
}

const createFood = (players) => {
    const food = {
        type: "food",
        name: "food",
        pos: {
            x: random(),
            y: random()
        }
    }

    for(const player of players) {
        for(const cell of player.body) {
            if(cell.x == food.pos.x && cell.y == food.pos.y) {
                return createFood(players)
            }
        }
    }

    return food
}

const gameLoop = (_gameState=[]) => {
    const gameState = [ ..._gameState ]
    
    let players = gameState.filter(object => object.type === "snake")
    let food = gameState.filter(object => object.type === "food" )[0] 

    players.forEach(player => {
        if(player.dead) {
            return
        }

        player.pos.x += player.vel.x
        player.pos.y += player.vel.y

        if(player.pos.x < 0 || player.pos.x > grid || player.pos.y < 0 || player.pos.y > grid) {
            player.dead = true
            return
        }

        if(food.pos.x == player.pos.x && food.pos.y == player.pos.y) {
            player.body.push({ ...player.pos })

            player.pos.x += player.vel.x
            player.pos.y += player.vel.y
            
            food = createFood(players)
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

export {
    createState,
    gameLoop
}