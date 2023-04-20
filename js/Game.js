var gameOver = false
export default class Game extends Phaser.Scene {

    constructor() {
        super({
            key: 'GameScene'
        })
    }

    create() {

        let screenWidth = this.cameras.main.width;
        let screenHeight = this.cameras.main.height;

        this.musicMain = this.sound.add('coffin', { loop: true })
        this.musicGameOver = this.sound.add('gameover', { loop: true })
        this.jumpEffect = this.sound.add('jumping')
        this.keys = this.input.keyboard.createCursorKeys()
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.tileSprite = this.add.tileSprite(0, 0, 320, 224, 'background').setOrigin(0, 0).setScale(3.6)
        this.title = this.physics.add.sprite(35, 80, 'title').setOrigin(0, 0).setScale(1.9)
        this.title.alpha = 0.9
        this.title.setDepth(10)


        this.title.body.setAllowGravity(false)//criacao

        this.titleAnimation = this.tweens.add({
            targets: this.title,
            y: [180, 160],
            duration: 3000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        })


        this.player = this.physics.add.sprite(170, 300, 'amoeba').setOrigin(0, 0).setScale(3.6)
        this.player.playerName = 'flappy slime'
        this.player.body.setAllowGravity(false)//criacao
        this.player.anims.play('stop', true)
        this.physics.world.setBounds(0, 0, 480, 800)
        this.player.setCollideWorldBounds(true)

        this.player.body.onWorldBounds = true // trigger when body touches the border

        this.player.body.world.on('worldbounds', function (body) {
            if (body.gameObject === this) {
                gameOver = true
            }
        }, this.player)//player becomes this in the context



        let pipeInitialX = 576
        let pipeY = [5, 10, 15, 20, 25, 30][Math.floor(Math.random() * 6)]
        let space = 240
        let pipeSpeed = -100
        let pipe = this.add.sprite(pipeInitialX, 0, 'pipe').setOrigin(1, 0)
        pipe.setFrame(1)
        pipe.scaleX = 3
        pipe.scaleY = pipeY
        pipe.pipeType = 'up'
        pipe.createdNewOne = false

        let pipe2 = this.add.sprite(pipeInitialX, pipe.y + pipe.displayHeight + space, 'pipe').setOrigin(1, 0)
        pipe2.setFrame(1)
        pipe2.scaleX = 3
        pipe2.scaleY = 40

        this.pipeGroup = this.physics.add.group({ immovable: false, allowGravity: false })
        this.pipeGroup.addMultiple([pipe, pipe2])




        let colors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x8b00ff];
        let tintSpeed = 100; // em milissegundos

        // inicia o loop para mudar a cor do sprite
        let colorIndex = 0;
        this.time.addEvent({
            delay: tintSpeed,
            loop: true,
            callback: () => {
                if (gameOver) {
                    this.player.setTint(colors[colorIndex]);
                    colorIndex = (colorIndex + 1) % colors.length;
                }
            }
        })


        this.physics.add.overlap(this.pipeGroup, this.player, handleCollision);

        function handleCollision(element1, element2) {
            //console.log(element1.playerName)
            //console.log(element2.pipeType)
            gameOver = true
        }


    }
    update() {



        this.pipeGroup.getChildren().forEach(function (childPipe) {

            if (childPipe.x < 0) {
                childPipe.destroy()

            }
            else if (
                (childPipe.x - childPipe.displayWidth) < 200 &&
                !childPipe.createdNewOne &&
                childPipe.pipeType == 'up'
            ) {
                //childPipe.destroy()

                childPipe.createdNewOne = true
                //PARAMS
                let pipeInitialX = 576
                let pipeY = [5, 10, 15, 20, 25, 30][Math.floor(Math.random() * 6)]
                let space = 240

                let pipe = this.add.sprite(pipeInitialX, 0, 'pipe').setOrigin(1, 0)
                pipe.setFrame(1)
                pipe.scaleX = 3
                pipe.scaleY = pipeY
                pipe.pipeType = 'up'


                let pipe2 = this.add.sprite(pipeInitialX, pipe.y + pipe.displayHeight + space, 'pipe').setOrigin(1, 0)
                pipe2.setFrame(1)
                pipe2.scaleX = 3
                pipe2.scaleY = 40

                this.pipeGroup.addMultiple([pipe, pipe2])
                this.pipeGroup.setVelocityX(-100)

            }

        }, this)


        if (this.spacebar.isDown && !this.player.body.allowGravity && !gameOver) {//START GAME
            this.pipeGroup.setVelocityX(-100)
            this.player.body.setAllowGravity(true)


            this.title.setVisible(false)
            this.musicMain.play()
        }

        if (!gameOver) {
            this.tileSprite.tilePositionX += 0.3
        }
        else {

            if (this.musicMain.isPlaying) {
                this.musicMain.stop()
                this.musicGameOver.volume = 0.6
                this.musicGameOver.play()
            }

            this.player.anims.stop()
            this.player.setCollideWorldBounds(false)
            this.player.setActive(false)

            //this.player.setVisible(false)
            this.player.body.setAllowGravity(false)
            this.player.setVelocityX(140)
            this.player.setVelocityY(140)
            this.player.setOrigin(0.5, 0.5)
            this.player.setRotation(this.player.rotation + 0.05)

            if (this.player.body.y > 800 || this.player.body.x > 480) {
                //    this.physics.pause()
                gameOver = false
                this.musicMain.stop()
                this.musicGameOver.stop()
                this.scene.restart()
            }
            this.player.setDepth(10);
            this.pipeGroup.setVelocityX(0)
        }








        let jumpSpeed = -900
        if (this.spacebar.isDown && !this.player.jumping && !gameOver) {
            this.player.jumping = true
            this.jumpEffect.play()
            this.player.setVelocityY(jumpSpeed)
            /*
            setTimeout(() => {
                this.player.jumping = false;
              }, 100)
              */
            this.player.anims.play('jump', true)
        } else if (this.spacebar.isUp) {
            this.player.jumping = false
        }
    }
}