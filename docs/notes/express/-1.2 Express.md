---
sidebarDepth: 4
pageClass: custom-code-highlight
---

## Express 基础应用

Express 是一个第三方模块，对原生模块封装了一套更灵活、更简洁的应用框架，其在 Node.js 环境的地位和作用好比 jQuery 在前端的地位和作用。

### 路由
在 BS 架构中，路由的概念都是一样的，可理解为根据客户端请求的 URL 映射到不同的方法实现，更多的一般都是针对 URL 中的路径，或者是参数，又或者是锚点这些信息进行映射。

### Express 使用
- 因为 Express 是第三方模块，所以在使用前要先安装 `npm install express`
- 加载模块
```javascript
var express = require('express');
var app = express();
```

- 开启服务器，定义端口8080：
```javascript
app.listen(8080, function(){
	console.log('Server running on http://localhost:8080');
});
```

### GET
- 定义根路由，我们定义端口为 8080，当我们访问：http://localhost:8080/，会自动触发方法，会在页面上显示 Root Page。
- `response.send()` 可理解为 `response.end()`，其中一个不同点在于 `response.send()` 参数可为对象。
- 只有 GET 访问能触发
```javascript
app.get('/', function(request, response){
    response.send('Root Page');
})
```

- 定义 getUsers 路由，当我们访问：http://localhost:8080/getusers，会自动触发方法，会在页面上显示 getUsers Page。
```javascript
app.get('/getUsers', function(request, response){
    response.send('getUsers Page');
})
```

- Node.js 默认是不能访问静态资源文件（*.html、*.js、*.css、*.jpg 等），如果要访问服务端的静态资源文件则要用到方法 `sendFile`
- __dirname 为 Node.js 的系统变量，指向文件的绝对路径。
```javascript
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});
```

#### GET 参数接收之 Query Strings
访问地址：`http://localhost:8080/getusers?username=dk&age=18`，可通过 `request.query` 来获取参数
```javascript
app.get('/getUsers', function(request, response){
    var params = {
        username: request.query.username,
        age: request.query.age
    }
    response.send(params);
})
```
#### GET 参数接收之路径方式
访问地址：`http://localhost:8080/getusers/admin/18`，可通过 `request.params` 来获取参数
```javascript
app.get('/getUsers/:username/:age', function(request, response){
    var params = {
        username: request.params.username,
        age: request.params.age
    }
    response.send(params);
})
```

### POST
- post 参数接收，可依赖第三方模块 body-parser 进行转换会更方便、更简单，该模块用于处理 JSON, Raw, Text 和 URL 编码的数据。
- 安装 body-parser `npm install body-parser`
- 参数接受和 GET 基本一样，不同的在于 GET 是 `request.query` 而 POST 的是 `request.body`
```javascript
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/getUsers', urlencodedParser, function (request, response) {
    var params = {
        username: request.body.username,
        age: request.body.age
    }
   response.send(params);
});
```

### 跨域支持(放在最前面)
```javascript
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});
```

## Express Koa 和 Egg 基础配置

### Express

#### 处理请求

- 处理GET请求：配合`req.query`
- 处理POST请求：需要`body-parser`模块，配合`req.body`

|GET|	POST|	JSONP|	COOKIE|
|---|---|---|---|
|req.query|	req.body|	req.query|	req.cookies|

```js
//npm install express
var express = require('express');
//npm install body-parser
var bodyParser = require("body-parser");
var app = express();
//配置静态文件夹,在本地public读取css,js,html等文件
app.use(express.static('public'));
//post请求需要body-parser模块处理
app.use(bodyParser.urlencoded({
	extended: false
}));
app.get('/', function(req, res) {
	res.send('Hello World!');
});
app.get('/home', function(req, res) {
	//get请求参数对象
	console.log('get请求参数对象:', req.query);
	res.send('get请求');
});
app.post('/home', function(req, res) {
	//post请求参数对象
	console.log('post请求参数对象:', req.body);
	res.send('post请求');
});
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
```

#### 匹配路由参数

```js
app.get('/add/:id/:age', function(req, res) {
	//追加请求头
	res.append("Access-Control-Allow-Origin","*");
	//?id=xx&age=xxx
	console.log(req.query)
	//:id/:age
	console.log(req.params)
	res.send("Hello Oaoafly");
})
```

#### 跨域

可在中间件中追加这句防止跨域

```js
res.append("Access-Control-Allow-Origin","*");
```

#### 模板文件

这个设置视图文件的放置地方，然后配置jade为其模板渲染引擎，这里也需要安装jade模块实现

```js
//views, 放模板文件的目录，比如： 
app.set('views', './views')
//view engine, 模板引擎
app.set('view engine', 'jade')
```

然后安装对应的模板引擎npm包

```
npm install jade
```

然后创建一个views文件夹，并在里面新建一个`xxxx.jade`文件，内容如下

```
html
	head
	body
		h1 这是测试
		p 你好
			ul.hhh#ddd
				for n in news
					li=n.title
```

> 在中间件中添加如下关键代码，res.render("文件名可省略后缀",{需要渲染在模板上的数据})

```js
app.get('/', function(req, res) {
	connection.query("select * from news",function(err,data){
	var content = "Hello Oaoafly";
	res.render("qianfeng",{
		//model
		name:'xie',
		name2:'lan',
		news:data
	    })
	})
	//res.send("<p style='color:red'>"+content+"</p>");
})
```

#### 静态文件

- Express提供了内置的中间件express.static来设置静态文件如：图片， CSS，JavaScript等
- 你可以使用`express.static`中间件来设置静态文件路径
- 例如，如果你将图片， `CSS，JavaScript`文件放在public目录下
- 在`app.js`根目录下创建一个`public`文件夹，然后在代码中添加

```
app.use(express.static('public'));
```

- 设置完静态文件夹后我们可以用`res.sendFile(文件路径)`方法来把文件发送到前端
- 注意路径要用绝对路径`__dirname + "/public/" + "upload.html"`

```js
app.get('/index.html', function (req, res) {
   res.sendFile(__dirname + "/public" + "index.html");
})
```

还有值得注意的一点就是，对于每个应用程序，可以有多个静态目录，比如你可以按上传的文件类型分目录，当我们找某张图片的时候就会从这几个静态文件夹中一起找取

```js
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
```

#### 连接数据库

连接数据库，可以安装mysql模块实现

```js
var mysql = require("mysql");
var connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "asm"
})
//执行数据库连接 .close();
connection.connect();
app.post('/add', function(req, res) {
	//追加请求头
	res.append("Access-Control-Allow-Origin","*");
	console.log(req.body);
	connection.query("insert into news (title,text) values ('" + req.body.title + "','" + req.body.text + "')",function(err,data){
		console.log(data)
	})
	res.send("增加信息");
	
})
```

#### body-parser

```
npm install body-parser
```

然后通过`app.use()`方法调用

```js
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())
```

#### cookie-parser

```
npm install cookie-parser
```

通过`app.use()`方法调用

```
var cookieParser = require('cookie-parser')
app.use(cookieParser())
```

然后在中间件中通过`req.cookies`获取前端页面的`cookie`，是一个通过处理的对象

|module|	description|
|---|---|
|querystring|	将GET请求url中的字符串信息进行转换|
|chalk|	把控制台输出信息的字符串颜色改变|
|body-parser|	将客户端通过POST方法传过来的|req.body数据解析成json数据|
|cookie-parser	|处理cookie信息|
|svg-captcha|用来生成验证码|
|trek-captcha|	用来生成验证码|
|emailjs	|用来通过邮箱找回密码|
|validator	|验证器|
|mongodb|	连接mongodb数据库|
|crypto|	express自带的加密模块|
|express-session	session的认证机制离不开cookie，需要同时使用cookieParser中间件，可以用来保存用户的登陆状态，免密码登陆|
|formidable|	表单文件上传模块|

> [node——常用的模块插件](https://blog.csdn.net/YUHUI01/article/details/81048256)

#### node上传文件

```
npm install multer
```

**引用模块**

它是依赖于express的一个模块

```js
//引用express并配置
var express = require("express");
var app = express();
app.listen(3000);
var multer = require('multer');
/*var upload = multer({
	//如果用这种方法上传，要手动添加文明名后缀
        //如果用下面配置的代码，则可以省略这一句
	dest: 'uploads/'
})*/
```

**配置**

> 设置保存文件的地方，并根据上传的文件名对应文件添加后缀可以通过`filename`属性定制文件保存的格式

|属性值|	用途|
|---|---|
|destination|	设置资源的保存路径。注意，如果没有这个配置项，默认会保存在`/tmp/uploads`下。此外，路径需要自己创建|
|`filename`|	设置资源保存在本地的文件名|

```js
var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建。
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//给图片加上时间戳格式防止重名名
		//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
var upload = multer({
	storage: storage
});
```

**接受文件**

> `upload.single('xxx')`，xxx与表单中的name属性的值对应这里虽然用到post请求，但实际上不需要bodyParser模块处理

```js
app.post('/upload-single', upload.single('logo'), function(req, res, next) {
	console.log(req.file)
	console.log('文件类型：%s', req.file.mimetype);
	console.log('原始文件名：%s', req.file.originalname);
	console.log((req.file.originalname).split("."))
	console.log('文件大小：%s', req.file.size);
	console.log('文件保存路径：%s', req.file.path);
	res.send({
		ret_code: '0'
	});
});
```

**多图上传**

多图上传只要更改一下地方，前端往file输入框加多一个multiple="multiple"属性值，此时就可以在选图的时候多选了，当然也可以并列多个file输入框(不推荐多个上传图片输入框)，这样体验会不好

```html
<input type="file" name="logo" multiple="multiple" />
```

后端也需要相应的改变

```js
app.post('/upload-single', upload.single('logo'), function(req, res, next) {
//upload.single('logo')变为upload.array('logo', 2)，数字代表可以接受多少张图片
app.post('/upload-single', upload.array('logo', 2), function(req, res, next) {
```

如果不想有图片数量上传限制，我们可以用`upload.any()`方法

```js
app.post('/upload-single', upload.any(), function(req, res, next) {	
	res.append("Access-Control-Allow-Origin","*");
	res.send({
		wscats_code: '0'
	});
});
```

**前端部分**

**formData表单提交**

```html
<form action="http://localhost:3000/upload-single" method="post" enctype="multipart/form-data">
	<h2>单图上传</h2>
	<input type="file" name="logo">
	<input type="submit" value="提交">
</form>
```

**formData表单+ajax提交**

```html
<form id="uploadForm">
	<p>指定文件名： <input type="text" name="filename" value="" /></p>
	<p>上传文件： <input type="file" name="logo" /></ p>
	<input type="button" value="上传" onclick="doUpload()" />
</form>
```

> `FormData`对象，是可以使用一系列的键值对来模拟一个完整的表单，然后使用`XMLHttpRequest`发送这个"表单"

**注意点**

- `processData`设置为`false`。因为`data`值是`FormData`对象，不需要对数据做处理。
- `<form>`标签添加`enctype="multipart/form-data"`属性。
- `cache`设置为false，上传文件不需要缓存。
- contentType设置为false。因为是由`<form>`表单构造的FormData对象，且已经声明了属性`enctype="multipart/form-data"`，所以这里设置为false上传后，服务器端代码需要使用从查询参数名为logo获取文件输入流对象，因为`<input>`中声明的是`name="logo"`

```js
function doUpload() {
	$.ajax({
		url: 'http://localhost:3000/upload-single',
		type: 'POST',
		cache: false, //不必须
		data: new FormData($('#uploadForm')[0]),
		processData: false,//必须
		contentType: false,//必须
		success: function(data) {
			console.log(data)
		}
	})
}
```

**改变样式**

可以先隐藏文件上传输入框

```html
<form id="uploadForm">
	<input style="display: none;" type="file" name="logo" onchange="doUpload()" multiple="multiple" />
</form>
```

为需要出发文件上传的标签添加点击事件

```html
<img onclick="uploadImg()" class="headpic" src="" />
```

```js
function uploadImg(){
	$("#uploadForm input").trigger("click");//代理文件上传的事件
}
//触发真正的幕后上传事件
function doUpload() {
        //upload code
}
```

**携带其他参数**

可以用原生的`append`对请求体继续添加内容，既可以上传图片也可以带其他参数

```js
//构造form数据 
var data = new FormData();
data.append("avatar", fileNode.files[0]);
data.append("description", "其他参数");
```

#### 热启动

```
npm install supervisor -g
```

全局安装后，就会有supervisor命令，它会自动检测你的文件变化，一旦变化则会自动重启

```
supervisor app.js
```

#### 过滤器

可以设置对路由的拦截，比如用在登录拦截等

```js
// filter.js
exports.authorize = function(req, res, next) {
	if(req.body.token) {
		//res.redirect('/beauty/test');
		console.log(1)
	} else {
		//res.redirect('/beauty/getFemaleList');
		console.log(2)
		next();
	}
}
```

**路由逻辑**

```
var express = require('express');
var router = express.Router(); //模块化
var filter = require('../filter.js');
router.get('/getFemaleList', filter.authorize, function(req, res) {
	res.send('hello world');
});
```

> 时访问`/getFemaleList`路由的时候就会进入过滤器逻辑，从而实现拦截功能

#### ES6

要让Express在ES6下跑起来就不得不用转码器Babel了。首先新建一个在某目录下新建一个项目。然后跳转到这个目录下开始下面的操作

全局安装

```
npm install --save-dev babel-cli -g
```

然后，可以安装一些presets

```
cnpm install --save-dev babel-preset-es2015 babel-preset-stage-2
```

在package.json里添加运行的脚本，这里就可以用ES6代码写程序，babel自动帮我们转ES5运行

```
"scripts": {
    "start": "babel-node index.js --presets es2015,stage-2"
}
```

> 可以用`babel lib -d dist`命令将router文件夹的所有js转码

```
"scripts": {
    "start": "babel-node --presets es2015,stage-2",
    "build": "babel router -d dist --presets es2015,stage-2",
     "serve": "node dist/index.js"
}
```

#### 脚手架

全局安装

```
npm install -g express-generator@4
```

在一个文件夹里面用express命令创建应用架构

```
express test
cd test
```

进入test文件夹安装依赖，推荐cnpm安装所有依赖

```
npm install
```

启动应用

```
SET DEBUG=test:*
npm start
```

访问在浏览器3000端口号

http://localhost:3000

**创建路由**
- 进入到test目录的routes文件夹,然后复制users.js
- 你可以改变`/home`这里的路径

```js
var express = require('express');
var router = express.Router();
router.get('/home', function(req, res, next) {
  res.send('hello world');
});
module.exports = router;
```

在app.js添加以下两条，该路由就完成了

```js
var homeRouter = require('./routes/home');
//code
app.use('/test', homeRouter);
```

访问该路径

http://localhost:3000/test/home

#### 配合await和async

```
let db = require("../libs/db.js");
router.post('/findUser', async (req, res, next) => {
  let {
    id,
    name,
    skill
  } = req.body
  let data = await db.connect(`select * from students where ?`, [{
    id
  }])
  res.send(data);
});
```

### Koa

> Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序

#### 安装

Koa依赖node v7.6.0或ES2015及更高版本和async方法支持

```
npm i koa
node my-koa-app.js
```

安装完之后可以新建`my-koa-app.js`，然后写以下代码，就可以简单创建一个服务器

```js
const Koa = require('koa');
const app = new Koa();
app.use(async ctx => {
  ctx.body = 'Hello World';
});
app.listen(3000);
```

#### 处理请求和响应

Koa Context将node的request和response对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法，一般将它简写为ctx

```js
ctx.request; // 这是 koa Request
ctx.req; // 这是 node Request
// 注意：绕过 Koa 的 response 处理是 不被支持的. 应避免使用以下 node 属性：res.statusCode, res.writeHead(), res.write(), res.end()

res.statusCode
res.writeHead()
res.write()
res.end()
ctx.request

ctx.response; // 这是 koa Response
ctx.res; // 这是 node Response
```

区别于express框架，是在回调函数里面分开写request和response

为方便起见许多上下文的访问器和方法直接委托给它们的ctx.request或ctx.response，不然的话它们是相同的。 例如ctx.type和ctx.length委托给response对象ctx.path和ctx.method委托给request。所以ctx上面综合封装了多个request和response的方法

下面这个负责响应请求体的数据

```
ctx.response.body=
ctx.body= // 简写
将响应体设置为以下之一：
```

```
string 写入
Buffer 写入
Stream 管道
Object || Array JSON-字符串化
null 无内容响应
```

> 也就是说如果传递数组或者字符串它会自动调用JSON.stringify()来序列化数据，并且response.status如未被设置, Koa将会自动设置状态为200或204。

#### Context

|GET|	POST|	JSONP	|COOKIE|
|---|---|---|---|
|ctx.query|	ctx.request.body|	ctx.query	|ctx.cookies.get(name, [options])|

> 注意post请求需要配合koa-bodyparser模块和`x-www-form-urlencoded`格式，如果是formdata 格式，可以用multer模块来解析

```js
const bodyParser = require('koa-bodyparser'); // 需要先安装koa-bodyparser npm install koa-bodyparser
app.use(bodyParser());
```

Request别名以下访问器和Request别名等效：

```
ctx.header
ctx.headers
ctx.method
ctx.method=
ctx.url
ctx.url=
ctx.originalUrl
ctx.origin
ctx.href
ctx.path
ctx.path=
ctx.query
ctx.query=
ctx.querystring
ctx.querystring=
ctx.host
ctx.hostname
ctx.fresh
ctx.stale
ctx.socket
ctx.protocol
ctx.secure
ctx.ip
ctx.ips
ctx.subdomains
ctx.is()
ctx.accepts()
ctx.acceptsEncodings()
ctx.acceptsCharsets()
ctx.acceptsLanguages()
ctx.get()
```

Response别名,以下访问器和Response别名等效：

```js
ctx.body
ctx.body=
ctx.status
ctx.status=
ctx.message
ctx.message=
ctx.length=
ctx.length
ctx.type=
ctx.type
ctx.headerSent
ctx.redirect()
ctx.attachment()
ctx.set()
ctx.append()
ctx.remove()
ctx.lastModified=
ctx.etag=
```

### Egg

#### 安装

直接使用脚手架，可快速生成项目文件夹

```
npm i egg-init -g
egg-init egg-example --type=simple
cd egg-example
npm i
```

#### 控制器

第一步需要编写的Controller和Router

```js
// app/controller/home.js（编写文件的位置）
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
}
module.exports = HomeController;
```

**配置路由映射**

```js
// app/router.js（编写文件的位置）
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
```

#### 静态资源

- Egg 内置了 static 插件，线上环境建议部署到 CDN，无需该插件
- static 插件默认映射`/public/* -> app/public/*`目录
- 此处，我们把静态资源都放到`app/public`目录即可

> 并且在`plugin.js`添加以下代码

```js
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
```

#### 服务

> 简单来说，Service 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：

- 保持 Controller 中的逻辑更加简洁。
保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
- 将逻辑和展现分离，更容易编写测试用例，测试用例的编写具体可以查看这里。
- 所以我们可以把操作数据库的逻辑放在 Service 层

**定义 Service 文件**

```js
// app/service/user.js
const Service = require('egg').Service;
class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    // 假定这里还有一些复杂的计算，然后返回需要的信息。
    const picture = await this.getPicture(uid);
    return {
      name: user.user_name,
      age: user.age,
      picture,
    };
  }
  async getPicture(uid) {
    const result = await this.ctx.curl(`http://photoserver/uid=${uid}`, { dataType: 'json' });
    return result.data;
  }
}
module.exports = UserService;
```

我们就可以在 Controller 层用this.ctx.service.服务名xxx.方法xxx来调用服务里面封装好的方法

```js
// app/router.js
module.exports = app => {
  app.router.get('/user/:id', app.controller.user.info);
};
// app/controller/user.js
const Controller = require('egg').Controller;
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    ctx.body = userInfo;
  }
}
module.exports = UserController;
```

#### 跨域

> 在`config/config.default.js`添加以下代码

```js
config.security = {
  csrf: {
    enable: false,
    ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
  },
  domainWhiteList: [ 'http://localhost:8000' ],
};
config.cors = {
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
};
```

#### 服务器代理

> 可以使用curl来代替第三方request模块，或者内置的http.request模块来实现服务器代理通讯

```js
class HomeController extends Controller {
  async news() {
    // 今日头条
    const { ctx } = this;
    const {
      data,
    } = await ctx.curl('https://m.toutiao.com/list/?tag=video&ac=wap&count=20&format=json_raw&as=A1457C764A41F74&cp=5C6AC19F07943E1&min_behot_time=0&_signature=1Y7F0AAAieymeM-.Mi2uANWOxc&i=', {
      dataType: 'json',
    });
    ctx.body = data;
  }
}
```

## Express 过滤器

在进入某个路由前先经过一个过滤逻辑，这个称之为过滤器

### 简单使用
```javascript
const express = require('express')
const app = express();

let filter = (req, res, next) => {
    if(req.params.name == 'admin' && req.params.pwd == 'admin'){
        next()
    } else {
        next('用户名密码不正确')
    }
    
}

app.get('/:name/:pwd', filter, (req, res) => {
    res.send('ok')
}).listen(88)
```

### 运行规则
- 访问 `http://localhost:88/admin/admin`
- 首先会进入过滤器方法 filter
- next()，不带任何参数，表示会直接进入目标路由，执行路由逻辑
- next('')，带参数，表示不会进入目标路由，并抛出错误。

### 全局使用--use
表示进入所有目标路由前都会先进入过滤器方法

### 简单使用
```javascript
const express = require('express')
const app = express();

let filter = (req, res, next) => {
    if(req.params.name == 'admin' && req.params.pwd == 'admin'){
        next()
    } else {
        next('用户名密码不正确')
    }
    
}

app.use(filter);

app.get('/:name/:pwd', (req, res) => {
    res.send('ok')
}).listen(88)
```

### 访问所有静态资源文件
```javascript
app.use(express.static(path.join(__dirname, '/')));
```

### 所有 post 使用 body-parser

```javascript
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
```


## Express 文件上传

- body-parser 并不技术文件上传，所以这里要用到另一个第三方模块 multer
- 安装 multer `npm install multer`
- 使用前先定义上传的路径

> 参考 https://github.com/poetries/learn-node/tree/master/uploadFiles


## Express https服务器

### 原生

```js
const https = require('https')
const path = require('path')
const fs = require('fs')

// 根据项目的路径导入生成的证书文件
const privateKey = fs.readFileSync(path.join(__dirname, '../github.key'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, '../github.crt'), 'utf8')
const credentials = {
    key: privateKey,
    cert: certificate,
}

// 创建https服务器实例
const httpsServer = https.createServer(credentials, async (req, res) => {
    res.writeHead(200)
    res.end('Hello World!')
})

// 设置https的访问端口号
const SSLPORT = 8888

// 启动服务器，监听对应的端口
httpsServer.listen(SSLPORT, () => {
    console.log(`HTTPS Server is running on: https://localhost:${SSLPORT}`)
})
```

### Express

```js
const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')
// 根据项目的路径导入生成的证书文件
const privateKey = fs.readFileSync(path.join(__dirname, '../github.key'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, '../github.crt'), 'utf8')
const credentials = {
    key: privateKey,
    cert: certificate,
}
// 创建express实例
const app = express()
// 处理请求
app.get('/', async (req, res) => {
    res.status(200).send('Hello World!')
})
// 创建https服务器实例
const httpsServer = https.createServer(credentials, app)
// 设置https的访问端口号
const SSLPORT = 8889
// 启动服务器，监听对应的端口
httpsServer.listen(SSLPORT, () => {
    console.log(`HTTPS Server is running on: https://localhost:${SSLPORT}`)
})
```