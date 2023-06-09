export default class Load extends Phaser.Scene {
    constructor(){
        super({
            key:'PreLoadScene'
        })
    }
    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
    preload(){
        this.load.on('complete',()=>{
            this.scene.start('GameScene')
        })
        this.load.image('bg0', 'images/bg0.png')
        this.load.image('bg4', 'images/bg4.png')
        this.load.image('gnd', 'images/ground.png')
        this.load.image('bg4', 'images/bg4.png')
        this.load.image('pipe', 'images/pipe.png')
        this.load.image('pipeBase', 'images/pipeBase.png')

        this.loadFont("super-mario-world-superbig", '../font/super-mario-world-superbig.ttf');

        this.load.image('title', 'images/title.png' )
        this.load.audio('coffin','music/gameloop.wav')
        this.load.audio('gameover','music/gameover.wav')
        this.load.audio('intro','music/main.wav')
        this.load.audio('jumping','sfx/jump.mp3')
        this.load.audio('coin','sfx/coin.mp3')
        

        this.load.spritesheet('amoeba', 'images/amoeba.png', {
            frameWidth: 22,
            frameHeight: 18,
            spacing: 1,
            margin:1

        })

        this.game.fontStyle = {
            fontFamily: 'super-mario-world-superbig',
            fontSize: 48,
            stroke: '#000000',
            strokeThickness: 6,
        }
        this.game.fontStyleMini = {
            fontFamily: 'super-mario-world-superbig',
            fontSize: 36,
            stroke: '#000000',
            strokeThickness: 6,
        }
        this.game.highScore = 0
        
    }
    create(){
        
    }
    update(){

    }
}