import config from './config'

export default class BrickRenderer {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d')
  }

  renderBrick(brick, brickPosition) {
    brick.points.forEach(point => {
      const position = brickPosition.add(point)
      this.renderBlock(position, brick.color)
    })
  }

  renderBlock(position, color) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(position.x * config.blockSize + 1, position.y * config.blockSize + 1, config.blockSize - 2, config.blockSize - 2)
  }

}
