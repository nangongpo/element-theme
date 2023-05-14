import path from 'path'
const pkg = {}

try {
  pkg = require(path.resolve(process.cwd(), 'package.json'))
} catch (err) {}

const config = Object.assign({
  out: './theme',
  config: './element-variables.scss',
  theme: 'element-theme-chalk',
  minimize: false,
  debug: false
}, pkg['element-theme'])

export default {
  themePath: path.resolve(process.cwd(), './node_modules/' + config.theme),
  out: config.out,
  config: config.config,
  minimize: config.minimize,
  browsers: config.browsers,
  components: config.components,
  themeName: config.theme,
  debug: config.debug
}
