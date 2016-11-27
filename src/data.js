import { makePoint } from './point'
const bricks = [
  // 0XX
  // XX0
  // 000
  {
    color: 'lime',
    size: 3,
    points: [makePoint(1,0), makePoint(2,0), makePoint(0,1), makePoint(1,1)]
  },
  // XX0
  // 0XX
  // 000
  {
    color: 'red',
    size: 3,
    points: [makePoint(0,0), makePoint(1,0), makePoint(1,1), makePoint(2,1)]
  },
  // XX
  // XX
  {
    color: 'yellow',
    size: 2,
    points: [makePoint(0,0), makePoint(1,0), makePoint(0,1), makePoint(1,1)]
  },
  // 0X00
  // 0X00
  // 0X00
  // 0X00
  {
    color: 'cyan',
    size: 4,
    points: [makePoint(1,0), makePoint(1,1), makePoint(1,2), makePoint(1,3)]
  },
  // XXX
  // 0X0
  // 000
  {
    color: 'purple',
    size: 3,
    points: [makePoint(0,0), makePoint(1,0), makePoint(2,0), makePoint(1,1)]
  },
  // XXX
  // X00
  // 000
  {
    color: 'orange',
    size: 3,
    points: [makePoint(0,0), makePoint(1,0), makePoint(2,0), makePoint(0,1)]
  },
  // XXX
  // 00X
  // 000
  {
    color: 'blue',
    size: 3,
    points: [makePoint(0,0), makePoint(1,0), makePoint(2,0), makePoint(2,1)]
  },

]

export { bricks }
