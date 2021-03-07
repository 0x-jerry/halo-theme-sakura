# Halo-theme-sakura (WIP)

用 Vite + SSR + Vue3 完全重写 [Halo-theme-sakura](https://github.com/LIlGG/halo-theme-sakura)

Docker: https://hub.docker.com/r/cwxyz/halo-theme-sakura

## [预览](https://blog.tiny-online.online/)

优势:

- [x] Tailwind
- [x] Typescript
- [x] Vue3
- [x] SSR
- [x] Docker
- [x] Markdown-It
- [x] Vite

功能:

- [x] 首页
- [x] 归档页
- [x] 所有标签页面
- [x] 标签页面
- [x] 所有分类页面
- [x] 分类页面
- [ ] 关于页面
- [x] 文章详情页
- [ ] 移动端适配
- [x] 图片懒加载
- [x] 随机图
- [ ] 友情连接页面
- [ ] 图库页面
- [ ] 日志页面

TODO

- [x] Docker 实现 release 时自动编译，发布
- [x] 迁移至 Vite + SSR
- [ ] 文档
- [ ] markdown 文章中可使用 vue 组件
  - [ ] 视频组件
  - [ ] 音乐组件
- [ ] 集成音乐播放

## 开发

项目中 `server` 文件夹添加 `.env` 文件

```ini
HALO_ACCESS_KEY='xxx' # 替换成自己的 access key
HALO_TARGET='https://blog.tiny-online.online' # 替换成自己的域名
```

```sh
# 安装依赖
$ yan

# 启动开发
$ yarn dev
```
