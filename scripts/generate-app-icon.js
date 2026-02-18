#!/usr/bin/env node
/**
 * 生成 iOS App 图标
 * 需要先安装 sharp: npm install sharp
 * 运行: node scripts/generate-app-icon.js
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const svgPath = path.join(__dirname, '../public/app-icon.svg')
const outPath = path.join(__dirname, '../ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png')

async function main() {
  try {
    const { default: sharp } = await import('sharp')
    await sharp(fs.readFileSync(svgPath))
      .resize(1024, 1024)
      .png()
      .toFile(outPath)
    console.log('✅ App 图标已生成:', outPath)
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.log('请先安装 sharp: npm install sharp')
      process.exit(1)
    }
    throw e
  }
}

main()
