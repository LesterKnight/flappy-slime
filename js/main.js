import Load from './scene/Load.js'
import Game from './scene/Game.js'

let width
let height
function isMobileBrowser() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobileBrowser()) {
    width = window.innerWidth
    height = window.innerHeight
} else {
    width = 480
    height = 800
}

const config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    parent:'page',
    scene:[
        Load,
        Game
    ],
    physics: {
        default: 'arcade',
        arcade:{
            gravity:{
                y: 5000
            },
            debug: false
        }
    }
}

const game = new Phaser.Game(config)