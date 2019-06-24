const Defaults = {
  placement: 'bottom',
  onCreate: () => {},
  onUpdate: () => {}
}

class Popper {
  constructor(reference, popper, options = {}) {
    // 合并选项
    this.options = { ...Popper.Defaults, ...options}

    this.state = {
      isCreated: false,
      isDestroyed: false
    }

    this.reference = reference
    this.popper = popper
  }

  static Defaults = Defaults
}

export default Popper