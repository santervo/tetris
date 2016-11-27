import Rx from 'rxjs/Rx'
import { emitPeriodicallyOnKeydown, emitOnceOnKeydown } from './keys'
import GameView from './gameView'
import NextBrickView from './nextBrickView'
import GameRound from './gameRound'
import config from './config'

const template = require('./template.html')

class Game {
  constructor(container) {
    this.container = container
  }

  start() {
    this.drawUi()
    this.startNewRound()
    this.bindInputListeners()
    this.startGravity()
    window.requestAnimationFrame(this.render.bind(this))
  }

  drawUi() {
    this.container.innerHTML = template
    this.gameView = new GameView(this.container.querySelector('canvas.game-canvas'))
    this.nextBrickView = new NextBrickView(this.container.querySelector('canvas.next-brick-canvas'))
  }

  bindInputListeners() {
    emitPeriodicallyOnKeydown('ArrowLeft', 50, 200).subscribe(() => this.round.moveLeft())
    emitPeriodicallyOnKeydown('ArrowRight', 50, 200).subscribe(() => this.round.moveRight())
    emitPeriodicallyOnKeydown('ArrowDown', 50).subscribe(() => this.round.moveDown())
    emitPeriodicallyOnKeydown('ArrowUp', 200).subscribe(() => this.round.rotate())
    emitOnceOnKeydown(' ').subscribe(() => this.round.dropDown())
    emitOnceOnKeydown('Enter').subscribe(() => this.startNewRound())
  }

  startGravity() {
    Rx.Observable.interval(300).subscribe(() => this.round.moveDown())
  }

  startNewRound() {
    this.round = new GameRound(config)
  }

  render() {
    this.gameView.render(this.round)
    this.nextBrickView.render(this.round.nextBrick)
    window.requestAnimationFrame(this.render.bind(this))
  }
}

export { Game }
