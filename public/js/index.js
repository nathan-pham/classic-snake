import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"
import Game from "./game/Game.js"
import { h, $ } from "./utils.js"

const gameWrapper = $(".game-wrapper")[0]
const [ settingsButton, helpButton ] = $("#help .icon")
const [ joinButton, playButton ] = $(gameWrapper, "button")

const createGame = () => {
    const canvas = h("canvas", { id: "game-canvas" })
    gameWrapper.appendChild(canvas)

    const game = new Game(canvas)
    game.resolution()
    game.listen()

    settingsButton.remove()
    helpButton.remove()

    return game
}

const createModal = (title, ...children) => {
    const modal = h("div", { className: "modal-wrapper" },
        h("div", { className: "modal" },
            h("div", { className: "icon", onClick: () => modal.remove() },
                h("ion-icon", { name: "close-outline" })
            ),
            h("h1", {}, title || "modal"),
            ...children
        )
    )

    return modal
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

        const modal = createModal("join room",
            displayInput,
            joinInput,
            button
        )
        document.body.appendChild(modal)
    })

    playButton.addEventListener("click", () => {
        const username = $(gameWrapper, "input")[0].value || "unnamed snake"

        gameWrapper.innerHTML = ""

        const game = createGame()
        game.socket.createRoom(username)
    })

    settingsButton.addEventListener("click", () => {
        const modal = createModal("settings",
            h("p", {}, "No settings available yet.")
        )
        document.body.appendChild(modal)
    })

    helpButton.addEventListener("click", () => {
        const link = (title, href) => (
            h("a", { href, target: "__blank", rel: "noreferer" }, title)
        )

        const period = () => (
            h("span", {}, ". ")
        )
        
        const modal = createModal("about",
            h("p", {}, "classicsnake.io is a multiplayer snake game developed by ",
                link("Nathan Pham", "https://nathanpham.me"),
                period(),
                "This project is open source on ",
                link("Github", "https://github.com/nathan-pham/classic-snake"),
                period()
            )
        )
        document.body.appendChild(modal)
    })
}

listen()