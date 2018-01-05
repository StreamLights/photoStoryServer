import { UserInfo } from '../model/user/userinfo.js'
import { HeadImg } from '../model/user/headimg.js'
// mongodb查询的字段为空时，会报错
// 当mongodb未查询到数据时，不会返回空数组，而是null
// 用户否登陆鉴权
export var identifyLogin = async (ctx, next) => {
    let user = ctx.session.user;
    if (user) {
       await next();
    } else {
       ctx.body = {
            status: 1,
            msg: '用户未登陆'
       }
    }
}
// 检查用户是否登陆
export var checkLogin = async (ctx, next) => {
    let user = ctx.session.user;
    if(user) {
        ctx.body = {
            status: 0,
            msg: '用户已登陆'
        }
    } else {
        ctx.body = {
            status: 1,
            msg: '用户未登陆'
        }
    }
}
// 用户登陆
export var login = async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let user = await UserInfo.findOne({
        username
    });
    if (user) {
        if (user.password != password) {
            ctx.body = {
                status: 1,
                msg: '密码错误'
            }
            return;
        }
        ctx.session.user = username;
        ctx.body = {
            status: 0,
            msg: '登陆成功'
        }
    } else {
        ctx.body = {
            status: 1,
            msg: '用户不存在'
        }
    }
}
// 用户注册
export var register = async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let user = await UserInfo.findOne({
        username
    });
    if (user) {
        ctx.body = {
            status: 1,
            msg: '用户已存在！'
        }
        return;
    }
    let userInfo = new UserInfo({
        username: username,
        password: password
    });
    userInfo.save()
        .then((result) => {
            console.log('user: ' + result.username + '  insert Success !');
        })
        .catch((err) => {
            console.log(err);
            ctx.body = {
                status: 1,
                msg: '数据库内部错误'
            }
        });
    ctx.body = {
        status: 0,
        msg: '注册成功'
    }
}
// 用户登出
export var logout = async (ctx) => {
    ctx.session = null;
    ctx.body = {
        status: 0,
        msg: '用户登出成功'
    }
}
// 用户页面获取用户信息
export var getUserInfo = async (ctx) => {
    let username = ctx.session.user;
    let user = await UserInfo.findOne({
        username
    }); 
    let userHead = await HeadImg.findOne({
        username
    });
    if (username && userHead) {
        ctx.body = {
            content: {
                username: user.username,
                userhead: userHead.img
            }
        }
        return;
    }
    ctx.body = {
        content: {
            username: user.username
        }
    }
}
export var postHeadImg = async (ctx) => {
    console.log(ctx.req.file);
}