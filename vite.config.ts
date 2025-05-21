import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vitePugPlugin from 'vite-plugin-pug-transformer'
import { viteVConsole } from 'vite-plugin-vconsole'
import { lstatSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import eslint from 'vite-plugin-eslint2'

const pagesRoot = 'src/pages'
const all_page_dir = readdirSync(resolve(pagesRoot)).filter(item =>
  lstatSync(resolve(__dirname, pagesRoot, item)).isDirectory(),
)

const all_page_entry_js = all_page_dir.map(item => resolve(__dirname, `${pagesRoot}/${item}/main.ts`))
const all_page_entry_html = all_page_dir.reduce(
  (prev: any, curv) => ((prev[`${curv}`] = resolve(pagesRoot, `${curv}.html`)), prev),
  {},
)

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const isBuild = command === 'build'

  return {
    base: env.VITE_APP_BASE || './',

    publicDir: resolve(__dirname, 'public'),

    define: {
      'process.env': env,
    },

    plugins: [
      vue(),
      eslint({
        lintInWorker: false,
        lintOnStart: true,
        build: true,
      }),
      legacy({ targets: ['and_chr >= 30', 'chrome >= 58'] }),
      vitePugPlugin({ pugLocals: { bundler: 'Vite' } }),
      viteVConsole({
        entry: all_page_entry_js,
        enabled: mode != 'production' ? true : false,
        config: {
          maxLogNumber: 1000,
          theme: 'dark',
        },
      }),
      VueI18nPlugin({
        include: [resolve(__dirname, './src/locales/**/**')],
        strictMessage: false,
      }),
    ],

    server: {
      host: '0.0.0.0',
      port: 5173,
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    root: pagesRoot,
    build: {
      minify: 'esbuild', // 默认就是 esbuild
      outDir: resolve(__dirname, env.VITE_APP_OUTDIR || 'dist'),
      emptyOutDir: true,
      assetsInlineLimit: 0,
      chunkSizeWarningLimit: 1024,

      rollupOptions: {
        input: all_page_entry_html,
        output: {
          chunkFileNames: 'asset/chunk/[name]-[hash].js',
          assetFileNames: 'asset/[name]-[hash][extname]',
          entryFileNames(chunkInfo) {
            return `${chunkInfo.name}/[name]-[hash].js`
          },
        },
      },
    },
    esbuild: {
      // build 时删除 console 和 debugger
      drop: isBuild ? ['console', 'debugger'] : [],
    },
  }
})
