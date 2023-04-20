import Load from './Load.js'
import Game from './Game.js'

const config = {
    type: Phaser.AUTO,
    width:480,
    height:800,
    parent:'page',
    scene:[
        Load,
        Game
    ],
    //fps: 500,
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