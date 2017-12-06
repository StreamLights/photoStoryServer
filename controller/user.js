import { UserInfo } from '../model/user/userinfo.js'
import { HeadImg } from '../model/user/headimg.js'

export var checkLogin = async (ctx) => {
    let user = ctx.session.user;;
    if (user) {
        ctx.body = {
            status: 0
        }
    } else {
        ctx.body = {
            status: 1,
            msg: '用户未登陆'
        }
    }
}
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
export var register = async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let userInfo = new UserInfo({
        username: username,
        password: password
    });
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
export var logout = async (ctx) => {
    ctx.session = null;
}
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
    let username = ctx.session.user;
    let image = ctx.request.body.headImg;
    let headImg = new HeadImg({
        username: username,
        img: image
    });
    if (username) {
        headImg.save()
            .then(function (result) {
                console.log(username + ':   头像存储成功!');
            })
            .catch(function (err) {
                ctx.body = {
                    status: 1,
                    msg: '图片上传失败，错误代码：' + err
                }
                console.log('article insered fail , resones: ' + err);
            })
        ctx.body = {
            status: 0
        }
    }
}