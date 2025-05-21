// 接口地址 在 ".env.staging" 与 ".env.production" 文件中配置，会根据打包环境替换host
export const api = {
  // 例子 api.example.get
  example: {
    get: `${process.env.VITE_APP_API_PATH_EXAMPLE}/xxx/index/get`,
  },
}
