import Load from './scene/Load.js'
import Game from './scene/Game.js'

const config = {
    type: Phaser.AUTO,
    width:480,
    height:800,
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