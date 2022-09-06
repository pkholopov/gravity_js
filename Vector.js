export class Vector {
  constructor(props) {
    this.x = props.x ?? props.value * Math.cos((props.direction * Math.PI) / 180)
    this.y = props.y ?? props.value * Math.sin((props.direction * Math.PI) / 180)
  }

  updateCoordinates() {
    this.x = this.value * Math.cos((this.direction * Math.PI) / 180)
    this.y = this.value * Math.sin((this.direction * Math.PI) / 180)
  }

  updateValue() {
    this.value = Math.hypot(this.x, this.y)
    return this
  }

  getDirection() {
    this.updateValue()
    if (this.value === 0) return 0
    const angle = Math.acos(this.x / this.value) * 180 / Math.PI
    if (this.y < 0) return 360 - angle
    return angle
  }

  add(vector, isNew = false) {
    if (isNew) return new Vector({ x: this.x + vector.x, y: this.y + vector.y })
    else {
      this.x += vector.x
      this.y += vector.y
      return this
    }

  }

  substract(vector, isNew = false) {
    if (isNew) return new Vector({ x: this.x - vector.x, y: this.y - vector.y })
    else {
      this.x -= vector.x
      this.y -= vector.y
      return this
    }
  }

  dotProduct(vector) {
    return this.x * vector.x + this.y * vector.y
  }

  scale(number, isNew = false) {
    if (isNew) return new Vector({ x: this.x * number, y: this.y * number })
    else {
      this.x *= number
      this.y *= number
      return this
    }
  }

  normalize(isNew = false) {
    this.updateValue()
    if (isNew) return new Vector({ x: this.x / this.value, y: this.y / this.value })
    else {
      this.x /= this.value
      this.y /= this.value
      return this
    }
  }

  draw(context, x = 0, y = 0) {
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + this.x, y + this.y)
    context.stroke()
    context.closePath()
  }
}
