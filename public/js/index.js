import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"
import Game from "./game/Game.js"
import { h, $ } from "./utils.js"

const gameWrapper = $(".game-wrapper")[0]
const [ createButton, playButton ] = $(gameWrapper, "button")

document.body.append(
    h("div", { className: "modal" })
)

// TODO: SPA page implementation
// TODO: form functionality
// TODO: help & settings modal

// const game = new Game("#game-canvas")
// game.resolution()
// game.listen()