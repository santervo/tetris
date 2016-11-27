const makePoint = (x,y) => ({x, y})

const addPoints = (p1,p2) => ({x: p1.x + p2.x, y: p1.y + p2.y})

export { makePoint, addPoints }
