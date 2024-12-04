export function keysSnakeCaseToCamelCase(o: any): any {
  if (Array.isArray(o)) {
    return o.map((v) => keysSnakeCaseToCamelCase(v))
  } else if (o !== null && typeof o === 'object') {
    return Object.keys(o).reduce((result, key) => {
      let newKey = camelCase(key)
      if (newKey.endsWith('Id')) {
        newKey = newKey.slice(0, -2) + 'ID'
      } else if (newKey.endsWith('Ids')) {
        newKey = newKey.slice(0, -3) + 'IDs'
      } else if (newKey.endsWith('Url')) {
        newKey = newKey.slice(0, -3) + 'URL'
      }
      result[newKey] = keysSnakeCaseToCamelCase(o[key])
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

export function keysCamelCaseToSnakeCase(o: any): any {
  if (Array.isArray(o)) {
    return o.map((v) => keysCamelCaseToSnakeCase(v))
  } else if (o !== null && typeof o === 'object') {
    return Object.keys(o).reduce((result, key) => {
      let newKey = snakeCase(key)
      if (newKey.endsWith('Id')) {
        newKey = newKey.slice(0, -2) + 'ID'
      } else if (newKey.endsWith('Ids')) {
        newKey = newKey.slice(0, -3) + 'IDs'
      }
      result[newKey] = keysCamelCaseToSnakeCase(o[key])
      return result
    }, {} as any)
  }
  return o
}

function snakeCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}
