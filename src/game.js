import Rx from 'rxjs/Rx'
import { emitPeriodicallyOnKeydown, emitOnceOnKeydown } from './keys'
import GameAreaRenderer from './gameAreaRenderer'
import GameRound from './gameRound'

const template = require('./template.html')

class Game {
  constructor(container) {
    this.container = container
    this.cols = 10
    this.rows = 20
    this.blockSize = 30
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
    this.gameCanvas = this.container.querySelector('canvas.game-canvas')
    this.gameCanvas.width = this.cols * this.blockSize
    this.gameCanvas.height = this.rows * this.blockSize

    this.nextBrickCanvas = this.container.querySelector('canvas.next-brick-canvas')
    this.nextBrickCanvas.width = this.nextBrickCanvas.height = 4 * this.blockSize

    this.gameAreaRenderer = new GameAreaRenderer(this.gameCanvas, this.blockSize)
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
    this.round = new GameRound({ cols: this.cols, rows: this.rows })
  }

  render() {
    this.gameAreaRenderer.render(this.round)
    window.requestAnimationFrame(this.render.bind(this))
  }
}

export { Game }
