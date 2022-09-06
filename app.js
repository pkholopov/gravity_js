import { Vector } from "./Vector.js"
import { Circle } from "./Circle.js"

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')

const w = cnv.width = 1000
const h = cnv.height = 800

const objects = []

// const circle1 = new Circle(200, 100, 30)
// circle1.setVelocity(100, 0)

// const circle2 = new Circle(400, 300, 60, 50000)
// const circle3 = new Circle(600, 500, 40)
// circle3.setVelocity(60, 180)

// objects.push(circle1, circle2, circle3)


let lastUpdate = 0

function tick(timestamp) {
  let delta = timestamp - lastUpdate
  let fps = 1000 / delta
  lastUpdate = timestamp

  update(fps)

  render()

  requestAnimationFrame(tick)
}

requestAnimationFrame(tick)

function update(fps) {
  objects.forEach(o1 => {
    objects.forEach(o2 => {
      if (o2 == o1) return

      const dist = o2.position.substract(o1.position, true)
      o1.velocity.add(o2.position.substract(o1.position, true).normalize().scale(o2.mass / (dist.x ** 2 + dist.y ** 2)))
    })

    o1.position.add(o1.velocity.scale(1 / fps, true))
  })
  detectCollision()
}

function render() {
  ctx.clearRect(0, 0, w, h)
  objects.forEach(o => {
    o.draw(ctx)
    // o.velocity.draw(ctx, o.position.x, o.position.y)
  })
}

function detectCollision() {
  let obj1, obj2

  for (let i = 0; i < objects.length; i++) {
    obj1 = objects[i]
    for (let j = i + 1; j < objects.length; j++) {
      obj2 = objects[j]

      if (circleIntersect(obj1, obj2)) {
        let penetration = (obj2.r + obj1.r) - obj2.position.substract(obj1.position, true).updateValue().value
        let nCollisionVector = obj2.position.substract(obj1.position, true).normalize()
        obj1.position.substract(nCollisionVector.scale(penetration / 2, true))
        obj2.position.add(nCollisionVector.scale(penetration / 2, true))
        let relVelocity = obj1.velocity.substract(obj2.velocity, true)
        let speed = relVelocity.dotProduct(nCollisionVector)
        if (speed < 0) return
        let impulse = 2 * speed / (obj1.mass + obj2.mass)

        obj1.velocity.substract(nCollisionVector.scale(obj2.mass * impulse, true))
        obj2.velocity.add(nCollisionVector.scale(obj1.mass * impulse, true))
      }
    }
  }
}

function circleIntersect(c1, c2) {
  return (c2.position.x - c1.position.x) ** 2 + (c2.position.y - c1.position.y) ** 2 <= (c1.r + c2.r) ** 2
}

cnv.addEventListener('click', e => {
  objects.push(new Circle(e.offsetX, e.offsetY, Math.ceil(Math.random() * 5) * 5))
})