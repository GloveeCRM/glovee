import _ from 'lodash'

export function keysToCamelCase(o: any): any {
  if (Array.isArray(o)) {
    return o.map((v) => keysToCamelCase(v))
  } else if (o !== null && typeof o === 'object') {
    return Object.keys(o).reduce((result, key) => {
      let newKey = camelCase(key)
      // Replace 'ID' with 'Id' at the end of the key
      if (newKey.endsWith('Id')) {
        newKey = newKey.slice(0, -2) + 'ID'
      } else if (newKey.endsWith('Ids')) {
        newKey = newKey.slice(0, -3) + 'IDs'
      }
      result[newKey] = keysToCamelCase(o[key])
      return result
    }, {} as any)
  }
  return o
}

function camelCase(str: string): string {
  return str
    .replace(/[_-](\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^([A-Z])/, (_, c) => c.toLowerCase())
}
