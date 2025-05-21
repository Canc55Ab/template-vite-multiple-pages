import { spawn } from 'node:child_process'

function run(cmd, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true })
    child.on('exit', code => (code === 0 ? resolve() : reject(code)))
    process.on('SIGINT', () => {
      child.kill('SIGINT')
      // console.log('\n捕获到 SIGINT exit，执行清理操作...')
      spawn('node', ['buildJs/clean-html.js'], {
        stdio: 'inherit',
        shell: true,
      })
      process.exit(1)
    })
  })
}

async function main() {
  const args = process.argv.slice(2)

  await run('node', ['buildJs/copy-html.js'])
  try {
    await run('vue-tsc', ['-b'])
    await run('vite', ['build', ...args])
  } finally {
    await run('node', ['buildJs/clean-html.js'])
  }
}

main()
