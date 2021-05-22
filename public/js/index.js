import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"
import Game from "./game/Game.js"
import { h, $ } from "./utils.js"

const gameWrapper = $(".game-wrapper")[0]
const [ joinButton, playButton ] = $(gameWrapper, "button")

const createGame = () => {
    const canvas = h("canvas", { id: "game-canvas" })
    gameWrapper.appendChild(canvas)

    const game = new Game(canvas)
    game.resolution()
    game.listen()

    return game
}

const listen = () => {
    joinButton.addEventListener("click", () => {
        const displayInput = h("input", { className: "default", placeholder: "snake name" })
        const joinInput = h("input", { className: "default", placeholder: "join code" })
        const button = h("button", { className: "default", onClick: (e) => {
            const snakeName = displayInput.value || "unnamed snake"
            const roomID = joinInput.value

            gameWrapper.innerHTML = ""
            modal.remove()

            const game = createGame()
            game.socket.joinRoom(snakeName, roomID)
        }}, "join")

        const modal = h("div", { className: "modal-wrapper" },
            h("div", { className: "modal" },
                h("div", { className: "icon", onClick: () => modal.remove() },
                    h("ion-icon", { name: "close-outline" })
                ),
                h("h1", {}, "join room"),
                displayInput,
                joinInput,
                button
            )
        )

        document.body.appendChild(modal)
    })

    playButton.addEventListener("click", () => {
        const username = $(gameWrapper, "input")[0].value || "unnamed snake"

        gameWrapper.innerHTML = ""

        const game = createGame()
        game.socket.createRoom(username)
    })
}

listen()

// TODO: game form functionality