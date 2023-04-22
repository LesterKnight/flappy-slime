export default class Title extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 35, 80, 'title')
        scene.physics.world.enable(this);
        this.setOrigin(0, 0)
        this.setScale(1.9)
        this.alpha = 0.9
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