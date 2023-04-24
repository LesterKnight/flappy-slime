import Title from "../objects/Title.js"
import Player from "../objects/Player.js"
import Tube from "../objects/Tube.js"

export default class Game extends Phaser.Scene {

    constructor() {
        super({
            key: 'GameScene'
        })
    }

    gameOverAnimation() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        this.tweens.add({
            targets: graphics,
            alpha: 0,
            duration: 500,
            ease: 'Power1', // curva de animação
            onComplete: () => graphics.destroy()
        })

        this.musicMain.stop()
        this.musicGameOver.play()
        this.tubeGroup.setVelocityX(0)
        this.scoreGroup.setVelocityX(0)
        this.tileBackground.setTexture('bg4')

        if (this.showHighScore)
            this.newHighScore.setVisible(true)
    }

    create() {
        this.physics.world.setBounds(0, 0, 480, 800)
        this.title = new Title(this)
        this.player = new Player(this)
        this.player.create()

        this.tubeGroup = this.physics.add.group({ immovable: false, allowGravity: false })
        this.scoreGroup = this.physics.add.group({ immovable: false, allowGravity: false })
        this.tubeDistance = 180
        this.score = 0

        this.musicMain = this.sound.add('coffin', { loop: true })
        this.musicMain.setVolume(0.8)
        this.musicGameOver = this.sound.add('gameover', { loop: true })
        this.musicGameOver.setVolume(0.5)
        this.soundCoin = this.sound.add('coin', { loop: false })
        this.soundCoin.setVolume(0.2)
 
        const backgrounds = ['bg0', 'bg1', 'bg2', 'bg3']
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        this.tileBackground = this.add.tileSprite(0, 0, 320, 224, backgrounds[randomIndex])
        this.tileBackground.setOrigin(0, 0)
        this.tileBackground.setScale(3.6)
        this.tileGround = this.add.tileSprite(0, 750, 480, 30, 'gnd')
        this.tileGround.setOrigin(0, 0)
        this.tileGround.setScale(2)
        this.tileGround.setDepth(9)
        
        const colors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x8b00ff]
        const tintSpeed = 100
        let colorIndex = 0
        
        this.time.addEvent({
            delay: tintSpeed,
            loop: true,
            callback: () => {
                if (this.player.crashed) {
                    this.player.setTint(colors[colorIndex])
                    colorIndex = (colorIndex + 1) % colors.length
                    if(this.showHighScore){
                        this.scoreText.setTint(colors[colorIndex])
                        this.newHighScore.setTint(colors[colorIndex])
                    }
                    
                }
            }
        })

        this.player.body.world.on('worldbounds', function (body) {
            if (body.gameObject === this) {
                if (!this.crashed) {
                    this.crash()
                    this.scene.gameOverAnimation()
                }
            }
        }, this.player)

        this.physics.add.overlap(this.tubeGroup, this.player, handleCollision.bind(this))
        function handleCollision(element1, element2) {
            if (!element1.crashed) {
                element1.crash()
                this.gameOverAnimation()
            }
        }
        
        this.scoreText = this.add.text(220, 16, `Hi Score: ${this.game.highScore}`, this.game.fontStyleMini)
        this.newHighScore = this.add.text(90, 100, 'NEW HIGH SCORE!', this.game.fontStyle)
        this.showHighScore = false

        this.scoreText.setDepth(11)
        this.newHighScore.setDepth(11)
        this.newHighScore.setVisible(false)

        this.physics.add.overlap(this.scoreGroup, this.player, handleCoins.bind(this))
        function handleCoins(element1, element2) {
            if (element1.x >= element2.x - 10 && !element1.crashed) {
                element2.destroy()
                this.score++

                if (this.game.highScore < this.score) {
                    this.showHighScore = true
                    this.game.highScore = this.score
                }

                this.scoreText.setText(this.score)
                this.soundCoin.play()
            }

        }

        this.input.on('pointerdown', () => {
            this.player.click = true
        })
        this.input.on('pointerup', () => {
            this.player.click = false
        })
    }

    update() {
        this.player.update()
        this.tileBackground.tilePositionX += 0.3
        if (!this.player.crashed)
            this.tileGround.tilePositionX += 0.835

        if ((this.player.spacebar.isDown || this.player.click) && !this.player.crashed && !this.run) {//START GAME
            this.run = true
            this.scoreText.setText(this.score)
            this.scoreText.setVisible(true)
            this.player.body.setAllowGravity(true)
            this.title.destroy()
            this.musicMain.play()

        }

        if (this.player.isOutOfBounds() && this.player.crashed) {
            this.run = false
            this.musicGameOver.stop()
            this.player.disable()
            this.scene.restart()
        }

        let tubes = this.tubeGroup.getChildren()
        if (tubes.length == 0 && this.run)
            new Tube(this, 580, 0)

        tubes.forEach(function (childTube) {
            if (childTube.x < 0) {
                childTube.destroy()
            }
            else if (
                childTube.x - childTube.displayWidth < this.tubeDistance &&
                !childTube.createdNewOne &&
                childTube.y == 0 &&
                !this.player.crashed
            ) {
                new Tube(this)
                childTube.createdNewOne = true
            }
        }, this)
    }
}