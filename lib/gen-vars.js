import path from 'path'
import fs from 'fs'
import ora from 'ora'
import config from './config.js'

const varsPath = path.resolve(config.themePath, './src/common/var.scss')
let filePath = path.resolve(process.cwd(), config.config)

export default {
  check: function () {
    if (!fs.existsSync(varsPath)) {
      ora('please install `' + config.themeName + '`').fail()
      process.exit(1)
    }
  },
  init: function (_file) {
    const spinner = ora('Generator variables file').start()
  
    filePath = path.resolve(process.cwd(), _file ? _file : config.config)
    if (fs.existsSync(filePath)) {
      spinner.text = 'Variables file already exists.'
      spinner.fail()
    } else {
      fs.writeFileSync(filePath, fs.readFileSync(varsPath), 'utf-8')
      spinner.succeed()
    }
  }
}
