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
        this.load.image('bg0', 'images/bg0.png')
        this.load.image('bg1', 'images/bg1.png')
        this.load.image('bg2', 'images/bg2.png')
        this.load.image('bg3', 'images/bg3.png')
        this.load.image('bg4', 'images/bg4.png')
        this.load.image('gnd', 'images/ground.png')



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