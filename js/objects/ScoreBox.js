export default class ScoreBox extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height,speed) {
        super(scene, x, y, width, height)
        scene.add.existing(this.setOrigin(1, 0))
        this.setFillStyle(0x000000, 0.0)
        scene.scoreGroup.add(this)
        scene.add.existing(this)
        this.body.setVelocityX(speed)
      }
}