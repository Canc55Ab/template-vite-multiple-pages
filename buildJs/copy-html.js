import { glob } from 'glob'
import { promises as fs } from 'fs'
import { dirname, resolve } from 'path'

const root = resolve('src/pages')
const htmlFiles = await glob('src/pages/**/index.html')

for (const file of htmlFiles) {
  const dir = dirname(file)
  const name = dir.split('/').pop()
  const dest = resolve(root, `${name}.html`)
  let content = await fs.readFile(file, 'utf-8')
  // 替换引用路径（示例：将 ./main.ts 或 ./main.js 替换为 ./${name}.js，可根据实际情况调整）
  content = content.replace(/(\.\/)?main\.(js|ts)/g, `./${name}/main.$2`)
  await fs.writeFile(dest, content)
}
