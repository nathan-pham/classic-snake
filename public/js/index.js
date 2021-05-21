import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"
import Game from "./game/Game.js"
import { h, $ } from "./utils.js"

const gameWrapper = $(".game-wrapper")[0]
const [ createButton, playButton ] = $(gameWrapper, "button")

playButton.addEventListener("click", () => {
    const username = $(gameWrapper, "input")[0].value

    gameWrapper.children[0].remove()

    const canvas = h("canvas", { id: "game-canvas" })
    gameWrapper.append(canvas)

    const game = new Game(canvas)
    game.resolution()
    game.listen()
    game.join(username)
})

// playButton.

// document.body.append(
//     h("div", { className: "modal" },
//         h("")
//     )
// )

// TODO: game form functionality
// TODO: help & settings modal

// const game = new Game("#game-canvas")
// game.resolution()
// game.listen()