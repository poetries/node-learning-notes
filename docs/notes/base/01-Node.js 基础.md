---
sidebarDepth: 4
pageClass: custom-code-highlight
---

## 认识 Node.js
- Node 是一个服务器端 JavaScript 解释器
- Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境
- Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效
- Node.js 的包管理器 npm，是全球最大的开源库生态系统
- Node.js 是一门动态语言，运行在服务端的 Javascript

## 版本介绍
- 在命令窗口中输入 node -v 可以查看版本
- 0.x 完全不技术 ES6
- 4.x 部分支持 ES6 特性
- 5.x 部分支持ES6特性（比4.x多些），属于过渡产品，现在来说应该没有什么理由去用这个了
- 6.x 支持98%的 ES6 特性
- 8.x 支持 ES6 特性

## 环境搭建
- [下载安装文件](https://nodejs.org/en/download/)
- 下载完后进行安装，建议安装到默认路径，注意不要有中文路径
- 配置环境变量
- 在命令窗口中输入 node -v，如果正常显示版本号则表示安装成功

### REPL(交互式解释器)
在命令窗口输入 node 后回车，便可进入到 REPL 模式，在这个模式里可以输入 Javascript 的脚本语法，node 会自动将语法执行。类似于在浏览器的开发人员工具的控制台。不同的在于 REPL 是在服务端解析 Javascript，而控制台是在客户端解析 Javascript。按 CTRL + C 可退出 REPL 模式。

### 运行 Node.js
REPL 只适用于一些简单的 Javascript 语法，对于稍复杂的程序，可以直接写到 js 文件当中。在前端可以直接在 html 页面中通过 script 标签引入 js 然后在浏览器运行，则可以通过浏览器来解析 js 文件。在 node 环境下，可通过命令窗口输入命令： node *.js ，便可直接执行 js 文件。

## Node.js 模块
模块系统是 Node.js 最基本也是最常用的。一般情况模块可分为四类：
- 原生模块
- 文件模块
- 第三方模块
- 自定义模块

### 自定义模块

1. 创建模块(b.js)

```javascript
//b.js
function FunA(){
    return 'Tom';
}
//暴露方法 FunA
module.exports = FunA;
```

2. 加载模块(a.js)

```javascript
//a.js
var FunA = require('./b.js');//得到 b.js => FunA
var name = FunA();// 运行 FunA，name = 'Tom'
console.log(name); // 输出结果
```

### module.exports

module.exports 就 Node.js 用于对外暴露，或者说对外开放指定访问权限的一个对象。如上面的案例，如果没有这段代码

```javascript
module.exports = FunA;
```

那么 `require('./b.js')` 就会为 `undefined`。
一个模块中有且仅有一个 `module.exports`，如果有多个那后面的则会覆盖前面的。

### exports

> `exports` 是 `module` 对象的一个属性，同时它也是一个对象。在很多时候一个 js 文件有多个需要暴露的方法或是对象，`module.exports` 又只能暴露一个，那这个时候就要用到 `exports`:

```javascript
function FunA(){
    return 'Tom';
}

function FunB(){
    return 'Sam';
}

exports.FunA = FunA;
exports.FunB = FunB;
```

```javascript
//FunA = exports,exports 是一个对象
var FunA = require('./b.js');
var name1 = FunA.FunA();// 运行 FunA，name = 'Tom'
var name2 = FunA.FunB();// 运行 FunB，name = 'Sam'
console.log(name1);
console.log(name2);
```

当然在引入的时候也可以这样写

```javascript
//FunA = exports,exports 是一个对象
var {FunA, FunB} = require('./b.js');
var name1 = FunA();// 运行 FunA，name = 'Tom'
var name2 = FunB();// 运行 FunB，name = 'Sam'
console.log(name1);
console.log(name2);
```

## npm scripts

### 什么是 npm 脚本

> npm 允许在`package.json`文件里面，使用`scripts`字段定义脚本命令。`package.json` 里面的`scripts` 字段是一个对象。它的每一个属性，对应一段脚本。定义在`package.json`里面的脚本，就称为 `npm` 脚本。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的`npm run`命令。

### 使用

- `npm run` 脚本名称
- 如果是并行执行（即同时的平行执行），可以使用&符号。
`npm run script1.js & npm run script2.js`
- 如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。`npm run script1.js && npm run script2.js`

### 简写形式

- `npm start` 即 `npm run start`
- `npm stop` 即 `npm run stop`
- `npm test` 即 `npm run test`
- `npm restart` 即 `npm run stop && npm run restart && npm run start`

## forever

### forever 介绍

> `forever`是一个简单的命令式`nodejs`的守护进程，能够启动，停止，重启App应用。`forever`完全基于命令行操作，在`forever`进程之下，创建`node`的子进程，通过monitor监控node子进程的运行情况，一旦文件更新，或者进程挂掉，`forever`会自动重启node服务器，确保应用正常运行。

### forever 安装

- 全局安装`forever npm install -g forever`
- 查看`forever`帮助 `forever -h`

### forever 命令行的中文解释

#### 子命令actions：

    - start:启动守护进程
    - stop:停止守护进程
    - stopall:停止所有的forever进程
    - restart:重启守护进程
    - restartall:重启所有的foever进程
    - list:列表显示forever进程
    - config:列出所有的用户配置项
    - set <key> <val>: 设置用户配置项
    - clear <key>: 清楚用户配置项
    - logs: 列出所有forever进程的日志
    - logs <script|index>: 显示最新的日志
    - columns add <col>: 自定义指标到forever list
    - columns rm <col>: 删除forever list的指标
    - columns set<cols>: 设置所有的指标到forever list
    - cleanlogs: 删除所有的forever历史日志

### forever 常用命令
- forever start app.js
- forever stop app.js

### 配置参数options：
    - -m MAX: 运行指定脚本的次数
    - -l LOGFILE: 输出日志到LOGFILE
    - -o OUTFILE: 输出控制台信息到OUTFILE
    - -e ERRFILE: 输出控制台错误在ERRFILE
    - -p PATH: 根目录
    - -c COMMAND: 执行命令，默认是node
    - -a, –append: 合并日志
    - -f, –fifo: 流式日志输出
    - -n, –number: 日志打印行数
    - –pidFile: pid文件
    - –sourceDir: 源代码目录
    - –minUptime: 最小spinn更新时间(ms)
    - –spinSleepTime: 两次spin间隔时间
    - –colors: 控制台输出着色
    - –plain: –no-colors的别名，控制台输出无色
    - -d, –debug: debug模式
    - -v, –verbose: 打印详细输出
    - -s, –silent: 不打印日志和错误信息
    - -w, –watch: 监控文件改变
    - –watchDirectory: 监控顶级目录
    - –watchIgnore: 通过模式匹配忽略监控
    - -h, –help: 命令行帮助信息

## node的部署方案

**pm2**

```
npm install pm2 -g
```

新建一份index.js测试，运行以下命令测试

```
pm2 start index.js
```

**运行**

> 你可以执行以下命令来重启和暂停服务

```
pm2 stop     <app_name|id|'all'|json_conf>
pm2 restart  <app_name|id|'all'|json_conf>
pm2 delete   <app_name|id|'all'|json_conf>
```

> 比如`pm2 stop index.js`，暂停上面的`index.js`服务

**自动重启**

当文件改动则自动重启服务

```
pm2 start app.js --watch
```

这里是监控整个项目的文件，如果只想监听指定文件和目录，建议通过下面配置文件的`watch`、`ignore_watch`字段来设置

**配置文件**

编写一份`ecosystem.json`文件，完整配置说明请参考官方文档

```
{
    "name": "test", // 应用名称
    "script": "./bin/www", // 实际启动脚本
    "cwd": "./", // 当前工作路径
    "watch": [ // 监控变化的目录，一旦变化，自动重启
        "bin",
        "routers"
    ],
    "ignore_watch": [ // 从监控目录中排除
        "node_modules",
        "logs",
        "public"
    ],
    "watch_options": {
        "followSymlinks": false
    },
    "max_memory_restart": "100M", //超过最大内存重启
    "error_file": "./logs/app-err.log", // 错误日志路径
    "out_file": "./logs/app-out.log", // 普通日志路径
    "env": {
        "NODE_ENV": "production" // 环境参数，当前指定为生产环境
    }
}
```

配置完后你可以执行以下命令

```bash
# Start all apps
pm2 start ecosystem.json

# Stop
pm2 stop ecosystem.json

# Restart
pm2 start ecosystem.json
## Or
pm2 restart ecosystem.json

# Reload
pm2 reload ecosystem.json

# Delete from PM2
pm2 delete ecosystem.json
```

这里注意的是配置文件改变了之后要先`delete`再`start`配置文件才能生效

**负载均衡**

命令如下，表示开启三个进程。如果-i 0，则会根据机器当前核数自动开启尽可能多的进程

```
pm2 start app.js -i 3      //开启三个进程
pm2 start app.js -i max //根据机器CPU核数，开启对应数目的进程
```

**日志查看**

除了可以打开日志文件查看日志外，还可以通过pm2 logs来查看实时日志。这点对于线上问题排查非常重要

比如某个node服务突然异常重启了，那么可以通过pm2提供的日志工具来查看实时日志，看是不是脚本出错之类导致的异常重启。

```
pm2 logs
```

**内存使用超过上限自动重启**

> 如果想要你的应用，在超过使用内存上限后自动重启，那么可以加上`--max-memory-restart`参数。（有对应的配置项）

```
pm2 start big-array.js --max-memory-restart 20M
```
