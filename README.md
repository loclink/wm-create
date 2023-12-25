# CLI Template

## :tea: 概述：

一个 nodejs cli (命令行工具) 项目模板，你可以使用此模板来快速开发 cli 工具。

## :wink: 快速开始：

1. 克隆模板

   ```
   git clone https://github.com/loclink/cli-template.git
   ```

2. 根目录下执行安装依赖：

   ```sh
   npm install
   ```

3. 开发时为了方便调试，请将将项目软链接到全局：

   ```sh
   npm link
   ```

4. 启动开发编译模式：

   ```sh
   npm run dev
   ```

5. 打开新的终端，执行指令：

   ```sh
   cli -h
   ```

   执行后若打印帮助信息，则表示开发环境已搭建完成。

   ```
   cli -h

   Usage: cli [options]

   cli项目模板

   Options:
     -v, --version  output the version number
     -h, --help     display help for command
   ```

   之后若需要修改命令名称，请在项目描述文件（package.json）中将 `bin` 选项当中的 `key` 修改为你需要的名称即可，例如：

   ```json
   {
     "name": "cli-template",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "files": ["dist"],

     "bin": {
       "mycli": "dist/main.js" // 将key修改为你需要的名称
     }

     // ... other options
   }
   ```

   修改完成后需要重新建立软链：

   ```sh
   npm link
   ```

   之后可以使用新名称来执行脚本命令：

   ```sh
   mycli -h
   ```
