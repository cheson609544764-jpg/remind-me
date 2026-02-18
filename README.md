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

## 打包成 iOS App

项目已配置 **Capacitor**，可直接打包为原生 iOS App。

### 前提

- macOS 系统
- 安装 [Xcode](https://apps.apple.com/app/xcode/id497799835)（App Store 免费下载）

### 一键打开 Xcode

```bash
npm run ios
```

会自动完成：构建 → 同步到 iOS 项目 → 打开 Xcode

### 在 Xcode 中

1. 选择模拟器（如 iPhone 15）或连接真机
2. 点击运行按钮 ▶️
3. 首次运行真机需：Xcode → 项目 → Signing & Capabilities → 选择你的 Apple ID 团队

### 上架 App Store

1. 在 [App Store Connect](https://appstoreconnect.apple.com) 创建 App
2. 在 Xcode 中配置签名、创建 App ID
3. 菜单 Product → Archive → Distribute App

### 其他

- **Android**：`npx cap add android` 后同样方式打包
- **PWA**：可添加 manifest 和 Service Worker，用户「添加到主屏幕」使用

## 技术栈

- React 19 + TypeScript + Vite
- Tailwind CSS + lucide-react
