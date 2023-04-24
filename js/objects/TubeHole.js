
export default class TubeHole extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, speed, invert) {
        super(scene, x, y, 'pipe', 0)

        scene.tubeGroup.add(this)
        this.setOrigin(1, 1)

        this.body.allowGravity = false;
        this.setScale(3)
        //this.setAlpha(0.1)
        if (invert) {
            this.flipY = true
        }
        else {
            this.y += this.displayHeight
        }
        this.body.setVelocityX(speed)
        scene.add.existing(this)
    }
}