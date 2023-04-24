import ScoreBox from "./ScoreBox.js"
import TubeHole from "./TubeHole.js"

export default class Tube extends Phaser.GameObjects.Sprite {
    constructor(scene, x = 550, y = 0, space = 200,speed=-100) {
        super(scene, x, y, 'pipe', 1)
        scene.tubeGroup.add(this)
        scene.add.existing(this)
        this.scaleX = 3
        if(this.y==0) {
            this.scaleY = [5, 10, 15, 20, 25, 30][Math.floor(Math.random() * 6)]
            new Tube(scene, x, this.displayHeight + space)
            new TubeHole(scene, x,this.displayHeight + space, speed)
            new TubeHole(scene, x,this.displayHeight,speed, true)
            
        }else{
            this.scaleY = 50
        }
        this.setOrigin(1, 0)
        this.createdNewOne = false
        new ScoreBox(scene, this.x, this.y + this.displayHeight, this.displayWidth, space, speed)
        this.body.setVelocityX(speed)
    }
}