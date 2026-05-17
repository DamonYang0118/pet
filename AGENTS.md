# 项目说明

## 项目概览

这是一个基于 Next.js 的中文宠物洗护门店单页网站，品牌名为「泡泡爪 Pet Spa」。页面面向宠物主人，展示高端宠物洗护、精修造型、皮毛护理、幼宠适应、店内环境、客户评价和门店位置。

当前实现是前端展示型站点，没有后端接口、数据库或真实表单提交逻辑。预约表单目前只负责展示输入控件，提交按钮是 `type="button"`。

## 技术栈

- Next.js 13 App Router
- React 18
- TypeScript 5，开启 `strict`
- 全局 CSS：`app/globals.css`
- 未使用 Tailwind、CSS Modules、UI 组件库或图标库
- 图片静态资源放在 `public/images`

## 常用命令

- 安装依赖：`npm install`
- 本地开发：`npm run dev`
- 生产构建：`npm run build`
- 启动生产服务：`npm run start`
- 类型检查：`npm run lint`

注意：`lint` 脚本实际执行的是 `tsc --noEmit`，不是 ESLint。

## 目录结构

- `app/layout.tsx`：根布局，设置 `lang="zh-CN"`，定义页面 metadata，引入全局样式。
- `app/page.tsx`：首页主页面，包含顶部导航、首屏预约区、服务项目、店内环境、客户评价、门店信息和页脚。
- `app/globals.css`：全部视觉样式、响应式布局、卡片、轮播、表单和导航样式。
- `app/environment-carousel.tsx`：客户端店内环境轮播组件，自动每 5 秒切换，也支持左右按钮和圆点切换。
- `app/review-carousel.tsx`：客户端客户评价轮播组件，自动每 4.2 秒切换，也支持上一条、下一条和圆点切换。
- `public/images/store-env-1.png`：前台接待与零售陈列区图片。
- `public/images/store-env-2.png`：透明可视洗护操作区图片，也是首屏背景图。
- `public/images/store-env-3.png`：等候休息与宠物社交区图片。
- `public/images/store-map-ai.png`：门店位置示意图。
- `next.config.js`：当前为空配置。
- `tsconfig.json`：Next 推荐配置，开启严格类型检查和增量编译。

## 页面内容与交互

- 顶部导航锚点包括：洗护项目、护理流程、价目表、客户评价、门店位置。
- 首页首屏使用 `store-env-2.png` 作为大图背景，右侧是快速预约表单。
- 服务项目数据直接写在 `app/page.tsx` 的 `services` 数组中。
- 店内环境轮播数据写在 `app/environment-carousel.tsx` 的 `envData` 数组中。
- 客户评价轮播数据写在 `app/review-carousel.tsx` 的 `reviews` 数组中。
- 门店信息写死在 `app/page.tsx` 中：上海市宜川路街道陕西北路 1620 号，电话 `400-123-8899`，营业时间 `09:30 - 20:30`。

## 样式约定

- 主要视觉基调是清爽、高端、宠物洗护门店风格，使用白色、浅绿、蓝灰和品牌绿色。
- CSS 变量定义在 `:root`，包括颜色、圆角和阴影。
- 响应式断点主要为 `1280px`、`1100px`、`720px`、`420px`。
- 页面大量使用 `clamp()` 控制字号、间距和高度。
- 图片通过普通 `<img>` 使用 `/images/...` 路径，没有使用 `next/image`。
- 当前代码里使用了少量 emoji 作为视觉符号。

## 开发注意事项

- 新增可交互组件需要在文件顶部添加 `"use client"`。
- 如果修改轮播逻辑，要注意清理 `setInterval`，避免计时器泄漏。
- 如果新增图片，应放入 `public/images`，并使用以 `/images/` 开头的绝对路径引用。
- 如果让预约表单真正提交，需要新增状态管理、校验和提交目标；当前没有任何 API route。
- 修改视觉时优先延续现有全局 CSS 变量和响应式断点。
- 修改后至少运行 `npm run lint` 做类型检查。

## 已知状态

- `npm run lint` 当前可以通过。
- `AGENTS.md` 是未跟踪文件。
- `.gitignore` 已忽略 `node_modules/`、`.next/`、`.npm-cache/`、`*.tsbuildinfo`、环境文件、日志、覆盖率和编辑器文件。

## 操作约束

禁止批量删除文件或目录。不要使用：

- `del /s`
- `rd /s`
- `rmdir /s`
- `Remove-Item -Recurse`
- `rm -rf`

需要删除文件时，只能一次删除一个明确路径的文件。

正确示例：

```powershell
Remove-Item "C:\path\to\file.txt"
```

如果需要批量删除文件，应停止操作，并请求用户手动删除。
