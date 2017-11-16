const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const server = require('koa-static');
const Sequelize = require('sequelize');

const app = new Koa();
const route = new Router();

app.use(bodyParser());
app.use(cors());

var sequelize = new Sequelize('warmcat', 'root', 'shujian123', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,       // 连接池最大连接数量
        min: 0,       // 连接池最小连接数量
        idle: 10000   // 如果一个线程超过10秒钟没有被使用过就释放该线程
    },
    storage: 'path/to/database.sqlite'
});

//创建 Model
var User = sequelize.define('userinfo', {
    // 指定映射的字段类型，字段名，例如数据库中 user 表中的 username 字段映射成 username
    username: Sequelize.STRING,
    password: Sequelize.STRING
}, {
        freezeTableName: true,   // freezeTabelName 为 true 时不会在库中映射表时增加复数表名  该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
        timestamps: false
    });

// 操作数据库的对象
var controller = {
    addUser: function (ctx, username, password) {
        User.create({
            username: username,
            password: password
        }).then(function () {
            console.log('user inseted success !');
            ctx.cookies.set('wc_user', username, {
                signed: true,
                httpOnly: true
            });
        }).catch(function (err) {
            console.log(err.message);
        });
    },
    findUser: function (username) {

    }
}

// 如果要返回数据给前端  ctx.body 就是相当于 ctx.response        ctx.request.body 获取前端post过来的数据
route.post('/user/register', function (ctx, next) {
    controller.addUser(ctx, ctx.request.body.username, ctx.request.body.password);
});

app
    .use(route.routes())
    .use(route.allowedMethods());
app.listen(3001, function () {
    console.log('server listen at 3001');
});