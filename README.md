# 说明

一个vite + vue3 + Ts 的多页面（MPA）模板

# 项目说明

环境需要 Node 18及以上

引入 vant + pug + vconsole + i18n 等主流库用于开发

配置 prettier + eslint 来规范代码，同时也添加了兼容性处理

使用 vscode 配置了自动保存，并实现保存时自动格式化代码

# 开发指令

```
# 安装依赖
pnpm install

# 本地开发
pnpm run dev

# 打包预览
pnpm run pre
pnpm run build
pnpm run preview

# lint
pnpm run lint
pnpm run lint:fix
```

# 目录说明

```
├── buildJs (打包脚本)
├── public (存放公共文件)
│ └── favicon.ico
├── src
│ ├── api (接口列表)
│ │ └── index.ts
│ ├── locales (多语言文件)
│ │ ├── example (页面example的多语言文件)
│ │ ├── example2 (页面example2的多语言文件)
│ │ └── ...
│ ├── pages (业务页面)
│ │ ├── example (业务模块 1)
│ │ │ ├── router
│ │ │ ├── store
│ │ │ ├── view
│ │ │ ├── App.vue
│ │ │ ├── index.html
│ │ │ └── main.ts
│ │ ├── example2 (业务模块 2)
│ │ │ ├── App.vue
│ │ │ ├── index.html
│ │ │ └── main.ts
│ ├── styles (公共样式表)
│ └──── index.less
│ ├── utils (公共工具)
│ │ ├── i18n.ts (i18n工具)
│ └─└── rem.ts (rem多设备适配)
├── types (ts声明文件)
│ └── vite-env.d.ts
├── eslint.config.ts (eslint配置)
├── eslint.pug.ts (pug eslint配置)
├── package.json
├── README.md
├── tsconfig.app.ts
├── tsconfig.ts
├── tsconfig.node.ts
└── vite.config.ts
```

# 访问说明

**开发环境**，因为view的目录打包结构，需要使用 目录名下的 `index.html` 进行开发访问

```
➜  Local:   http://localhost:5174/example/
```

**打包发布环境**，我不希望在用户访问时使用的是 `https://abc.test/example/`，希望使用 `https://abc.test/example.html` 这样的规范访问，所以在`buildJs`里进行了处理，详情可以下载之后打包查看对应的目录 `pre/dist`

```
➜  Network:   https://abc.test/example.html
```
