# iTeach 小学工作台 2.0 Demo

iTeach 小学工作台首页交互 Demo，包含角色化快捷入口、班级课表、最近使用、资源中心、AI 教学 Agent 和 AI 课件精选推荐。

## 在线地址

- 自定义域名：<https://iteach.chenjialing.com>
- Cloudflare Pages：<https://iteach-primary-workbench.pages.dev>

## 本地预览

```bash
python3 -m http.server 4173
```

然后访问 <http://localhost:4173>。

## 自动部署

- GitHub 仓库：<https://github.com/Jolin0223/iteach-workbench>
- 生产分支：`main`
- Cloudflare Pages 项目：`iteach-primary-workbench`
- 构建配置：静态站点，无构建命令，输出目录为仓库根目录 `/`

提交到 GitHub `main` 分支后，Cloudflare Pages 会自动构建并发布。日常更新不再使用手动上传命令。
