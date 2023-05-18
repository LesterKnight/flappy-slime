import ScoreBox from "./ScoreBox.js"
import TubeHole from "./TubeHole.js"
export default class Tube extends Phaser.GameObjects.Sprite {
    constructor(scene, x = 580, y = 0, space = 0, speed = -100) {
        super(scene, x, y, 'pipeBase')
        scene.tubeGroup.add(this)
        scene.add.existing(this)
        this.gameSceneProportionH = scene.game.config.height * 0.09 //pega a altura da tela e divide por 10
        this.pipeHeight = this.gameSceneProportionH / this.height//pega a altura da tela dividida por 10 e divide pela a altura atual do objeto
        this.playerScale = Math.floor(this.pipeHeight)  //arredonda o valor, agora sabemos que para dar um "quadrado" da tela precisamos de x vezes o objeto
        this.setScale(this.playerScale) //aumentamos o objeto para que fique ocupando um espaço x da tela
        scene.TubeHeight = this.displayHeight
        this.tubeTotalAmmount = Math.floor(scene.game.config.height / scene.TubeHeight) - 1 //index zero

        if (this.y == 0) {
            
            let holeSize = 3
            let spacing = 1
            this.holePossibleLocations = this.tubeTotalAmmount - (spacing * 2) - holeSize //-1 porque o random usa o zero
            let holeLocation = Math.floor(Math.random() * this.holePossibleLocations) + spacing
            let scoreA = 0
            let scoreB = 0

            for (let i = 0; i < this.tubeTotalAmmount; i++) {
                if (i < holeLocation || i >= holeLocation + holeSize) {//+1 to second tube hole
                    if (i + 1 == holeLocation){
                        let t =  new TubeHole(scene, x, scene.TubeHeight + scene.TubeHeight * i, speed,true).setScale(this.playerScale).setOrigin(1, 0)
                        t.x+=(t.displayWidth - this.displayWidth)/2
                        scoreA = t.y
                    }
                       
                    else if (i - holeSize == holeLocation){
                        let t = new TubeHole(scene, x, scene.TubeHeight + scene.TubeHeight * i, speed).setScale(this.playerScale).setOrigin(1, 0)
                        t.x+=(t.displayWidth - this.displayWidth)/2
                        scoreB = t.y
                    }
                    else
                        new Tube(scene, x, scene.TubeHeight + scene.TubeHeight * i)
                }
            }
            new ScoreBox(scene, this.x, scoreA, 5, scoreB - scoreA + scene.TubeHeight, speed)
        }
        this.setOrigin(1, 0)
        this.body.setVelocityX(speed)
    }
}