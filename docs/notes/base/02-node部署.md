
## 一、forever

> `forever`则可以在`cmd`或`ssh`连接断开时,让项目一直运行,而且可以在项目崩溃时自动重启

- 安装 `npm install -g forever`
- `forever`的帮助手册  `forever --help`
- 使用`forever`启动项目 `forever start app.js`
- 使用`forever`停止项目 `forever stop app.js`
- 列出所有通过`forever`管理的项目 `forever list`
- 监视项目中的文件,当文件有变动时重启项目 `forever -w start app.js`


## 二、pm2

> 部署参考 http://blog.poetries.top/2018/11/18/react-ssr-next-deploy/


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

**常用命令**

- 运行` pm2 start app.js`
- 查看运行状态 `pm2 list`
- 追踪资源运行情况 `pm2 monit`
- 查看日志 `pm2 logs`
- 重启应用 `pm2 restart appId`
- 停止应用  `pm2 stop app.js`
- 开启`api`访问 `pm2 web`

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


**pm2与forever对比**

|Feature|	Forever	|PM2|
|----|----|----|
|Keep Alive	|✔|	✔|
|Coffeescript|✔|	|
|Log aggregation	||	✔|
|API	|	|✔|
|Terminal monitoring	||	✔|
|Clustering	||	✔|
|JSON configuration| |		✔|


