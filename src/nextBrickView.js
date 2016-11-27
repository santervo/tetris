import BrickRenderer from './brickRenderer'
import Point from './point'
import config from './config'

export default class NextBrickView {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")
    this.canvas.width = this.canvas.height = 4 * config.blockSize
    this.nextBrickRenderer = new BrickRenderer(this.canvas, config)
  }

  render(nextBrick) {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    this.nextBrickRenderer.renderBrick(nextBrick, new Point(0,0))
  }
}
