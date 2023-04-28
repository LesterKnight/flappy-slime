import ScoreBox from "./ScoreBox.js"
import TubeHole from "./TubeHole.js"

export default class Tube extends Phaser.GameObjects.Sprite {
    constructor(scene, x = 580, y = 0, space = 0,speed=-100) {
        super(scene, x, y, 'pipe', 1)
        scene.tubeGroup.add(this)
        scene.add.existing(this)
        this.scaleX = 3
        if(this.y==0) {
            const tubeOptions = []
            for(let i=2;i<6;i++)
              tubeOptions.push(i*scene.game.config.height/10)
              const newY = tubeOptions[Math.floor(Math.random() * tubeOptions.length)]
              const newScale = newY/this.height
              this.scaleY = newScale
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