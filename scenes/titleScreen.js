// 1200 x 600
import Phaser from 'phaser'
import WebFontFile from './webFontFile'
import {Game} from '../utilities/sceneKeys'


export default class TitleScreen extends Phaser.Scene
{
    preload(){
        const fonts = new WebFontFile(this.load, 'Press Start 2P')
        this.load.addFile(fonts)
    }
    create(){
        const title = this.add.text(600, 200, 'Ping Pong',{
            fontSize: 50,
            fontFamily: '"Press Start 2P"'
        })
        .setOrigin(0.5, 0.5)

        this.add.text(600,300, 'Press Space to Start',{
            fontSize: 20,
            fontFamily: '"Press Start 2P"'
        })
        .setOrigin(0.5,0.5)

        this.input.keyboard.once('keydown-SPACE', ()=>{
            this.scene.start(Game)      
        })
    }

}