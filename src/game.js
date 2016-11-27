import Rx from 'rxjs/Rx'
import { keyInputStream } from './keys'
import GameAreaRenderer from './gameAreaRenderer'
import GameRound from './gameRound'

const template = `
<div style="display: flex; flex-direction: row;">
<div style="flex: 1"></div>
<div><canvas class="game-canvas"></canvas></div>
<div style="flex: 1"></div>
</div>
`

class Game {
  constructor(container) {
    this.container = container
    this.cols = 10
    this.rows = 20
    this.blockSize = 30

    // Draw UI
    this.container.innerHTML = template
    this.gameCanvas = this.container.querySelector('canvas.game-canvas')
    this.gameCanvas.width = this.cols * this.blockSize
    this.gameCanvas.height = this.rows * this.blockSize
    this.gameAreaRenderer = new GameAreaRenderer(this.gameCanvas, this.blockSize)
  }

  start() {
    this.startNewRound()
    this.bindInputListeners()
    window.requestAnimationFrame(this.render.bind(this))
  }

  bindInputListeners() {
    keyInputStream('ArrowLeft', 100).subscribe(() => this.round.moveLeft())
    keyInputStream('ArrowRight', 100).subscribe(() => this.round.moveRight())
    keyInputStream('ArrowDown', 50).subscribe(() => this.round.moveDown())
    keyInputStream('ArrowUp', 200).subscribe(() => this.round.rotate())
    keyInputStream(' ', 200).subscribe(() => this.round.dropDown())
    keyInputStream('Enter', 200).subscribe(() => this.startNewRound())
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
