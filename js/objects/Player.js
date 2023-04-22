export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, jumpSpeed = -900) {
        super(scene, 170, 300, 'amoeba')
        scene.physics.world.enable(this);
        this.jumpSpeed = jumpSpeed
        this.jumping = false
        this.crashed = false
        this.scene = scene
        this.setOrigin(0, 0)
        this.setScale(3)
        scene.physics.world.enable(this);
        this.body.setAllowGravity(false)
        this.body.setCollideWorldBounds(true)
        this.body.onWorldBounds = true // trigger when body touches the border
/*
        this.body.world.on('worldbounds', function (body) {
            if (body.gameObject === this) {
                if (!this.crashed){
                    this.crash()
                    this.scene.gameOverAnimation()
                }
            }
        }, this)//player becomes this in the context
*/
        scene.add.existing(this)
    }
    crash() {
        this.crashed = true
        this.setDepth(10);
        this.body.setCollideWorldBounds(false)
        this.body.setAllowGravity(false)
        this.body.setVelocityX(140)
        this.body.setVelocityY(140)
        this.setOrigin(0.5, 0.5)
        this.setRotation(this.rotation + 0.05)
    }

    disable(){
        this.body.setVelocity(0)
        this.anims.stop()
        this.setVisible(false)
        this.setActive(false)
    }


    isOutOfBounds(){
        return (this.body.y > 800 || this.body.x > 480) 
    }

    create() {
        this.keys = this.scene.input.keyboard.createCursorKeys()
        this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.jumpEffect = this.scene.sound.add('jumping')

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('amoeba', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: 1
        })

        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('amoeba', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.play('stop', true)
    }
    update() {
        if (this.spacebar.isDown && !this.jumping && !this.crashed) {
            this.jumping = true
            this.jumpEffect.play()
            this.body.setVelocityY(this.jumpSpeed)
            this.anims.play('jump', true)
        } else if (this.spacebar.isUp) {
            this.jumping = false
        }
    }

}