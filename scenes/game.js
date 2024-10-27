import Phaser from 'phaser'
import WebFontFile from './webFontFile'
import {GameBackground, WinScreen, LoseScreen} from '../utilities/sceneKeys'


export default class Game extends Phaser.Scene
{
    init(){
        this.paddleRightVelocity = new Phaser.Math.Vector2(0,0)

        this.leftScore = 0
        this.rightScore = 0
    }
// 1200 600
    preload(){ //load before use to render correctly
        const fonts = new WebFontFile(this.load, 'Press Start 2P')
        this.load.addFile(fonts)
    }

    create(){
        this.scene.run(GameBackground)
        this.scene.sendToBack(GameBackground)

        this.physics.world.setBounds(-100,0,1400, 600)

        this.ball= this.add.circle(600,300,10,0xffffff,1)
        this.physics.add.existing(this.ball)
        this.ball.body.setCircle(10)
        this.ball.body.setBounce(1,1)

        this.ball.body.setCollideWorldBounds(true,1,1)

        const angle = Phaser.Math.Between(0,360) //pick any angle from 0 to 360 and move the ball that way
        const vector = this.physics.velocityFromAngle(angle)  //or velocityFromAngle(angle, 200)  where 200 os the velocity and then we can remove the *5 in setVelocity fct
        

        this.ball.body.setVelocity(vector.x *5, vector.y*5)

        this.paddleLeft = this.add.rectangle(50, 300, 30,100,0xffffff, 1)
        this.physics.add.existing(this.paddleLeft,true)
        this.physics.add.collider(this.paddleLeft,this.ball)

        this.paddleRight = this.add.rectangle(1150,300,30,100,0xffffff, 1)
        this.physics.add.existing(this.paddleRight,true)
        this.physics.add.collider(this.paddleRight, this.ball)

        const scoreStyle = {
            fontSize: 48,
            fontFamily: '"Press Start 2P"'
        }

        this.leftScoreLabel = this.add.text(350, 60, this.leftScore, scoreStyle)
        .setOrigin(0.5,0.5)

        this.rightScoreLabel = this.add.text(850, 60, this.rightScore, scoreStyle)
        .setOrigin(0.5,0.5)

        this.cursors= this.input.keyboard.createCursorKeys()   
        
    }


    update()
    {
        
        this.processPlayerInput()

        this.updateAI()

        this.checkScore()
        
    }

    processPlayerInput(){
        /**@type {Phaser.Physics.Arcade.StaticBody} */
        const bodyLeft=this.paddleLeft.body

        if(this.cursors.up.isDown)
            {
              this.paddleLeft.y -= 10
              bodyLeft.updateFromGameObject()
            }
            else if(this.cursors.down.isDown)
            {
                this.paddleLeft.y += 10 
                bodyLeft.updateFromGameObject()
            }
    }

    updateAI(){
        const diff = this.ball.y - this.paddleRight.y
        if(Math.abs(diff) < 10){
            return
        }

        const aiSpeed=2.5
        if(diff <0){
            //ball is above paddle
            this.paddleRightVelocity.y = -aiSpeed
            if(this.paddleRightVelocity.y < -10){
                this.paddleRightVelocity.y =-10
            }
        }
        else if(diff >0){
            //ball is below paddle
            this.paddleRightVelocity.y = +aiSpeed
            if(this.paddleRightVelocity.y > 10){
                this.paddleRightVelocity.y =10
            }
        }

        this.paddleRight.y+=this.paddleRightVelocity.y
        this.paddleRight.body.updateFromGameObject()
    }

    checkScore(){
        if(this.ball.x < -30){
            //left wins
            this.ball.setPosition(600, 300)
            this.incrementRightScore()
        }
        else if(this.ball.x >1230){
            //right wins
            this.ball.setPosition(600, 300)
            this.incrementLeftScore()
        }

        const maxScore=4 
        if (this.leftScore >= maxScore){
            this.scene.stop(GameBackground)
            this.scene.start(WinScreen) 
        }
        else if (this.rightScore >= maxScore){
            this.scene.stop(GameBackground)
            this.scene.start(LoseScreen) 
        }
    }

    incrementLeftScore(){
        this.leftScore +=1
        this.leftScoreLabel.text = this.leftScore
    }

    incrementRightScore(){
        this.rightScore +=1
        this.rightScoreLabel.text = this.rightScore
    }
}