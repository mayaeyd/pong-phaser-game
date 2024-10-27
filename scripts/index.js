import Phaser, { Physics } from 'phaser'
import TitleScreen from '../scenes/titleScreen'
import Game from '../scenes/game'
import GameBackground from '../scenes/gameBackground'
import WinScreen from '../scenes/win'
import LoseScreen from '../scenes/lose'
import * as SceneKeys from '../utilities/sceneKeys'

const config={
    width: 1200,
    height: 600,
    type: Phaser.AUTO,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y:0},
            debug:true
        }
    }
}

const game=new Phaser.Game(config);
//             key for class TitleScreen
game.scene.add(SceneKeys.TitleScreen, TitleScreen)
game.scene.add(SceneKeys.Game,Game)
game.scene.add(SceneKeys.GameBackground, GameBackground)
game.scene.add(SceneKeys.WinScreen, WinScreen)
game.scene.add(SceneKeys.LoseScreen, LoseScreen)

//use key to start
game.scene.start(SceneKeys.TitleScreen)
//game.scene.start(SceneKeys.Game)
