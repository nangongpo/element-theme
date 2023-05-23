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
    const options = Object.assign(config, opts)
    const spin = ora(options.message).start()
    let stream
    let components
    let cssFiles = '*'
  
    if (options.components) {
      components = options.components.concat(['base'])
      cssFiles = '{' + components.join(',') + '}'
    }
    const varsPath = path.resolve(options.themePath, './src/common/var.scss')
    fs.writeFileSync(varsPath, fs.readFileSync(path.resolve(process.cwd(), options.config)), 'utf-8')
  
    stream = gulp.src([options.config, path.resolve(options.themePath, './src/' + cssFiles + '.scss')])
      .pipe(sass.sync({ 
        logger: !options.debug ? { warn: function(message, options) {} } : undefined
      }).on('error', sass.logError))
      .pipe(autoprefixer({
        overrideBrowserslist: options.browsers,
        cascade: false
      }))
      .pipe((options.minimize) ? cleanCSS({debug: false}) : nop())
      .pipe(gulp.dest(options.out))
      .on('end', function () {
        spin.succeed()
      })
  
    return stream
  }
}
