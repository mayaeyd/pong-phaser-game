import Phaser from 'phaser'

export default class GameBackground extends Phaser.Scene{

    preload(){

    }

    //w 1200 h 600

    create(){
        this.add.line(600, 300, 0, -300, 0, 300, 0xffffff, 1)
        .setOrigin(0.5, 0)
        .setLineWidth(5,5)

        this.add.circle(600,300,75).setStrokeStyle(5,0xffffff,1)

    }
}