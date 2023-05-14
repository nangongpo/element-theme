import path from 'path'
import fs from 'fs'
import gulp from 'gulp'
import ora from 'ora'
import nop from 'gulp-nop'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import config from './config.js'

const sass = gulpSass(dartSass)
// close debug
const logError = config.debug ? sass.logError : function() { this.emit('end') }

export default {
  fonts: function (opts) {
    const spin = ora(opts.message).start()
    const stream = gulp.src(path.resolve(config.themePath, './src/fonts/**'))
      .pipe((opts.minimize || config.minimize) ? cleanCSS({debug: false}) : nop())
      .pipe(gulp.dest(path.resolve(opts.out || config.out, './fonts')))
      .on('end', function () {
        spin.succeed()
      })
  
    return stream
  },
  build: function (opts) {
    const spin = ora(opts.message).start()
    let stream
    let components
    let cssFiles = '*'
  
    if (config.components) {
      components = config.components.concat(['base'])
      cssFiles = '{' + components.join(',') + '}'
    }
    const varsPath = path.resolve(config.themePath, './src/common/var.scss')
    fs.writeFileSync(varsPath, fs.readFileSync(path.resolve(process.cwd(), opts.config || config.config)), 'utf-8')
  
    stream = gulp.src([opts.config || config.config, path.resolve(config.themePath, './src/' + cssFiles + '.scss')])
      .pipe(sass.sync({ quietDeps: !config.debug }).on('error', logError))
      .pipe(autoprefixer({
        overrideBrowserslist: config.browsers,
        cascade: false
      }))
      .pipe((opts.minimize || config.minimize) ? cleanCSS({debug: false}) : nop())
      .pipe(gulp.dest(opts.out || config.out))
      .on('end', function () {
        spin.succeed()
      })
  
    return stream
  }
}
