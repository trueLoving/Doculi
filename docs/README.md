# Doculi 文档站点

> Doculi 的官方文档站点 - 产品介绍、功能特性、技术文档

[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC.svg)](https://tailwindcss.com/)
[![Live Site](https://img.shields.io/badge/Live%20Site-Docs%20Site-blue)](https://doculi-docs.vercel.app/)

这是 Doculi 的官方文档站点，使用 Next.js 15 和 Tailwind CSS v4 构建，提供完整的产品文档和使用指南。

## ✨ 功能特性

- 🎨 **现代化设计** - 响应式布局，支持深色模式
- 📱 **移动端友好** - 完美适配各种设备尺寸
- ⚡ **高性能** - 基于 Next.js 15 的快速加载
- 🎯 **优雅样式** - Tailwind CSS v4 设计系统
- 📖 **完整文档** - 产品介绍、功能特性、技术文档

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

站点将在 http://localhost:4000 运行

### 构建生产版本

```bash
npm run build
npm start
```

## 页面结构

- **首页** (`/`) - 产品介绍、功能特性、使用案例
- **产品介绍** (`/product`) - 核心功能模块和技术亮点
- **功能特性** (`/features`) - 支持格式和转换能力详细说明
- **技术文档** (`/tech`) - 开发计划、技术栈和实现方案
- **站点地图** (`/sitemap`) - 所有页面的导航和说明
- **在线体验** (`/apps/web`) - 直接使用DocuSynapse产品

## 技术栈

- **框架**: Next.js 15
- **样式**: Tailwind CSS v4
- **语言**: TypeScript
- **部署**: 支持Vercel等平台

## 自定义

### 修改品牌信息

在 `src/app/page.tsx` 中修改：

- 公司名称
- 产品描述
- 联系方式
- 功能特性

### 修改样式

使用Tailwind CSS类名进行样式调整，支持：

- 响应式设计
- 深色模式
- 自定义颜色主题

## 部署

### Vercel部署

1. 连接GitHub仓库
2. 选择docs目录作为根目录
3. 自动部署

### 其他平台

构建后部署 `out` 目录到任何静态托管服务。
