import { glob } from 'glob'
import { promises as fs } from 'fs'
import { resolve } from 'path'

const htmlFiles = await glob('src/pages/*.html')
for (const file of htmlFiles) {
  if (!file.endsWith('/index.html')) {
    await fs.unlink(resolve(file))
  }
}
