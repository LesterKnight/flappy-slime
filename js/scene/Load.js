export default class Load extends Phaser.Scene {
    constructor(){
        super({
            key:'PreLoadScene'
        })
    }
    preload(){
        this.load.on('complete',()=>{
            this.scene.start('GameScene')
        })
        this.load.image('background', 'images/bg000.gif' )
        this.load.image('title', 'images/title.png' )
        this.load.audio('coffin','music/coffin.mp3')
        this.load.audio('gameover','music/gameover.mp3')
        this.load.audio('jumping','sfx/jump.mp3')
        this.load.audio('coin','sfx/coin.mp3')
        this.load.spritesheet('pipe', 'images/pipe.png',{ frameWidth: 32, frameHeight: 16 } )//endFrame optional
        this.load.spritesheet('amoeba', 'images/amoeba.png', {
            frameWidth: 22,
            frameHeight: 18,
            spacing: 1,
            margin:1

        })
    }
    create(){
        
    }
    update(){

    }
}