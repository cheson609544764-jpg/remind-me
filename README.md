# 提醒我 (Remind Me)

任务提醒应用。手动添加任务，设置名称和时长。

## 功能

- 手动添加任务（名称 + 时长）
- 圆形进度条显示剩余时间
- 任务编辑、删除、时间调整
- 本地通知（剩余时间 < 25% 时提醒）
- 数据持久化（localStorage）

## 开发

```bash
npm install
npm run dev
```

访问 http://localhost:5173

## 部署

**Vercel**

```bash
npm run build
vercel --prod
```

**Netlify**

```bash
npm run build
# 在 Netlify 控制台连接仓库，构建命令: npm run build，发布目录: dist
```

## 技术栈

- React 19 + TypeScript + Vite
- Tailwind CSS + lucide-react
