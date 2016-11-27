import { addPoints } from './point'

class GameAreaRenderer {
  constructor(canvas, blockSize) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")
    this.blockSize = blockSize
  }

  clearCanvas() {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
  }

  render(gameRound) {
    this.clearCanvas()
    this.renderBlocks(gameRound)
    this.renderCurrentBrick(gameRound)
    this.renderGameOver(gameRound)
  }

  renderBlocks({area}) {
    let x, y
    for(y in area) {
      for(x in area[y]) {
        const color = area[y][x]
        if(color) {
          this.renderBlock({x,y}, color)
        }
      }
    }
  }

  renderCurrentBrick({currentBrick, currentBrickPosition}) {
    if(currentBrick) {
      currentBrick.shape.points.forEach(point => {
        const position = addPoints(currentBrickPosition, point)
        this.renderBlock(position, currentBrick.color)
      })
    }
  }

  renderBlock(position, color) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(position.x * this.blockSize, position.y * this.blockSize, this.blockSize, this.blockSize)
  }

  renderGameOver({gameOver}) {
    if(gameOver) {
      this.ctx.font = "32px serif";
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = 'white'
      this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2)
      this.ctx.font = "18px serif";
      this.ctx.fillText("PRESS ENTER FOR NEW GAME", this.canvas.width / 2, this.canvas.height / 2 + 50)
    }
  }
}

export default GameAreaRenderer
