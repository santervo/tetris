import Point from './point'

export default class Brick {
  constructor({color, size, points}) {
    this.color = color
    this.size = size
    this.points = points
  }
}

Brick.randomBrick = () => new Brick(Brick.configs[Math.floor(Math.random()*Brick.configs.length)])

Brick.configs = [
  // 0XX
  // XX0
  // 000
  {
    color: 'lime',
    size: 3,
    points: [new Point(1,0), new Point(2,0), new Point(0,1), new Point(1,1)]
  },
  // XX0
  // 0XX
  // 000
  {
    color: 'red',
    size: 3,
    points: [new Point(0,0), new Point(1,0), new Point(1,1), new Point(2,1)]
  },
  // XX
  // XX
  {
    color: 'yellow',
    size: 2,
    points: [new Point(0,0), new Point(1,0), new Point(0,1), new Point(1,1)]
  },
  // 0X00
  // 0X00
  // 0X00
  // 0X00
  {
    color: 'cyan',
    size: 4,
    points: [new Point(1,0), new Point(1,1), new Point(1,2), new Point(1,3)]
  },
  // XXX
  // 0X0
  // 000
  {
    color: 'purple',
    size: 3,
    points: [new Point(0,0), new Point(1,0), new Point(2,0), new Point(1,1)]
  },
  // XXX
  // X00
  // 000
  {
    color: 'orange',
    size: 3,
    points: [new Point(0,0), new Point(1,0), new Point(2,0), new Point(0,1)]
  },
  // XXX
  // 00X
  // 000
  {
    color: 'blue',
    size: 3,
    points: [new Point(0,0), new Point(1,0), new Point(2,0), new Point(2,1)]
  }
]
