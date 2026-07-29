# 项目规范

## 环境要求
- Node.js 22
- pnpm 10

## 包管理器
- **必须使用 pnpm**
- 禁止使用 npm install 或 yarn
- 所有依赖管理命令使用 pnpm

## 常用命令
- 安装依赖：`pnpm install`
- 运行开发服务器：`pnpm dev`
- 构建生产包：`pnpm build`
- 类型检查：`pnpm type-check`
- 代码格式化：`pnpm format`

## 注意事项
- 在运行任何 pnpm 命令前，确保已切换到 Node 22 版本
- 如果 Node 版本不对，提示用户运行 `nvm use 22`