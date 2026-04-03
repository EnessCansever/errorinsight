// Error kategorisini belirlemek için daha mantıklı ve öncelikli eşleme
const categorizeError = (errorMessage) => {
  const message = (errorMessage || '').toLowerCase()

  // 1) React özel hataları (özellikle hydration mismatch)
  const reactKeywords = [
    'hydration',
    'hydrate',
    'did not match',
    'server rendered',
    'client rendered',
    'server/client',
    'text content does not match',
    'react',
    'hook',
    'invalid hook call',
  ]
  if (reactKeywords.some((keyword) => message.includes(keyword))) {
    return 'React Error'
  }

  // 2) TypeError benzeri kalıplar (undefined/map/filter/function/iterable)
  const typeKeywords = [
    'typeerror',
    'cannot read properties of undefined',
    'cannot read properties of null',
    'is not a function',
    'is not iterable',
    "reading 'map'",
    "reading 'filter'",
    "reading 'reduce'",
    "reading 'find'",
    'undefined is not an object',
    'null is not an object',
  ]
  if (typeKeywords.some((keyword) => message.includes(keyword))) {
    return 'Type Error'
  }

  // 3) ReferenceError (özellikle tanımlı değil hataları)
  const referenceKeywords = [
    'referenceerror',
    'is not defined',
    'cannot access',
    'before initialization',
  ]
  if (referenceKeywords.some((keyword) => message.includes(keyword))) {
    return 'Reference Error'
  }

  // 4) API / Network
  const networkKeywords = [
    'failed to fetch',
    'networkerror',
    'network error',
    'cors',
    'timeout',
    'econnrefused',
    'status code 404',
    'status code 500',
    'request failed',
  ]
  if (networkKeywords.some((keyword) => message.includes(keyword))) {
    return 'API / Network Error'
  }

  // 5) Build tool
  const buildKeywords = ['webpack', 'vite', 'babel', 'esbuild', 'rollup', 'module not found', 'build failed']
  if (buildKeywords.some((keyword) => message.includes(keyword))) {
    return 'Build Tool Error'
  }

  // 6) Syntax
  const syntaxKeywords = ['syntaxerror', 'unexpected token', 'missing', 'expected', 'unterminated', 'invalid or unexpected token']
  if (syntaxKeywords.some((keyword) => message.includes(keyword))) {
    return 'Syntax Error'
  }

  return 'Unknown'
}

module.exports = {
  categorizeError,
}
