import lintjs from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier/recommended'
import pluginVue from 'eslint-plugin-vue'
import pluginVuePug from './eslint.pug'

export default tseslint.config(
  { ignores: ['dist', 'pre', 'node_modules', 'public'] },
  {
    extends: [
      lintjs.configs.recommended,
      ...tseslint.configs.recommended,
      ...pluginVue.configs['flat/recommended'],
      ...pluginVuePug,
      pluginPrettier,
    ],
    files: ['**/*.{ts,js,jsx,tsx,vue}'],
    languageOptions: {
      // ecmaVersion: 2020,
      // globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    plugins: {},
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-explicit-any': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  prettierConfig,
)
