---
sidebarDepth: 4
pageClass: custom-code-highlight
---

## Session
Session 是一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 Session 保存在服务器上的进程中。

客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是 Session。客户端浏览器再次访问时只需要从该 Session 中查找该客户的状态就可以了。

如果说 Cookie 机制是通过检查客户身上的“通行证”来确定客户身份的话，那么 Session 机制就是通过检查服务器上的“客户明细表”来确认客户身份。

Session 相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

Session 不能跨域

### Session 与 Cookie 的区别

- Cookie 数据存放在客户的浏览器上，Session 数据放在服务器上的进程中。
- Cookie 不是很安全，别人可以分析存放在本地的 Cookie 并进行 Cookie 欺骗 考虑到安全应当使用 Session。
- Session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
- 单个 Cookie 保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个 Cookie。

### Session 应用
```javascript
const express = require('express')
const path = require('path')
const app = express();

const bodyParser = require('body-parser');

const cp = require('cookie-parser');
const session = require('express-session');

app.use(cp());
app.use(session({
    secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 5000 },  //设置maxAge是5000ms，即5s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,    
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/')));

app.get('/setsession', (request, response) => {
    request.session.user = {username: 'admin'};
    response.send('set session success');
})

app.get('/getsession', (request, response) => {
    response.send(request.session.user);
})

app.get('/delsession', (request, response) => {
    delete reqeust.session.user;
    response.send(request.session.user);
})

app.listen(88)
```

## Token

### Token
在计算机身份认证中是令牌（临时）的意思，在词法分析中是标记的意思。一般我们所说的的 token 大多是指用于身份验证的 token

### Token的特点
- 随机性
- 不可预测性
- 时效性
- 无状态、可扩展
- 跨域

### 基于Token的身份验证场景
1. 客户端使用用户名和密码请求登录
2. 服务端收到请求，验证登录是否成功
3. 验证成功后，服务端会返回一个 Token 给客户端，反之，返回身份验证失败的信息
4. 客户端收到 Token 后把 Token 用一种方式(cookie/localstorage/sessionstorage/其他)存储起来
5. 客户端每次发起请求时都选哦将 Token 发给服务端
6. 服务端收到请求后，验证Token的合法性，合法就返回客户端所需数据，反之，返回验证失败的信息

### Token 身份验证实现 —— jsonwebtoken
先安装第三方模块 jsonwebtoken `npm install jsonwebtoken`
```javascript
const express = require('express')
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/')));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Auth, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
          res.sendStatus(200);/*让options请求快速返回*/
    } else{
          next();
    }
});


app.get('/createtoken', (request, response) => {
    //要生成 token 的主题信息
    let user = {
        username: 'admin',
    }
    //这是加密的 key（密钥）
    let secret = 'dktoken';
    //生成 Token
    let token = jwt.sign(user, secret, {
        'expiresIn': 60*60*24 // 设置过期时间, 24 小时
    })      
    response.send({status: true, token});
})

app.post('/verifytoken', (request, response) => {
    //这是加密的 key（密钥），和生成 token 时的必须一样
    let secret = 'dktoken';
    let token = request.headers['auth'];
    if(!token){
        response.send({status: false, message: 'token不能为空'});
    }
    jwt.verify(token, secret, (error, result) => {
        if(error){
            response.send({status: false});
        } else {
            response.send({status: true, data: result});
        }
    })
})

app.listen(88)
```

### 前端 ajax 请求时在请求头中包含 Token
#### ajax 请求之 jQuery 篇
```javascript
$.ajax({
    url: 'verifytoken',
    type: 'post',
    headers: {"auth": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTIzNTQwNjY5LCJleHAiOjE1MjM2MjcwNjl9.ddkS5XEiMzvNQsk9UlMPhyxPSq5S_oh3Nq19eIm9AJU'},
    success: function(res){
        console.log(res)
    }
})
```

#### ajax 请求之 XMLHttpRequest 篇
```javascript
var xhr = new XMLHttpRequest();
xhr.open("POST","verifytoken");
xhr.setRequestHeader('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTIzNTQwNjY5LCJleHAiOjE1MjM2MjcwNjl9.ddkS5XEiMzvNQsk9UlMPhyxPSq5S_oh3Nq19eIm9AJU');
xhr.send();
```

#### ajax 请求之 axios 篇
```javascript
import axios from 'axios'
axios({
    url: url,
    params: _params || {},
    headers: {auth: window.sessionStorage.getItem('dktoken')}
}).then(res => {
    if(!res.data.status && res.data.error == "unauthorized"){
        router.push('login');
        return false;
    }
    resolve(res)
}).catch(error => {
    reject(error)
})
```

#### ajax 请求之 superagent 篇
```javascript
import http from 'superagent'
http.post(getUrl(path))
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    .set('auth',  window.localStorage.getItem('access_token'))
    .end((err, res) => {});
```