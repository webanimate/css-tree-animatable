const fs = require('fs')
const path = require('path')

const syntaxes = {}
const syntaxesMdn = {}
const patchSyntaxes = {}
const filteredPatchSyntaxes = {}
const filteredSyntaxes = JSON.parse(fs.readFileSync(require.resolve('mdn-data-animatable/css/syntaxes.json'), 'utf8'))
const mdnProperties = JSON.parse(fs.readFileSync(require.resolve('mdn-data-animatable/css/properties.json'), 'utf8'))
const patch = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'patch.json'), 'utf8'))

const getMatches = (property) => {
  const matches = mdnProperties[property]['syntax'].match(/<[a-zA-Z0-9-()]+>/g)
  if (Array.isArray(matches)) {
    matches.forEach((key) => {
      syntaxes[key.slice(1, -1)] = true
    })
  }
}

// Filter out all properties except animatable
Object.keys(mdnProperties).forEach((key) => {
  // Filter out all syntaxes except used in animatable properties
  // getNonAnimatableProperties(key)
  getMatches(key)
})

// Filter out all syntaxes except used in animatable properties
const getSyntaxes = (syntaxes) => {
  Object.keys(syntaxes).forEach((key) => {
    if (Object.keys(filteredSyntaxes).includes(key)) {
      syntaxesMdn[key] = true
      const matches = filteredSyntaxes[key]['syntax'].match(/<[a-zA-Z0-9-()]+>/g)
      if (Array.isArray(matches)) {
        matches.forEach((key) => {
          if (syntaxesMdn[key.slice(1, -1)] !== true) {
            const syntax = {}
            syntax[key.slice(1, -1)] = true
            syntaxesMdn[key.slice(1, -1)] = true
            getSyntaxes(syntax)
          }
        })
      }
    }
  })
}
getSyntaxes(syntaxes)

const getPatchedSyntaxes = (syntaxes) => {
  Object.keys(syntaxes).forEach((key) => {
    if (Object.keys(patch.syntaxes).includes(key)) {
      patchSyntaxes[key] = true
      const matches = patch.syntaxes[key]['syntax'].match(/<[a-zA-Z0-9-()]+>/g)
      if (Array.isArray(matches)) {
        matches.forEach((key) => {
          if (patchSyntaxes[key.slice(1, -1)] !== true) {
            const syntax = {}
            syntax[key.slice(1, -1)] = true
            patchSyntaxes[key.slice(1, -1)] = true
            getPatchedSyntaxes(syntax)
          }
        })
      }
    }
  })
}

Object.keys(patch.syntaxes).forEach((key) => {
  if (!Object.keys(filteredSyntaxes).includes(key) && Object.keys(syntaxesMdn).includes(key)) {
    const syntax = {}
    syntax[key] = true
    getPatchedSyntaxes(syntax)
  }
})
Object.keys(patch.syntaxes).forEach((key) => {
  if (Object.keys(patchSyntaxes).includes(key)) {
    filteredPatchSyntaxes[key] = { syntax: patch.syntaxes[key].syntax }
  }
})
;[path.join(__dirname, 'data', 'patch.json')].forEach((value) => {
  if (fs.existsSync(value)) {
    const stream = fs.createWriteStream(value)
    stream.once('open', () => {
      stream.write(`${JSON.stringify({ properties: {}, syntaxes: filteredPatchSyntaxes })}\n`)
      stream.end()
    })
  }
})
