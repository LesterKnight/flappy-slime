export default class Title extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'title')
        scene.physics.world.enable(this);
        this.setOrigin(0, 0)
        const newWidth =  scene.game.config.width*0.9
        const newMargin = scene.game.config.width*0.05
        this.setScale(newWidth/this.width)
        this.x = newMargin
        this.alpha = 1
        this.setDepth(10)
        this.body.setAllowGravity(false)
        scene.add.existing(this)
        scene.titleAnimation = scene.tweens.add({
            targets: this,
            y: [180, 160],
            duration: 3000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        })
    }
}