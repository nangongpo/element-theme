import gulp from 'gulp'
import task from './lib/task.js'
import vars from './lib/gen-vars.js'
import config from './lib/config.js'

const build = function (opts) {
  return function () {
    return task.build(Object.assign(opts, {message: 'build element theme'}))
  }
}

const fonts = function (opts) {
  return function () {
    return task.fonts(Object.assign(opts, {message: 'build theme font'}))
  }
}

const et = {
  init: function (filePath) {
    filePath = {}.toString.call(filePath) === '[object String]' ? filePath : ''
    vars.init(filePath)
  },
  watch: function (opts) {
    et.run(opts, () => {
      const configPath = opts.config || config.config
      gulp.watch(configPath, gulp.series('build'))
      console.log('watching ' + configPath)
    })
  },
  run: function (opts, cb) {
    gulp.task('build', build(opts))
    gulp.task('fonts', fonts(opts))
    const runTask = typeof cb === 'function' 
      ? gulp.series('build', 'fonts', cb) 
      : gulp.series('build', 'fonts')
    runTask()
  }
}

export default et
