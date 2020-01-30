---
sidebarDepth: 4
pageClass: custom-code-highlight
---

## WebSocket

### 重温 HTTP 协议
HTTP 协议可以总结几个特点：
- 一次性的、无状态的短连接：客户端发起请求、服务端响应、结束。
- 被动性响应：只有当客户端请求时才被执行，给予响应，不能主动向客户端发起响应。
- 信息安全性：得在服务器添加 SSL 证书，访问时用 HTTPS。
- 跨域：服务器默认不支持跨域，可在服务端设置支持跨域的代码或对应的配置。

### 认识 TCP
TCP 协议可以总结几个特点：
- 有状态的长连接：客户端发起连接请求，服务端响应并建立连接，连接会一直保持直到一方主动断开。
- 主动性：建立起与客户端的连接后，服务端可主动向客户端发起调用。
- 信息安全性：同样可以使用 SSL 证书进行信息加密，访问时用 WSS 。
- 跨域：默认支持跨域。

### 认识 WebSocket
WebSocket 目前由 W3C 进行标准化。WebSocket 已经受到 Firefox 4、Chrome 4、Opera 10.70 以及Safari 5 等浏览器的支持。
如果在前端我们可以把 AJAX 请求当作一个 HTTP 协议的实现，那么，WebSocket 就是 UDP 协议的一种实现。

### 服务端 API
- 安装第三方模块 ws：`npm install ws`
- 开启一个 WebSocket 的服务器，端口为 8080
```javascript
var socketServer = require('ws').Server;
var wss = new socketServer({
	port: 8080
});
```
- 也可以利用 Express 来开启 WebSocket 的服务器
```javascript
var app = require('express')();
var server = require('http').Server(app);

var socketServer = require('ws').Server;
var wss = new socketServer({server: server, port: 8080});
```
- 用 on 来进行事件监听
- connection：连接监听，当客户端连接到服务端时触发该事件
- close：连接断开监听，当客户端断开与服务器的连接时触发
- message：消息接受监听，当客户端向服务端发送信息时触发该事件
- send: 向客户端推送信息

```javascript
wss.on('connection', function (client) {
    client.on('message', function (_message) {
    	var _messageObj = JSON.parse(_message);
        //status = 1 表示正常聊天
        _messageObj.status = 1;
    	this.message = _messageObj;
        //把客户端的消息广播给所有在线的用户
        wss.broadcast(_messageObj);
    });

    // 退出聊天  
    client.on('close', function() {  
        try{
            this.message = this.message || {};
            // status = 0 表示退出聊天
            this.message.status = 0;
            //把客户端的消息广播给所有在线的用户
            wss.broadcast(this.message);  
        }catch(e){  
            console.log('刷新页面了');  
        }  
    });  
});

//定义广播方法
wss.broadcast = function broadcast(_messageObj) {  
    wss.clients.forEach(function(client) { 
        client.send(JSON.stringify(_messageObj))
    });  
}; 
```

### 客户端 API

- 在支持 WebSocket 的浏览器下实例化 WebSocket ，参数为 WebSocket 服务器地址，建立与服务器的连接
```javascript
if(!WebSocket){
    $('.connState').text("您的浏览器不支持WebSocket");
    return false;
} 
//连接 socket 服务器
var socket = new WebSocket('ws://localhost:8080');
```
- onopen：当网络连接建立时触发该事件
```javascript
//监听 socket 的连接
socket.onopen = function(){
    $('.connState').text("服务已连接 ws://localhost:8080");
}
```
- onclose：当服务端关闭时触发该事件
```javascript
//监听服务端断开
socket.onclose = function(){
    $('.connState').text("服务已断开");
    socket = null;
}
```
- close: 在客户端断开与服务端的连接 `socket.close();`
- onerror：当网络发生错误时触发该事件
```javascript
//监听服务端异常
socket.onerror = function(){
    $('.connState').text("服务错误");
    socket = null;
}
```
- onmessage：当接收到服务器发来的消息的时触发的事件，也是通信中最重要的一个监听事件
```javascript
//监听服务端广播过来的消息
socket.onmessage = function(msg){
    var msgObj = JSON.parse(msg.data);
    if(msgObj.status == 0){
        $('<p>' + msgObj.nickname + '[' + msgObj.time + ']退出聊天</p>').appendTo('.msgList');
    } else{
        $('<p>' + msgObj.nickname + '[' + msgObj.time + ']：' + msgObj.message + '</p>').appendTo('.msgList');
    }
}
```
- send：向服务端推送消息
```javascript
var sendMessage = function(_mess){
    if(socket){
        var myDate = new Date();
        var now = myDate.getMonth() + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds();				
        
        var mesObj = {
            nickname: $('#nickName').val(),
            message: _mess || $('#mesBox').val(),
            time: now
        }
        //向服务端发送消息
        socket.send(JSON.stringify(mesObj));
    }			
}
```

### 项目应用
该案例是一个多人聊天室

运行步骤
- npm install ws
- node socketServer

案例思路
- 服务端开户一个服务 `new socketServer({port: 8080});`
- 客户端建立和服务端的连接 `var socket = new WebSocket('ws://localhost:8080');`
- 建立连接的同时发送上线信息给服务端 `socket.send('加入聊天');`
- 服务端接受到客户端的消息触发 message 方法，然后将该消息广播给所有在线的用户
- 所有客户端收到来自服务端广播的消息，然后将该消息显示在聊天列表。
- 聊天和退出聊天都是重复着客户端发送消息，服务端接受消息然后向客户端广播消息，客户端显示广播消息。

### Demo

```js
//socketServer
var socketServer = require('ws').Server;

var wss = new socketServer({
	port: 8080
});

// var app = require('express')();
// var server = require('http').Server(app);

// var wss = new socketServer({server: server, port: 8080});

wss.on('connection', function (client) {
    client.on('message', function (_message) {
        var _messageObj = JSON.parse(_message);
        //status = 1 表示正常聊天
        _messageObj.status = 1;
        this.message = _messageObj;
        //把客户端的消息广播给所有在线的用户
        wss.broadcast(_messageObj);
    });

    // 退出聊天  
    client.on('close', function() {  
        try{
            this.message = this.message || {};
            // status = 0 表示退出聊天
            this.message.status = 0;
            //把客户端的消息广播给所有在线的用户
            wss.broadcast(this.message);  
        }catch(e){  
            console.log('刷新页面了');  
        }  
    });  
});

//定义广播方法
wss.broadcast = function broadcast(_messageObj) {  
    wss.clients.forEach(function(client) { 
        client.send(JSON.stringify(_messageObj))
    });  
}; 
```

```html
<!-- socketClient.html -->
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>WebSocket-聊天室</title>
	<script type="text/javascript" src="jquery.js"></script>
	<style type="text/css" media="screen">
		body{font-size: 12px;}
		.chatBox{width: 500px; height: 400px; border: solid 1px #00BCD4;  overflow: hidden;}
		.connState{background-color: #ccc; padding: 5px; color: #9C27B0;}
		.msgList{width: 100%; height: 300px; border-bottom: solid 1px #00BCD4; }
		.msgList>p{margin: 0; padding: 5px;}
		.msgBox{width: 100%; height: 40px; border-bottom: solid 1px #00BCD4;}
		.msgBox>input{width: 100%; padding: 0; border: none; height: 100%; outline: none;}
		.btnBox{padding: 5px; text-align: right;}
	</style>
</head>
<body>
	<div class="chatBox">
		<div class="connState">服务已断开</div>
	    <div class="msgList"></div>
	    <div class="msgBox">
	    	<input type="text" id="mesBox" value="" />
	    </div>		
	    <div class="btnBox">
			昵称：<input type="text" id="nickName" value="" />
	        <input type="button" id="btnConnection" value="连接" />
	        <input type="button" id="btnClose" value="关闭" />
	        <input type="button" id="btnSend" value="发送" />
	    </div>   	    
	</div>

	<script type="text/javascript">
		var socket = null;
		if(!WebSocket){
			$('.connState').text("您的浏览器不支持WebSocket");
		}

		$('#btnConnection').click(function(){
			if(socket){
				return false;
			}
			if(!WebSocket){
				$('.connState').text("您的浏览器不支持WebSocket");
				return false;
			}
			if(!$('#nickName').val()){
				window.alert('昵称不能为空！');
				return false;
			}
			//连接 socket 服务器
			socket = new WebSocket('ws://localhost:8080');
			//监听 socket 的连接
			socket.onopen = function(){
				$('.connState').text("服务已连接 ws://localhost:8080");
				sendMessage('加入聊天');
			}
			//监听服务端广播过来的消息
			socket.onmessage = function(msg){
				var msgObj = JSON.parse(msg.data);
				if(msgObj.status == 0){
					$('<p>' + msgObj.nickname + '[' + msgObj.time + ']退出聊天</p>').appendTo('.msgList');
				} else{
					$('<p>' + msgObj.nickname + '[' + msgObj.time + ']：' + msgObj.message + '</p>').appendTo('.msgList');
				}
			}
			//监听服务端断开
			socket.onclose = function(){
				$('.connState').text("服务已断开");
				socket = null;
			}
			//监听服务端异常
			socket.onerror = function(){
				$('.connState').text("服务错误");
				socket = null;
			}
		});

		$('#btnSend').click(function(){
			sendMessage();
		});
		$('#btnClose').click(function(){
			if(socket){
				socket.close();	
			}
		})

		var sendMessage = function(_mess){
			if(socket){
				var myDate = new Date();
				var now = myDate.getMonth() + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds();				
				
				var mesObj = {
					nickname: $('#nickName').val(),
					message: _mess || $('#mesBox').val(),
					time: now
				}
				socket.send(JSON.stringify(mesObj));
			}			
		}
	</script>
</body>
</html>
```

## Socket.io

### 认识 soket.io

soket.io 可以理解为对 WebSocket 的一种封装。好比前端的 jQuery 对原生 javascript 的封装。
soket.io 依靠事件驱动的模式，灵活的使用了自定义事件和调用事件来完成更多的场景，不必依赖过多的原生事件。

### 服务端 API
- 安装第三方模块 `npm install express socket.io`
- 开户 Socket 服务器，端口为 88
```javascript
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(88);
```
- 用 on 来进行事件监听和定义事件
- connection：监听客户端连接,回调函数会传递本次连接的socket
- emit：触发用客户端的事件
```javascript
io.on('connection', function(client){
	//把当前登录的用户保存到对象 onlinePersons，并向所有在线的用户发起上线提示
    //serverLogin 为自定义事件，供客户端调用
	client.on('serverLogin', function(_person){
		var _personObj = JSON.parse(_person);
		onlinePersons[_personObj.id] = _personObj;
		//向所有在线的用户发起上线提示
		//触发客户端的 clientTips 事件
        //clientTips 为客户端的自定义事件
		io.emit('clientTips', JSON.stringify(onlinePersons));
	})

	//当监听到客户端有用户在移动，就向所有在线用户发起移动信息，触发客户端 clientMove 事件
    //serverMove 为自定义事件，供客户端调用
	client.on('serverMove', function(_person){
		var _personObj = JSON.parse(_person);
		onlinePersons[_personObj.id] = _personObj;
		console.log('serverLogin', onlinePersons);
        //clientTips 为客户端的自定义事件
		io.emit('clientMove', _person);
	});
})
```

### 客户端 API
- 因为 socket.io 是对 websocket 的二次封装，所以需要先引入 socket.io 的 js 库。
- 创建和服务器的连接 `var socket = io.connect('ws://localhost:88');`
- 连接成功后通过 emit 调用服务端的事件 `socket.emit('serverLogin', JSON.stringify(person));`
- 在客户端也同样用 on 来定义事件供服务端调用 `socket.on('clientTips', function(){})`

# 项目应用
该案例是模仿在线游戏
运行步骤
- npm install express socket.io
- node socketServer

案例思路
- 服务端开启服务 
- 在服务端监听客户端的连接 `io.on('connection', function(client){})`
- 在服务端定义上线的事件 `client.on('serverLogin', function(_person){})`，然后将上线的用户属性保存起来
- 客户端连接服务端 `socket = io.connect('ws://localhost:88');`
- 连接成功后将上线的属性发给服务端 `socket.emit('serverLogin', JSON.stringify(person));`
- 服务端接收到客户端上线的用户属性，保存在对象 onlinePersons 上并将此用户广播给所有在线的客户端 `io.emit('clientTips', JSON.stringify(onlinePersons));`
- 客户端接收到来自服务端的新用户，则自动根据属性创建人物 `socket.on('clientTips', function(){})`
- 角色在游戏中移动也是反复将坐标发送给服务器，服务器将新的坐标广播给所有在线的客户端，然后客户端便根据新的坐标移动人物。

### Demo

```js
//socketServer
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

app.use(express.static(path.join(__dirname, '/')));
// app.listen(888);

var onlinePersons = {};// {001: {id: 001, nickname: ''}, 002}

//connection 事件是 socket 本身的事件
io.on('connection', function(client){
	console.log('connection');

	//把当前登录的用户保存到对象 onlinePersons，并向所有在线的用户发起上线提示
	client.on('serverLogin', function(_person){
		var _personObj = JSON.parse(_person);
		onlinePersons[_personObj.id] = _personObj;
		console.log('serverLogin', onlinePersons);
		//向所有在线的用户发起上线提示
		//触发客户端的 clientTips 事件
		io.emit('clientTips', JSON.stringify(onlinePersons));
	})

	//当监听到客户端有用户在移动，就向所有在线用户发起移动信息，触发客户端 clientMove 事件
	client.on('serverMove', function(_person){
		var _personObj = JSON.parse(_person);
		onlinePersons[_personObj.id] = _personObj;
		console.log('serverLogin', onlinePersons);
		io.emit('clientMove', _person);
	});
})

http.listen(88);
```

```html
<!-- socketClient.html -->
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>soket.io-案例</title>
	<script type="text/javascript" src="socket.io.min.js"></script>
	<script type="text/javascript" src="jquery.js"></script>
	<style type="text/css" media="screen">
		body{font-size: 12px; margin: 0; pa}
		div{width: 50px; height: 50px; background-color: #ccc; transition: all 0.8s; position: absolute; left: 0px; top: 0px;}
	</style>
</head>
<body>
	<input type="text" id="nickname">
	<input type="button" id="btnCreate" value="创建角色">


	<script type="text/javascript">
		var person = {}, socket = null;

		$('#btnCreate').click(function(){
			//一、定义人物属性
			person = {
				id: parseInt(Math.random() * 1000000),
				nickname: $('#nickname').val(),
				x: 0,
				y: 0
			}
			//二、创建人物界面隐藏
			$(this).add($('#nickname')).hide();

			// return false;
			// 三、
			//人物创建成功，直接连接服务器登录
			//会触发服务端的 connection 事件
			socket = io.connect('ws://localhost:88');
			
			//四、向服务器推送登录指令，触发服务端的 serverLogin 事件
			socket.emit('serverLogin', JSON.stringify(person));



			//五、上线通知
			//创建所有在线的人物
			socket.on('clientTips', function(_person){
				console.log(_person);
				var _personObj = JSON.parse(_person);
				for(var key in _personObj){
					if(!$('#'+ key)[0])	{
						$('<div></div>').attr('id', _personObj[key].id).css({left: _personObj[key].x, top: _personObj[key].y}).text(_personObj[key].nickname).appendTo('body');				
					}
				}
				//创建人物
			});

			//六、人物移动
			socket.on('clientMove', function(_person){
				var _personObj = JSON.parse(_person);
				$('#' + _personObj.id).css({left: _personObj.x, top: _personObj.y});
			});			

			return false;
		});
		
		$(document).click(function(event){
			if(!socket){
				return false;
			}
			person.x = event.pageX;
			person.y = event.pageY;
			//当人物移动时，触发服务端的 serverMove 事件
			socket.emit('serverMove', JSON.stringify(person));
		})
	</script>
</body>
</html>
```