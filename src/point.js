
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(point) {
    return new Point(this.x + point.x, this.y + point.y)
  }
}

export default Point
