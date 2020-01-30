---
sidebarDepth: 4
pageClass: custom-code-highlight
---

## http 模块

> 所有后端动态语言要想运行起来，都得先搭建服务器。Node.js 搭建服务器需要用到一个原生的模块 http。

1. 加载 `http` 模块
2. 调用 `http.createServer()` 方法创建服务，方法接受一个回调函数，回调函数中有两个参数，第一个是请求体，第二个是响应体。
3. 在回调函数中一定要使用 `response.end()` 方法，用于结束当前请求，不然当前请求会一直处在等待的状态。
4. 调用 `listen` 监听一个端口。

```js
//原生模块
var http = require('http');
var url = require('url');
var querystring = require('querystring');

http.createServer(function(reqeust, response){
	//第二个参数（可省）传入一个布尔值，默认为false，为true时，返回的url对象中，query的属性为一个对象
	var urlObj = url.parse(reqeust.url, false);
	var query = urlObj.query;
	// var qsObj = querystring.parse(query);
	console.log(query);
	response.end('Hello Node');
}).listen(8080);
```

### GET

> 当以 GET 请求服务器的时候，服务器可以通过 `request.mothod` 来判断当前的请求方式并通过 `request.url` 来获取当前请求的参数。

```js
var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain;charset=uft-8'});
 
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end();
 
}).listen(3000);
```

### POST

> 不同于 GET 请求，POST 请求不能通协 url 进行获取，这个时候就需要用到请求体的事件进行监听获取

```js
var http = require('http');
var querystring = require('querystring');
 
http.createServer(function(req, res){
    // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     
 
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
    });
 
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);
```

### Server

```js
var http = require('http');
var url = require('url');
var fs = require('fs');
var util = require('util');
var querystring = require('querystring');

var mimetype = {
  'txt': 'text/plain',
  'html': 'text/html',
  'css': 'text/css',
  'xml': 'application/xml',
  'json': 'application/json',
  'js': 'application/javascript',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif',
  'png': 'image/png',
  'svg': 'image/svg+xml'
}
var page_404 = function(req, res, path){
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.write('<!doctype html>\n');
    res.write('<title>404 Not Found</title>\n');
    res.write('<h1>Not Found</h1>');
    res.write(
    '<p>The requested URL ' +
     path + 
    ' was not found on this server.</p>'
    );
    res.end();
}
var page_500 = function(req, res, error){
    res.writeHead(500, {
      'Content-Type': 'text/html'
    });
    res.write('<!doctype html>\n');
    res.write('<title>Internal Server Error</title>\n');
    res.write('<h1>Internal Server Error</h1>');
    res.write('<pre>' + util.inspect(error) + '</pre>');
    //方法返回 object 的字符串表示，主要用于调试。 附加的 options 可用于改变格式化字符串的某些方面。
}
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var realPath = __dirname +  pathname;

    if(req.method == "POST" && !mimetype[realPath.split('.').pop()]){
      console.log(req.method);
      // 定义了一个post变量，用于暂存请求体的信息
      var post = '';     
   
      // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
      req.on('data', function(chunk){    
          post += chunk;
      });
   
      // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
      req.on('end', function(){    
          post = querystring.parse(post);
          res.end(util.inspect(post));
      });
      return ;      
    }
    fs.exists(realPath, function(exists){
	    if(!exists){
	        return page_404(req, res, pathname);
	    } else {
	        var file = fs.createReadStream(realPath);
          res.writeHead(200, {
             'Content-Type': mimetype[realPath.split('.').pop()] || 'text/plain'
          });
	        file.on('data', res.write.bind(res));
	        file.on('close', res.end.bind(res));      
	        file.on('error', function(err){
	        	return page_500(req, res, err);
	        });
	    }    
    })
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
```

## net 模块

### 网络模型

![162a974b6311ac74](https://user-images.githubusercontent.com/17243165/54249933-dc8cff80-457c-11e9-9e36-615957d636dc.png)

![2478097-09c968bde419d413](https://user-images.githubusercontent.com/17243165/54253099-75754800-4588-11e9-9a34-d9975b97a729.png)

### net、dgram、http、https

Node内置的模块，对应的网络通信方式

|模块|服务|
|-|-|
|net|TCP|
|dgram|UDP|
|http|HTTP|
|https|HTTPS|

### 传输层

- TCP 协议面向有连接，能正确处理丢包，传输顺序错乱的问题，但是为了建立与断开连接，需要至少7次的发包收包，资源浪费
- UDP 面向无连接，不管对方有没有收到，如果要得到通知，需要通过应用层

### 网络层

- 使用 IP 协议，IP 协议基于 IP 转发分包数据
- IP 协议是个不可靠协议，不会重发
- IP 协议发送失败会使用ICMP 协议通知失败
- ARP 解析 IP 中的 MAC 地址，MAC 地址由网卡出厂提供
- IP 还隐含链路层的功能，不管双方底层的链路层是啥，都能通信

### 链路层

驱动

### 物理层

将二进制的0和1和电压高低，光的闪灭和电波的强弱信号进行转换

输入url到页面加载都发生了什么事情？

### 输入url到页面加载都发生了什么事情？

#### 3次握手

- 客户端–发送带有SYN标志的数据包–一次握手–服务端
- 服务端–发送带有SYN/ACK标志的数据包–二次握手–客户端
- 客户端–发送带有带有ACK标志的数据包–三次握手–服务端

#### 4次挥手

- 客户端-发送一个FIN，用来关闭客户端到服务器的数据传送
- 服务器-收到这个FIN，它发回一个ACK，确认序号为收到的序号加1 。和SYN一样，一个FIN将占用一个序号
- 服务器-关闭与客户端的连接，发送一个FIN给客户端
- 客户端-发回ACK报文确认，并将确认序号设置为收到序号加1


```js
输入地址
浏览器查找域名的 IP 地址
这一步包括 DNS 具体的查找过程，包括：浏览器缓存->系统缓存->路由器缓存...
浏览器向 web 服务器发送一个 HTTP 请求
服务器的永久重定向响应（从 http://example.com 到 http://www.example.com）
浏览器跟踪重定向地址
服务器处理请求
服务器返回一个 HTTP 响应
浏览器显示 HTML
浏览器发送请求获取嵌入在 HTML 中的资源（如图片、音频、视频、CSS、JS等等）
浏览器发送异步请求
```

### 状态码

|1XX|2XX|3XX|4XX|5XX|
|-|-|-|-|-|
|信息性状态码|成功状态码|重定向|客户端错误状态码|服务端错误状态码|
|少见|200 OK|301 永久性重定向|400 请求报文语法错误|500服务器请求错误|
||204 响应报文不含实体的主体部分|302 临时性重定向(负载均衡)|401发送的请求需要有通过 HTTP 认证的认证信息 307 和302含义相同|503 服务器暂时处于超负载或正在停机维护，无法处理请求|
||206 范围请求|303 资源存在着另一个 URL，应使用 GET 方法定向获取资源|403 对请求资源的访问被服务器拒绝||
|||304 客户端已经执行了GET，但文件未变化。|404 服务器上没有找到请求的资源||


### http/https

`http`是应用层协议，建立在`TCP/IP`之上，`https`则建立在`TLS、SSL`加密层协议之上，现代web基本都是`http/https`应用。`TCP`在建立连接要发送报文，`http`也是，`http`报文分为请求报文和响应报文，报文格式如下：

<img src="./assets/1.jpeg">

对应的代码如下，注意换行和空格
```js
HTTP/1.0 200 OK    //起始行

Content-type:text/plain    //头部
Content-length:19            //头部  

Hi I'm a message!    //主体
```

Node中`http`模块提供创建基于http协议的网络通信应用的接口，**继承于net模块**，采用事件驱动机制，能与多个客户端保持连接，并不为每个连接开启新的进程或线程，低内存、高并发，性能优良。

### API


#### 创建TCP、UDP客户端和服务端

在Node中，net模块提供创建基于TCP协议的网络通信的API。

首先引入内置`net`模块
```js
var net = require("net")
```
|方法|作用|
|-|-|
|`net.createServer([options][, connectionListener])`|创建一个 TCP 服务器。 参数 connectionListener 自动给 'connection' 事件创建监听器。|
|`net.connect(options[, connectionListener])`|返回一个新的 'net.Socket'，并连接到指定的地址和端口。 当 socket 建立的时候，将会触发 'connect' 事件。|
|`net.createConnection(options[, connectionListener])`|创建一个到端口 port 和 主机 host的 TCP 连接。 host 默认为 'localhost'。|
|`net.connect(port[, host][, connectListener])`|创建一个端口为 port 和主机为 host的 TCP 连接 。host 默认为 'localhost'。 参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。|
|`net.createConnection(port[, host][, connectListener])`|创建一个端口为 port 和主机为 host的 TCP 连接 。host 默认为 'localhost'。 参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。|
|`net.connect(path[, connectListener])`|创建连接到 path 的 unix socket 。参数 connectListener 将会作为监听器添加到 'connect' 事件上。返回 'net.Socket'。|
|`net.createConnection(path[, connectListener])`|创建连接到 path 的 unix socket 。参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。|
|`net.isIP(input)`|检测输入的是否为 IP 地址。 IPV4 返回 4， IPV6 返回 6，其他情况返回 0。|
|`net.isIPv4(input)`|如果输入的地址为 IPV4， 返回 true，否则返回 false。|
|`net.isIPv6(input)`|如果输入的地址为 IPV6， 返回 true，否则返回 false。|

- `net.Socket`类提供了 TCP 或 UNIX Socket 的抽象，
- `net.createServer`用于创建服务端，
- `net.Socket`和`net.connect`用于创建客户端

### net.Server

`net.Server`通常用于创建一个`TCP`或本地服务器。

|方法|作用|
|-|-|
|`server.listen(port[, host][, backlog][, callback])`|监听指定端口 port 和 主机 host ac连接。 默认情况下 host 接受任何 IPv4 地址(INADDR_ANY)的直接连接。端口 port 为 0 时，则会分配一个随机端口。|
|`server.listen(path[, callback])`|通过指定 path 的连接，启动一个本地 socket 服务器。|
|`server.listen(handle[, callback])`|通过指定句柄连接。|
|`server.listen(options[, callback])`|options 的属性：端口 port, 主机 host, 和 backlog, 以及可选参数 callback 函数, 他们在一起调用server.listen(port, [host], [backlog], [callback])。还有，参数 path 可以用来指定 UNIX socket。|
|`server.close([callback])`|服务器停止接收新的连接，保持现有连接。这是异步函数，当所有连接结束的时候服务器会关闭，并会触发 'close' 事件。|
|`server.address()`|操作系统返回绑定的地址，协议族名和服务器端口。|
|`server.unref()`|如果这是事件系统中唯一一个活动的服务器，调用 unref 将允许程序退出。|
|`server.ref()`|与 unref 相反，如果这是唯一的服务器，在之前被 unref 了的服务器上调用 ref 将不会让程序退出（默认行为）。如果服务器已经被 ref，则再次调用 ref 并不会产生影响。|
|`server.getConnections(callback)`|异步获取服务器当前活跃连接的数量。当 socket 发送给子进程后才有效；回调函数有 2 个参数 err 和 count。|

```js
let server = net.createServer((socket) => {});
server.listen(3000, () => {});
```



### net.Socket事件

`net.Socket`对象是 TCP 或 UNIX Socket 的抽象。net.Socket 实例实现了一个双工流接口。 他们可以在用户创建客户端(使用 connect())时使用, 或者由 Node 创建它们，并通过 connection 服务器事件传递给用户。

- listening 当服务器调用 server.listen 绑定后会触发。
- connection 当新连接创建后会被触发。socket 是 net.Socket实例。
- close 服务器关闭时会触发。注意，如果存在连接，这个事件不会被触发直到所有的连接关闭。

|方法|作用|
|-|-|
|`lookup`|在解析域名后，但在连接前，触发这个事件。对 UNIX sokcet 不适用。|
|`connect`|成功建立 socket 连接时触发。|
|`data`|当接收到数据时触发。|
|`end`|当 socket 另一端发送 FIN 包时，触发该事件。|
|`timeout`|当 socket 空闲超时时触发，仅是表明 socket 已经空闲。用户必须手动关闭连接。|
|`drain`|当写缓存为空得时候触发。可用来控制上传。|
|`error`|错误发生时触发。|
|`close`|当 socket 完全关闭时触发。参数 had_error 是布尔值，它表示是否因为传输错误导致 socket 关闭。|

```js
let server = net.createServer((socket) => {
    socket.on('data', (data) => {});
    socket.on('end', () => {});
    socket.on('error', (err) => {});
    socket.on('close', () => {});
});
server.on('close', (socket) => {});
server.on('error', (e) => {});
```

### net.Sockets属性

`net.Socket`提供了很多有用的属性，便于控制`socket`交互：

|||
|-|-|
|`socket.connect(path[, connectListener])`|打开指定路径的 unix socket。通常情况不需要使用 net.createConnection 打开 socket。只有你实现了自己的 socket 时才会用到。|
|`socket.setEncoding([encoding])`|设置编码|
|`socket.write(data[, encoding][, callback])`|在 socket 上发送数据。第二个参数指定了字符串的编码，默认是 UTF8 编码。|
|`socket.end([data][, encoding])`|半关闭 socket。例如，它发送一个 FIN 包。可能服务器仍在发送数据。|
|`socket.destroy()`|确保没有 I/O 活动在这个套接字上。只有在错误发生情况下才需要。（处理错误等等）。|
|`socket.pause()`|暂停读取数据。就是说，不会再触发 data 事件。对于控制上传非常有用。|
|`socket.resume()`|调用 pause() 后想恢复读取数据。|
|`socket.setTimeout(timeout[, callback])`|socket 闲置时间超过 timeout 毫秒后 ，将 socket 设置为超时。|
|`socket.setNoDelay([noDelay])`|禁用纳格（Nagle）算法。默认情况下 TCP 连接使用纳格算法，在发送前他们会缓冲数据。将 noDelay 设置为 true 将会在调用 socket.write() 时立即发送数据。noDelay 默认值为 true。|
|`socket.setKeepAlive([enable][, initialDelay])`|禁用/启用长连接功能，并在发送第一个在闲置 socket 上的长连接 probe 之前，可选地设定初始延时。默认为 false。 设定 initialDelay （毫秒），来设定收到的最后一个数据包和第一个长连接probe之间的延时。将 initialDelay 设为0，将会保留默认（或者之前）的值。默认值为0。|
|`socket.address()`|操作系统返回绑定的地址，协议族名和服务器端口。返回的对象有 3 个属性，比如{ port: 12346, family: 'IPv4', address: '127.0.0.1' }。|
|`socket.unref()`|如果这是事件系统中唯一一个活动的服务器，调用 unref 将允许程序退出。如果服务器已被 unref，则再次调用 unref 并不会产生影响。|
|`socket.ref()`|与 unref 相反，如果这是唯一的服务器，在之前被 unref 了的服务器上调用 ref 将不会让程序退出（默认行为）。如果服务器已经被 ref，则再次调用 ref 并不会产生影响。|


`new net.Socket([options])`构造一个新的`socket`对象。
```js
let server = net.createServer((socket) => {
    socket.setEncoding('utf8');
    socket.write();
    socket.end();
});
```

### TCP模拟HTTP

可以用net模块模拟出http模块的功能

我们还可以在这里可以借助`socket.pipe`配合`fs.createWriteStream`来吧浏览器的数据保存到本地`message.txt`文件中，

在浏览器输入`http://localhost:3000`会返回hello
```js
let net = require('net');
let server = net.createServer({
    // 如果 pauseOnConnect 被设置为 true, 那么与连接相关的套接字都会暂停，也不会从套接字句柄读取数据。 这样就允许连接在进程之间传递，避免数据被最初的进程读取。 如果想从一个暂停的套接字开始读数据
    pauseOnConnect: true
}, (socket) => {
    socket.setEncoding('utf8');
    socket.on('data', (data) => {
        console.log(data);
    });
    socket.on('end', () => {
        console.log('client disconnected');
    });
    //接收到客户端发送的错误就会调用   
    socket.on('error', (err) => {
        console.log("error");
    });
    socket.on('close', () => {
        console.log("close socket");
    });
    socket.end(`
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 5

hello`)
    console.log('request');
});

server.listen(3000, () => {
    console.log('opened server on', server.address({}));
});
server.on('connection', (socket) => {
    console.log('connection');
});

//server.unref();//停止node对server的监听事件
//服务器关闭事件
server.on('close', (socket) => {
    console.log('close server');
});
server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(PORT, HOST);
        }, 1000);
    }
});
```
用`postman`测试，记录在`message.txt`的格式为
```js
POST /abc HTTP/1.1
Content-Type: multipart/form-data; boundary=--------------------------879095998142409176007484
abc: 123
bbb: ccc
ddd: eee
token: eyJkYXRhIjp7ImlucHV0RW1haWwiOiJsZW1vbiIsImlucHV0UGFzc3dvcmQiOiIxMjMifSwiY3JlYXRlZCI6MTU0NzA0MTEyMCwiZXhwIjo2MH0=.jP/Nm3RMzy6MGnH5uHWuvTkFZp94Bm5tMfDhhdRxlaM=
cache-control: no-cache
Postman-Token: 97b4950a-1169-407b-8787-ab238d3954d4
User-Agent: PostmanRuntime/7.6.0
Accept: */*
Host: localhost:3000
cookie: csrfToken=58RWUaRa3ZuA2uIp7cxn34pC
accept-encoding: gzip, deflate
content-length: 157
Connection: keep-alive

----------------------------879095998142409176007484
Content-Disposition: form-data; name="x"

x
----------------------------879095998142409176007484--
```
从[net源码](https://github.com/nodejs/node/blob/master/lib/_http_server.js)中我们也可以看到这些设置，从中我们得知`http`模块是真的基于`net`模块实现的
```js
var statusLine = `HTTP/1.1 ${statusCode} ${this.statusMessage}${CRLF}`; // line 252

function Server(options, requestListener) {
  net.Server.call(this, { allowHalfOpen: true });
  if (requestListener) {
    this.on('request', requestListener);
  }
} // line 283

net.Server.call(this, { allowHalfOpen: true }); //line 298
```

### Demo

#### demo1

```js
let net = require('net');
let server = net.createServer();
// 新版用server.getConnections(callback)代替
// let file = require('fs').createWriteStream('./message.txt');
server.on('connection', (socket) => {
    socket.setEncoding('utf8');
    socket.on('data', (data) => {
        console.log(data);
        server.emit('request', socket);
    });
    socket.on('end', () => {
        console.log('client disconnected');
    });
    // 可以执行写入流
    // socket.pipe(file, {
    //     end: false
    // });
    socket.on("close", () => {
        console.log("close socket");
    });
    
})
server.on('request', function (socket) {
    socket.write('');
    socket.end(`
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 5

hello`)
    console.log('request');
})

// Grab an arbitrary unused port.
server.listen(3000, () => {
    console.log('opened server on', server.address({}));
});
server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(PORT, HOST);
        }, 1000);
    }
});
```

#### demo2

```js
let net = require('net');
let {
    StringDecoder
} = require('string_decoder');
let {
    Readable
} = require('stream');
class IncomingMessage extends Readable {
    _read() {}
}

function parser(socket, callback) {
    let buffers = [];
    let sd = new StringDecoder();
    let im = new IncomingMessage();

    function fn() {
        // 伪造响应头和响应体，类似http的request
        let res = {
            write: socket.write.bind(socket),
            end: socket.end.bind(socket)
        }
        let content = socket.read();
        if (content) {
            buffers.push(content);
            let str = sd.write(Buffer.concat(buffers));
            if (str.match(/\r\n\r\n/)) {
                let result = str.split('\r\n\r\n');
                let head = parserHeader(result[0]);
                // im = {...im,...head}
                Object.assign(im, head);
                socket.removeListener('readable', fn);
                socket.unshift(Buffer.from(result[1]));
                if (result[1]) {
                    socket.on('data', function (data) {
                        im.push(data);
                        im.push(null);
                        callback(im, res);
                    });
                } else {
                    im.push(null);
                    callback(im, res);
                }
            }
        }
    }
    socket.on('readable', fn)
}
// 伪造请求头和请求体，类似http的request
function parserHeader(head) {
    let lines = head.split(/\r\n/);
    let start = lines.shift();
    let method = start.split(' ')[0];
    let url = start.split(' ')[1];
    let httpVersion = start.split(' ')[2].split('/')[1];
    let headers = {};
    lines.forEach(line => {
        let row = line.split(': ');
        headers[row[0]] = row[1];
    });
    return {
        url,
        method,
        httpVersion,
        headers
    }
}
let server = net.createServer(function (socket) {
    parser(socket, function (req, res) {
        server.emit('request', req, res);
    });
});
server.on('request', function (req, res) {
    console.log(req.url);
    console.log(req.headers);
    console.log(req.httpVersion);
    console.log(req.method);

    req.on('data', function (data) {
        console.log('ok', data.toString());
    });
    req.on('end', function () {
        res.end(`
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 5

hello`)
    });
})
server.on('connection', function () {
    console.log('建立连接');
});
server.listen(3000);
```

#### demo3

```js
let net = require('net');
let server = net.createServer({
    // 如果 pauseOnConnect 被设置为 true, 那么与连接相关的套接字都会暂停，也不会从套接字句柄读取数据。 这样就允许连接在进程之间传递，避免数据被最初的进程读取。 如果想从一个暂停的套接字开始读数据
    pauseOnConnect: true
}, (socket) => {
    socket.setEncoding('utf8');
    socket.on('data', (data) => {
        console.log(data);
    });
    socket.on('end', () => {
        console.log('client disconnected');
    });
    //接收到客户端发送的错误就会调用   
    socket.on('error', (err) => {
        console.log("error");
    });
    socket.on('close', () => {
        console.log("close socket");
    });
    socket.end(`
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 5

hello`)
    console.log('request');
});

server.listen(3000, () => {
    console.log('opened server on', server.address({}));
});
server.on('connection', (socket) => {
    console.log('connection');
});

//server.unref();//停止node对server的监听事件
//服务器关闭事件
server.on('close', (socket) => {
    console.log('close server');
});
server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(PORT, HOST);
        }, 1000);
    }
});
```

### 参考文档

- [Node学习记录：网络编程](https://segmentfault.com/a/1190000009469920)
- [基于tcp的http应用，断点续传，范围请求](https://juejin.im/post/5b3b35ce5188251a9e16cb4c)

## url 模块

### url 模块

请求的 url 都是字符串类型，url 所包含的信息也比较多，比如有：协议、主机名、端口、路径、参数、锚点等，如果对字符串解析这些信息的话，会相对麻烦，因此，Node.js 的原生模块 url 模块便可轻松解决这一问题

### 字符串转对象
- 格式：url.parse(urlstring, boolean)
- 参数
    - urlstring：字符串格式的 url
    - boolean：在 url 中有参数，默认参数为字符串，如果此参数为 true，则会自动将参数转转对象
- 常用属性
    - href： 解析前的完整原始 URL，协议名和主机名已转为小写
    - protocol： 请求协议，小写
    - host： url 主机名，包括端口信息，小写
    - hostname: 主机名，小写
    - port: 主机的端口号
    - pathname: URL中路径，下面例子的 /one
    - search: 查询对象，即：queryString，包括之前的问号“?”
    - path: pathname 和 search的合集
    - query: 查询字符串中的参数部分（问号后面部分字符串），或者使用 querystring.parse() 解析后返回的对象
    - hash: 锚点部分（即：“#”及其后的部分）

```javascript
var url = require('url');

//第二个参数为 true => {a: 'index', t: 'article', m: 'default'}
var urlObj = url.parse('http://www.dk-lan.com/one?a=index&t=article&m=default#dk', true);
//urlObj.query 为一个对象
console.log(urlObj);

//第二个参数为 false
urlObj = url.parse('http://www.dk-lan.com/one?a=index&t=article&m=default#dk', false);
//urlObj.query 为一个字符串 => ?a=index&t=article&m=default
console.log(urlObj);
```

### 对象转字符串
- 格式：url.format(urlObj)
- 参数 urlObj 在格式化的时候会做如下处理
    - href: 会被忽略，不做处理
    - protocol：无论末尾是否有冒号都会处理，协议包括 http, https, ftp, gopher, file 后缀是 :// (冒号-斜杠-斜杠)
    - hostname：如果 host 属性没被定义，则会使用此属性
    - port：如果 host 属性没被定义，则会使用此属性
    - host：优先使用，将会替代 hostname 和port
    - pathname：将会同样处理无论结尾是否有/ (斜杠)
    - search：将会替代 query属性，无论前面是否有 ? (问号)，都会同样的处理
    - query：(object类型; 详细请看 querystring) 如果没有 search,将会使用此属性.
    - hash：无论前面是否有# (井号, 锚点)，都会同样处理

```javascript
var url = require('url');

var urlObj = { 
    firstname: 'dk',
    url: 'http://dk-lan.com',
    lastname: 'tom',
    passowrd: '123456' 
}
var urlString = url.format(urlObj);
console.log(urlString);
```

### url.resolve
当有多个 url 需要拼接处理的时候，可以用到 url.resolve
```javascript
var url = require('url');
url.resolve('http://dk-lan.com/', '/one')// 'http://dk-lan.com/one'
```

### Demo

```js
var url = require('url');

var _parse = url.parse('http://www.dk-lan.com:8080/p/a/t/h?query=string#hash', false, false);

console.log(_parse);

/*
http://www.dk-lan.com:8080/p/a/t/h?query=string#hash

解析后对象字段如下：

href: 解析前的完整原始 URL，协议名和主机名已转为小写
例如: 'http://www.dk-lan.com:8080/p/a/t/h?query=string#hash'

protocol: 请求协议，小写
例如: 'http:'

slashes: 协议的“：”号后是否有“/”

例如: true or false

host: URL主机名，包括端口信息，小写
例如: 'dk-lan.com:8080'

auth: URL中的认证信息
例如: 'user:pass'

hostname: 主机名，小写
例如: 'dk-lan.com'

port: 主机的端口号
例如: '8080'

pathname: URL中路径
例如: '/p/a/t/h'

search: 查询对象，即：queryString，包括之前的问号“?”
例如: '?query=string'

path: pathname 和 search的合集
例如: '/p/a/t/h?query=string'

query: 查询字符串中的参数部分（问号后面部分字符串），或者使用 querystring.parse() 解析后返回的对象
例如: 'query=string' or {'query':'string'}

hash: 锚点部分（即：“#”及其后的部分）
例如: '#hash'
 */

var urlObj = { 
  	protocol: 'http:',
    slashes: true,
    hostname: 'dk-lan.com',
    port: 80,
    hash: '#hash',
    search: '?query=string',
    path: '/nodejs?query=string'
}
var result = url.format(urlObj);
console.log(result);

//输出结果：http://dk-lan.com:80?query=string#hash

/*
*传入的URL对象会做以下处理：
*
*href 属性会被忽略
*protocol无论是否有末尾的 : (冒号)，会同样的处理
*这些协议包括 http, https, ftp, gopher, file 后缀是 :// (冒号-斜杠-斜杠).
*所有其他的协议如 mailto, xmpp, aim, sftp, foo, 等 会加上后缀 : (冒号)
*auth 如果有将会出现.
*hostname 如果 host 属性没被定义，则会使用此属性.
*port 如果 host 属性没被定义，则会使用此属性.
*host 优先使用，将会替代 hostname 和port
*pathname 将会同样处理无论结尾是否有/ (斜杠)
*search 将会替代 query属性
*query (object类型; 详细请看 querystring) 如果没有 search,将会使用此属性.
*search 无论前面是否有 ? (问号)，都会同样的处理
*hash无论前面是否有# (井号, 锚点)，都会同样处理
*/

// url.resolve('/one/two/three', 'four')         // '/one/two/four'
// url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
// url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
// url.resolve()方法用于处理URL路径，也可以用于处理锚点。
```

## querystring 模块

### querystring 查询(参数)模块
GET 请求时参数都来自 URL，而 URL 都是字符串格式，为了方便操作，可以把字符串格式的参数通过 querystring 转换格式

##字符串转对象
```javascript
var str = 'firstname=dk&url=http%3A%2F%2Fdk-lan.com&lastname=tom&passowrd=123456';
var param = querystring.parse(param);
//结果
//{firstname:"dk", url:"http://dk-lan.com", lastname: 'tom', passowrd: 123456};
```

### 对象转字符串
```javascript
var querystring = require('querystring');

var obj = {firstname:"dk", url:"http://dk-lan.com", lastname: 'tom', passowrd: 123456};
//将对象转换成字符串
var param = querystring.stringify(obj);
//结果
//firstname=dk&url=http%3A%2F%2Fdk-lan.com&lastname=tom&passowrd=123456
```

### Demo

```js
var querystring = require('querystring');


//http://xxx.com?name=&passwod
//
var obj={firstname:"dk",url:"http://dk-lan.com", lastname: 'tom', passowrd: 123456};

//将对象转换成字符串
var param= querystring.stringify(obj);
//没有指定分隔符和分配符,并且自动编码汉字
console.log(param);

//将字符串转换成对象
var newobj=querystring.parse(param);
console.log(newobj);
```

## events 模块

事件模块在 Node.js 中有很多好处，但用法却可以很简单
- Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。
- Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。
- Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。
- Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.
- 用法
    - 实例化一个事件实例 new events.EventEmitter();
    - 在实例对象上定义事件 on(eventname, function(){})
    - 通地 emit 方法触发事件 emit(eventname)

```javascript
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 绑定事件及事件的处理程序
eventEmitter.on('connection', function(){
    console.log('连接成功。');
	// 触发 data_received 事件 
	eventEmitter.emit('data_received');
});

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
	console.log('数据接收成功。');
});

//用 eventEmitter 对象的 emit 方法来调用事件
eventEmitter.emit('connection');
console.log("程序执行完毕。");
```

### Demo

```js
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// $('div').on('dk', function(){});


// 绑定事件及事件的处理程序
eventEmitter.on('connection', function(){
	setTimeout(function(){
		console.log('连接成功。');
	}, 1000);
	
	// 触发 data_received 事件 
	eventEmitter.emit('data_received');
});

//trigger => emit
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
	console.log('数据接收成功。');
});

//用 eventEmitter 对象的 emit 方法来调用事件
eventEmitter.emit('connection');
console.log("程序执行完毕。");
```

## fs 模块

出于安全因互，javascript 是不能操作本地文件，所以文件的处理都会放到服务端去处理。Node.js 作为一门后端动态语言，同样具备了操作文件的功能，这一操作需要用到 Node.js 的原生模块：fs。

### 读取文本 -- 异步读取
```javascript
var fs = require('fs');
// 异步读取
// 参数1：文件路径，
// 参数2：读取文件后的回调
fs.readFile('demoFile.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步读取: " + data.toString());
});
```

### 读取文本 -- 同步读取
```javascript
var fs = require('fs');
var data = fs.readFileSync('demoFile.txt');
console.log("同步读取: " + data.toString());
```

### 写入文本 -- 覆盖写入
```javascript
var fs = require('fs');
//每次写入文本都会覆盖之前的文本内容
fs.writeFile('input.txt', '抵制一切不利于中国和世界和平的动机！',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
```

### 写入文本 -- 追加写入
```javascript
var fs = require('fs');
fs.appendFile('input.txt', '愿世界和平！', function (err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
```

### 图片读取
图片读取不同于文本，因为文本读出来可以直接用 console.log() 打印，但图片则需要在浏览器中显示，所以需要先搭建 web 服务，然后把以字节方式读取的图片在浏览器中渲染。

1. 图片读取是以字节的方式
2. 图片在浏览器的渲染因为没有 img 标签，所以需要设置响应头为 image

```javascript
var http = require('http');
var fs = require('fs');
var content =  fs.readFileSync('001.jpg', "binary");

http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'image/jpeg'});
	response.write(content, "binary");
	response.end();
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');
```

### Demo

#### Demo1 read

```js
var fs = require('fs');

// 异步读取
// 参数1：文件路径，
// 参数2：读取文件后的回调
fs.readFile('demoFile.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   // console.log(data.toString());
   console.log("异步读取: " + data.toString());
});

// 同步读取
// var data = fs.readFileSync('demoFile.txt');
// console.log("同步读取: " + data.toString());

// console.log("程序执行完毕。");
```

#### Demo2 write

```js
var fs = require('fs');

// console.log("准备写入文件");
//参数1：文件路径
//参数2：写入的文本
//参数3：回调
//writeFiel 是覆盖写入文本
// fs.writeFile('input.txt', '抵制一切不利于中国和世界和平的动机',  function(err) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("数据写入成功！");
//    console.log("--------我是分割线-------------")
//    console.log("读取写入的数据！");
//    fs.readFile('input.txt', function (err, data) {
//       if (err) {
//          return console.error(err);
//       }
//       console.log("异步读取文件数据: " + data.toString());
//    });
// });

// 追加文本
fs.appendFile('input.txt', '，+++++....1', function (err) {

});
```

#### Demo4 readImg

```js
var http = require('http');
var fs = require('fs');
var content =  fs.readFileSync('001.jpg', "binary");

http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'image/jpeg'});
	response.write(content, "binary");
	response.end();
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```

## stream 模块

### Stream 介绍
Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。往往用于打开大型的文本文件，创建一个读取操作的数据流。所谓大型文本文件，指的是文本文件的体积很大，读取操作的缓存装不下，只能分成几次发送，每次发送会触发一个data事件，发送结束会触发end事件。

### 读取流
```javascript
var fs = require("fs");
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');
// console.log(readerStream);


// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

### 写入流
创建一个可以写入的流，写入到文件 output.txt 中
```javascript
var fs = require("fs");
var data = '中国';

// 创建一个可以写入的流，写入到文件 output.txt 中
// var writerStream = fs.createWriteStream('output.txt', {'flags': 'a'}); //追加文本
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

### 管道流

管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。我们把文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。以下实例我们通过读取一个文件内容并将内容写入到另外一个文件中。

```javascript
var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流 
// {'flags': 'a'}//追加文本
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");
```

### 链式流
链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。接下来我们就是用管道和链式来压缩和解压文件。

### 压缩
```javascript
var fs = require("fs");
//压缩和解压的模块
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
// 以流的方式读取文本
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip()) //把读取出来的文本调用压缩模块进行压缩
  .pipe(fs.createWriteStream('input.zip'));//把压缩好的流进行保存
  
console.log("文件压缩完成。");
```

### 解压
```javascript
var fs = require("fs");
//压缩和解压的模块
var zlib = require('zlib');

fs.createReadStream('input.zip')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input1.txt'));
  
console.log("文件解压完成。")
```

### Demo

#### Demo1 readStream

```js
var fs = require("fs");
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');
// console.log(readerStream);


// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

#### Demo2 writeStream

```js
var fs = require("fs");
var data = '中国';

// 创建一个可以写入的流，写入到文件 output.txt 中
// var writerStream = fs.createWriteStream('output.txt', {'flags': 'a'}); //追加文本
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

#### Demo3 pipeStream

```js
/*
管道流
管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
我们把文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。
以下实例我们通过读取一个文件内容并将内容写入到另外一个文件中。
 */
var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流 
// {'flags': 'a'}//追加文本
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");
```

#### Demo4 linkStream

```js
/*
链式流
链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。
接下来我们就是用管道和链式来压缩和解压文件。
 */
//压缩
var fs = require("fs");
//压缩和解压的模块
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
// 以流的方式读取文本
// fs.createReadStream('input.txt')
//   .pipe(zlib.createGzip()) //把读取出来的文本调用压缩模块进行压缩
//   .pipe(fs.createWriteStream('input.txt.zip'));//把压缩好的流进行保存
  
// console.log("文件压缩完成。");

// //解压
// var fs = require("fs");
// var zlib = require('zlib');

// // 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.zip')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input1.txt'));
  
console.log("文件解压完成。")
```

## cheerio 模块

> node原生模块爬虫和request爬虫方案

```js
//原生http模块，用于请求文件或者创建服务器
var http = require("http");
//原生fs模块，用于读写文件
var fs = require("fs")
//调用cheerio模块，类似于jquery
var cheerio = require("cheerio")
//调用mysql第三方模块
var mysql = require("mysql")
//进行数据库连接
var connection = mysql.createConnection({
	host: 'localhost', //localhost
	user: 'test',
	password: '123456789',
	database: 'laoyao'
});

//执行连接
connection.connect();
//此函数用于获取需要被爬虫的网页DOM结构
function download(url, callback) {
	http.get(url, function(res) {
		var data = "";
		res.on('data', function(chunk) {
			data += chunk
		})
		res.on('end', function() {
			callback(data);
		})
	})
}

download("http://www.mmjpg.com/", function(data) {
	//将网页信息交给cheerio处理，类似于jquery处理DOM结构
	var $ = cheerio.load(data);
	var imgArr = [];
	//遍历图片信息，并执行存储
	$('img').each(function(index, ele) {
		var src = $(ele).attr("src");
		//把数据插入到数据库
		connection.query('INSERT INTO `meizi`(`src`) VALUES ("' + src + '")', function(error, results, fields) {
			if(error) throw error;
		});
		imgArr.push(src);
	})
	//执行下载图片
	downloadImg(imgArr)
})
var i = 0;
function downloadImg(imgArr) {
	var lenth = imgArr.length;
	var writerStream = fs.createWriteStream('img/'+i+'.jpg');
	http.get(imgArr[i], function(res) {
		res.pipe(writerStream);
		if(i<lenth){
			i++;
			//递归执行图片下载，确保每一张图片下载完再下载下一张
			downloadImg(imgArr)		
		}else{
			return;
		}
	})
}
```

## mocha 模块(单元测试)

### TDD与BDD的区别

TDD属于测试驱动开发，BDD属于行为驱动开发。个人理解其实就是TDD先写测试模块，再写主功能代码，然后能让测试模块通过测试，而BDD是先写主功能模块，再写测试模块

### 目录结构

```
.
├── index.js
├── node_modules
├── package.json
└── test
    └── test.js
```

### mocha

安装mocha
```js
npm install mocha -g // 需要在全局下安装Mocha
npm install mocha chai --save-dev
```

index.js
```js
const getNum = (value) => {
  return value * 2
}

module.exports = getNum
```
新建一个`test`文件夹放入`test.js`，以后可以在这里写其他单元测试的文件，`describe()`用于给测试用例分组，`it`代表一个测试用例
```js
const chai = require('chai')
const expect = chai.expect
const getNum = require('../index')

describe('Test', function() {
  it('should return 20 when the value is 10', function() {
      expect(getNum(10)).to.equal(20)
  })
})
```
项目目录下运行`test.js`
```js
mocha
```

### istanbul

完成代码测试之后我们再去看看代码测试的覆盖率。测试代码覆盖率我们选择使用istanbul，全局安装

```js
npm install -g istanbul
```
使用istanbul启动Mocha
```js
istanbul cover _mocha
```

- 行覆盖率（line coverage）：是否每一行都执行了？
- 函数覆盖率（function coverage）：是否每个函数都调用了？
- 分支覆盖率（branch coverage）：是否每个if代码块都执行了？
- 语句覆盖率（statement coverage）：是否每个语句都执行了？

修改`index.js`再看代码覆盖率
```js
const getNum = (value) => {
  if(value === 0) {
    return 1
  }else {
    return value * 2
  }
}

module.exports = getNum
```

修改`test.js`添加测试用例
```js
describe('Test', function() {
  it('should return 20 when the value is 10', function() {
      expect(getNum(10)).to.equal(20)
  })
  it('should return 1 when the value is 0', function() {
    expect(getNum(0)).to.equal(1)
  })
})
```
代码覆盖率又回到了100%

### Demo

```js
const chai = require('chai')
const expect = chai.expect
const getNum = require('../index')

describe('Test', function () {
    it('should return 20 when the value is 10', function () {
        expect(getNum(10)).to.equal(20)
    })
    it('should return 1 when the value is 0', function () {
        expect(getNum(0)).to.equal(1)
    })
})
```

