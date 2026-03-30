// Error kategorisini belirlemek için basit anahtar kelime eşlemesi
const categorizeError = (errorMessage) => {
  const message = errorMessage.toLowerCase()

  const categories = [
    {
      name: 'Syntax Error',
      keywords: ['syntaxerror', 'unexpected token', 'missing', 'expected'],
    },
    {
      name: 'Reference Error',
      keywords: [
        'referenceerror',
        'is not defined',
        'undefined',
        'cannot read',
      ],
    },
    {
      name: 'Type Error',
      keywords: ['typeerror', 'is not a function', 'is not iterable', 'null'],
    },
    {
      name: 'React Error',
      keywords: [
        'react',
        'hook',
        'render',
        'component',
        'jsx',
        'children',
        'state',
      ],
    },
    {
      name: 'API / Network Error',
      keywords: [
        'fetch',
        'network',
        'cors',
        'connection',
        '404',
        '500',
        'request',
        'timeout',
      ],
    },
    {
      name: 'Build Tool Error',
      keywords: ['webpack', 'vite', 'babel', 'build', 'esbuild', 'rollup'],
    },
  ]

  for (const category of categories) {
    if (category.keywords.some((keyword) => message.includes(keyword))) {
      return category.name
    }
  }

  return 'Unknown'
}

module.exports = {
  categorizeError,
}
