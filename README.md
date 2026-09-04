# iTeach 小学工作台 2.0 Demo

iTeach 小学工作台 2.0 交互 Demo，包含角色化快捷入口、班级课表、最近使用、资源中心、AI 教学 Agent、AI 课件精选推荐和权限管理。

已接入可操作业务原型：备课中心、练习中心、试卷中心、测评中心、我的课表、我的班级、我的学员、功底考、数据中心和回收站。首页快捷入口可直接定位到对应二级页签。

权限管理已按旧系统截图复刻集团教研员、分校教研员、授课老师和分校运营四个标准角色，支持角色新建、复制、资料维护和停用。角色赋权复用旧系统的树形勾选方式，集团/校本/个人权限直接放在对应菜单节点下，不再单独配置“数据范围”；保存前会展示变更影响，不提供直接删除角色操作。菜单改名后不能唯一对应的节点会显示“待确认映射”，不会伪装成已确认口径。

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
