/* eslint-disable */
const cssPrefixes = ['Webkit', 'Moz', 'ms']
const emptyStyle = document.createElement('div').style
const vendorProps = {}

function vendorPropName(name) {
  const capName = name[0].toUpperCase() + name.slice(1)
  let i = cssPrefixes.length
  while (i--) {
    name = cssPrefixes[i] + capName
    if (name in emptyStyle) {
      return name
    }
  }
}

function finalPropName(name) {
  const final = vendorProps[name]
  if (final) {
    return final
  }

  if (name in emptyStyle) {
    return name
  }
  return vendorProps[name] = vendorPropName(name) || name
}