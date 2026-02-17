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

推荐使用 **Capacitor** 将 Web 应用打包为原生 iOS App：

### 1. 安装 Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap init
```

按提示填写 App 名称和包名（如 `com.yourname.remindme`）。

### 2. 添加 iOS 平台

```bash
npm run build
npx cap add ios
npx cap sync
```

### 3. 在 Xcode 中打开并运行

```bash
npx cap open ios
```

在 Xcode 中：
- 选择真机或模拟器
- 点击运行（▶️）
- 如需上架 App Store：配置签名、创建 App ID、提交审核

### 4. 后续更新流程

```bash
npm run build
npx cap sync
npx cap open ios
```

### 其他方案

- **PWA**：添加 `manifest.json` 和 Service Worker，用户可「添加到主屏幕」，无需上架
- **TWA (Android)**：若需 Android 版，可用 `@capacitor/android` 同样方式打包

## 技术栈

- React 19 + TypeScript + Vite
- Tailwind CSS + lucide-react
