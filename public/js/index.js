import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"
import Game from "./game/Game.js"

const gameWrapper = document.querySelector(".game-wrapper")
const [ createButton, playButton ] = gameWrapper.querySelectorAll("button")

/* <div class="game-wrapper">
            <div class="join-game">
                <h1>🐍 classicsnake.io</h1>
                <input id="name" type="text" placeholder="name" spellcheck="false" />
                <div class="join-options">
                    <button>create room</button>
                    <button>play</button>
                </div>
            </div>
        </div> */
// const game = new Game("#game-canvas")
// game.resolution()
// game.listen()