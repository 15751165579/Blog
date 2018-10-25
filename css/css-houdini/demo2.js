/* eslint-disable */
registerPaint('simpleRect', class {
  static get inputProperties () {
    return ['--rect-color']
  }
  paint (ctx, size, properties) {
    const color = properties.get('--rect-color')
    ctx.fillStyle = color
    ctx.fillRect(0, 0, size.width, size.height)
  }
})