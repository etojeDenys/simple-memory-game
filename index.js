import {MatchGrid} from "./classes/matchGrid.js";


function app() {
    const EMOJIS_ARRAY = ["😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"]

    const gameDiv = document.querySelector('.game')

    const game = new MatchGrid(gameDiv,'100px','50px',2,3, 60_000_000, {fontSize:'50px'},EMOJIS_ARRAY.slice(0,3))
    game.render()

    const start = document.querySelector('.start')
    const end = document.querySelector('.end')

    start.onclick = game.start.bind(game)
    end.onclick = game.end.bind(game)
}

app()

