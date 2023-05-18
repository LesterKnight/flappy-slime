
export default class TubeHole extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, speed, invert) {
        super(scene, x, y, 'pipe', 0)
        scene.tubeGroup.add(this)
        this.body.allowGravity = false;
        if (invert) {
            this.flipY = true
        }
        this.body.setVelocityX(speed)
        scene.add.existing(this)
    }
}