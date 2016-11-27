import BrickRenderer from './brickRenderer'
import config from './config'

export default class GameView {
  constructor(canvas) {
    this.canvas = canvas
    this.canvas.width = config.cols * config.blockSize
    this.canvas.height = config.rows * config.blockSize
    this.ctx = this.canvas.getContext("2d")
    this.brickRenderer = new BrickRenderer(canvas)
  }

  render(gameRound) {
    this.clearCanvas()
    this.renderBlocks(gameRound.area)
    if(gameRound.currentBrick) {
      this.brickRenderer.renderBrick(gameRound.currentBrick, gameRound.currentBrickPosition)
    }
    if(gameRound.gameOver) {
      this.renderGameOver()
    }
  }

  clearCanvas() {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
  }

  renderBlocks(area) {
    let x, y
    for(y in area) {
      for(x in area[y]) {
        const color = area[y][x]
        if(color) {
          this.brickRenderer.renderBlock({x,y}, color)
        }
      }
    }
  }

  renderGameOver() {
    this.ctx.font = "32px serif";
    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2)
    this.ctx.font = "18px serif";
    this.ctx.fillText("PRESS ENTER FOR NEW GAME", this.canvas.width / 2, this.canvas.height / 2 + 50)
  }
}
