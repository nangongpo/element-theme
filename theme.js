// usage
// import et from 'element-theme-replace'
import et from './index.js'
const configPath = './element-variables.scss'
const outPath = './theme'

// 生成样式变量文件， $--breakpoints-spec变量中的引号记得删除
// et.init(configPath)

// 实时编译模式
// et.watch({
//   config: configPath,
//   out: outPath
// })

// 编译
et.run({
  debug: false, // 关闭警告信息
  config: configPath, // 配置参数文件路径 默认`./element-variables.scss`
  out: outPath, // 输出目录 默认`./theme`
  minimize: false, // 压缩文件
  // components: ['button', 'input'] // 选定组件构建自定义主题
})
