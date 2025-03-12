# 配置vitepress的过程中遇到了一些小问题，在此记录一下



## 1. 部署后无css样式

在confit.mts中，添加如下配置

```js
export default defineConfig({
  base: '/yourrepo/', // 你的 GitHub 仓库名称，必须加 `/`，大小写敏感
})
```



## 2. 配置md文档路径

默认情况下，md文档和其他文件在同一路径，为了使目录更清晰，需要将md文档新建一个目录

```
srcDir: "docs",
```

配置后link链接到md文档写法无需修改，如`/docs/index` 直接写`/index`，会自动从配置的srcDir中查找



### 3. github actions

官方给出的deploy文件无需过多修改，只需着重关注`path`及node版本

