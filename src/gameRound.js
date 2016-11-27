import { bricks } from './data'
import { makePoint, addPoints } from './point'
import { randomItem } from './utils'

export default class GameRound {
  constructor({cols, rows}) {
    this.cols = cols
    this.rows = rows
    this.area = Array.from(Array(rows), () => Array.from(Array(cols), _ => null)),
    this.nextBrick = randomItem(bricks)
    this.currentBrick = null
    this.currentBrickPosition = null
    this.showNextBrick()
  }

  moveLeft() {
    if(this.gameOver) return
    const newPosition = { x: this.currentBrickPosition.x - 1, y: this.currentBrickPosition.y  }
    if(this.canMoveBrickToPosition(this.currentBrick, newPosition)) {
      this.currentBrickPosition = newPosition
    }
  }

  moveRight() {
    if(this.gameOver) return
    const newPosition = { x: this.currentBrickPosition.x + 1, y: this.currentBrickPosition.y  }
    if(this.canMoveBrickToPosition(this.currentBrick, newPosition)) {
      this.currentBrickPosition = newPosition
    }
  }

  moveDown() {
    if(this.gameOver) return
    const newPosition = { x: this.currentBrickPosition.x, y: this.currentBrickPosition.y + 1 }
    if(this.canMoveBrickToPosition(this.currentBrick, newPosition)) {
      this.currentBrickPosition = newPosition
      return true
    }
    else {
      this.detachCurrentBrick()
      this.clearFullRows()
      this.showNextBrick()
      return false
    }
  }

  dropDown() {
    if(this.gameOver) return
    while(this.moveDown()) {}
  }

  rotate() {
    if(this.currentBrick) {
      const newPoints = this.currentBrick.points.map(point => (
        { x: point.y, y: this.currentBrick.size - 1 - point.x }
      ))
      if(newPoints.every(point => this.canMoveBlockToPosition(point, this.currentBrickPosition))) {
        this.currentBrick.points = newPoints
      }
    }
  }

  showNextBrick() {
    const startPosition = makePoint(Math.floor(this.cols / 2) - Math.floor(this.nextBrick.size / 2), 0)
    if(this.canMoveBrickToPosition(this.nextBrick, startPosition)) {
      this.currentBrick = this.nextBrick
      this.currentBrickPosition = startPosition
      this.nextBrick = randomItem(bricks)
    }
    else {
      this.gameOver = true
    }
  }

  detachCurrentBrick() {
    if(this.currentBrick) {
      this.currentBrick.points.forEach(point => {
        const position = addPoints(this.currentBrickPosition, point)
        this.area[position.y][position.x] = this.currentBrick.color
      })
      this.currentBrick = null
    }
  }

  clearFullRows() {
    let y, y2
    for(y in this.area) {
      if(this.area[y].every(value => value)) {
        for(y2 = y-1; y2 >= 0; y2-- && y--) {
          this.area[y] = this.area[y2]
          this.area[y2] = Array.from(Array(this.cols), _ => null)
        }
      }
    }
  }

  canMoveBrickToPosition(brick, position) {
    return brick.points.every(point => this.canMoveBlockToPosition(point, position))
  }

  canMoveBlockToPosition(point, position) {
    var newPosition = addPoints(position, point)
    return this.inArea(newPosition) && this.isPositionEmpty(newPosition)
  }

  inArea(point) {
    return point.x >= 0 && point.x < this.cols && point.y >= 0 && point.y < this.rows
  }

  isPositionEmpty(point) {
    return !this.area[point.y][point.x]
  }
}
