import { makePoint } from './point'
const shapes = [
  // 0XX
  // XX0
  // 000
  {
    size: 3,
    points: [makePoint(1,0), makePoint(2,0), makePoint(0,1), makePoint(1,1)]
  },
  // XX0
  // 0XX
  // 000
  {
    size: 3,
    points: [makePoint(0,0), makePoint(1,0), makePoint(1,1), makePoint(2,1)]
  },
  // XX
  // XX
  {
    size: 2,
    points: [makePoint(0,0), makePoint(1,0), makePoint(0,1), makePoint(1,1)]
  },
  // 0X00
  // 0X00
  // 0X00
  // 0X00
  {
    size: 4,
    points: [makePoint(1,0), makePoint(1,1), makePoint(1,2), makePoint(1,3)]
  },
  // XXX
  // 0X0
  // 000
  {
    size: 3,
    points: [makePoint(0,0), makePoint(1,0), makePoint(2,0), makePoint(1,1)]
  },
  // XXX
  // X00
  // 000
  {
    size: 3,
    points: [makePoint(0,0), makePoint(1,0), makePoint(2,0), makePoint(0,1)]
  },
  // XXX
  // 00X
  // 000
  {
    size: 3,
    points: [makePoint(0,0), makePoint(1,0), makePoint(2,0), makePoint(2,1)]
  },

]

const colors = [
  'red',
  'green',
  'blue',
  'yellow',
  'cyan',
  'magenta'
]

export { shapes, colors }
