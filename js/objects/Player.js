let i=0
export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y, jumpSpeed) {
        super(scene, x, y, 'amoeba')
        this.scene = scene

        this.jumpSpeed = jumpSpeed
        this.jumping = false
        this.crashed = false
        this.click = false
        this.scene = scene
        this.setOrigin(0, 0)

        this.gameSceneProportionH =  scene.game.config.height * 0.089
        this.playerScale = Math.floor(this.gameSceneProportionH/this.height)
        this.setScale(this.playerScale)
        scene.playerHeight = this.displayHeight

        scene.physics.world.enable(this);
        this.body.setAllowGravity(false)
        this.body.setCollideWorldBounds(true)
        this.body.onWorldBounds = true // trigger when body touches the border
        this.setDepth(10)
        scene.add.existing(this)
    }
    crash() {
        this.crashed = true
        this.body.setCollideWorldBounds(false)
        this.body.setAllowGravity(false)
        this.body.setVelocityX(140)
        this.body.setVelocityY(140)
        this.setOrigin(0.5, 0.5)
    }

    isAbleToJump(){
        return (this.spacebar.isDown ||this.click) && !this.jumping && !this.crashed
    }

    jump() {
        if(!this.jumping){
            this.jumping = true
            this.jumpEffect.play()
            this.body.setVelocityY(this.jumpSpeed)
            this.anims.play('jump', true)
        }
    }

    disable() {
        this.body.setVelocity(0)
        this.anims.stop()
        this.setVisible(false)
        this.setActive(false)
    }


    isOutOfBounds() {
        return (this.body.y > this.scene.game.config.height || this.body.x > this.scene.game.config.width)
    }

    create() {
        this.keys = this.scene.input.keyboard.createCursorKeys()
        this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.jumpEffect = this.scene.sound.add('jumping')
        this.jumpEffect.setVolume(0.3)

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('amoeba', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1
        })
        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('amoeba', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.play('stop', true)
    }
    update() {
        if (this.isAbleToJump()) {
            this.jump()
        } else if (this.spacebar.isUp && !this.click) {
            this.jumping = false
        }

        if(this.crashed)
            this.setRotation(this.rotation + 0.05)
    }

}