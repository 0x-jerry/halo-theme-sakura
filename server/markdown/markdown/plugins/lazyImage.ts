import MarkdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token'

export const lazyImagePlugin = (md: MarkdownIt) => {
  md.core.ruler.push('markdown-it-lazy-image-attr', (state) => {
    const tokens = state.tokens
    parseTokens(tokens)

    return false
  })
}

function parseTokens(tokens: Token[]) {
  tokens.forEach((token, idx, arr) => {
    if (token.tag === 'img') {
      token.attrSet('loading', 'lazy')
    }

    if (token.children) {
      parseTokens(token.children)
    }
  })
}
