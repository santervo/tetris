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
    this.renderBlocks(gameRound.area)
    if(gameRound.currentBrick) {
      this.renderBrick(gameRound.currentBrick, gameRound.currentBrickPosition)
    }
    if(gameRound.gameOver) {
      this.renderGameOver()
    }
  }

  renderBlocks(area) {
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

  renderBrick(brick, brickPosition) {
    brick.points.forEach(point => {
      const position = brickPosition.add(point)
      this.renderBlock(position, brick.color)
    })
  }

  renderBlock(position, color) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(position.x * this.blockSize + 1, position.y * this.blockSize + 1, this.blockSize - 2, this.blockSize - 2)
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

export default GameAreaRenderer
