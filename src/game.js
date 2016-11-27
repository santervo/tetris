import Rx from 'rxjs/Rx'

import { makePoint, addPoints } from './point'
import { randomItem } from './utils'
import GameAreaRenderer from './gameAreaRenderer'
import GameRound from './gameRound'

const template = `
<div style="display: flex; flex-direction: row;">
<div style="flex: 1"></div>
<div><canvas class="game-canvas"></canvas></div>
<div style="flex: 1"></div>
</div>
`

const keydowns$ = Rx.Observable.fromEvent(window, 'keydown').share()
const keyups$ = Rx.Observable.fromEvent(window, 'keyup').share()
const keypresses$ = Rx.Observable.fromEvent(window, 'keypress').share()

// Creates stream that ticks every 200ms while key is down
const keyInputStream = (key, interval) => {
  interval = interval || 200
  const downs$ = keydowns$.filter(evt => evt.key === key)
  const ups$ = keyups$.filter(evt => evt.key === key)

  return downs$.throttle(_ => ups$).mergeMap(_ =>
    Rx.Observable.interval(interval).takeUntil(ups$).startWith(1)
  ).map(_ => key)
}

class Game {
  constructor(container) {
    this.container = container
    this.cols = 10
    this.rows = 20
    this.blockSize = 30

    // Draw UI
    this.container.innerHTML = template
    this.gameCanvas = this.container.querySelector('canvas.game-canvas')
    this.startNewButton = this.container.querySelector('button.start-new-button')

    this.initGameCanvas()
    keyInputStream('ArrowLeft').subscribe(() => this.round.moveLeft())
    keyInputStream('ArrowRight').subscribe(() => this.round.moveRight())
    keyInputStream('ArrowDown', 50).subscribe(() => this.round.moveDown())
    keyInputStream('ArrowUp').subscribe(() => this.round.rotate())
    keyInputStream(' ').subscribe(() => this.round.dropDown())
    keyInputStream('Enter').subscribe(() => this.startNewRound())
    Rx.Observable.interval(300).subscribe(() => this.round.moveDown())
  }

  initGameCanvas() {
    this.gameCanvas.width = this.cols * this.blockSize
    this.gameCanvas.height = this.rows * this.blockSize
    this.gameAreaRenderer = new GameAreaRenderer(this.gameCanvas, this.blockSize)
  }

  start() {
    this.startNewRound()
    window.requestAnimationFrame(this.render.bind(this))
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
