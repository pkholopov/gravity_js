import { Vector } from "./Vector.js";

export class Circle {
  constructor(x, y, radius, mass) {
    this.position = new Vector({x: x, y: y})
    this.r = radius
    this.mass = mass ?? this.r * 500
    this.velocity = new Vector({x: 0, y: 0})
  }

  setVelocity(value, direction) {
    this.velocity = new Vector({value: value, direction: direction})
  }

  draw(c) {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2)
    c.stroke()
    c.closePath()
  }
}