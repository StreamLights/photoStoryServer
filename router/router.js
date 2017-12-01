import Router from 'koa-router';
import { checkLogin, register, login, getUserInfo, logout, postHeadImg } from '../controller/user.js'
import { postArticle, getArticleList } from '../controller/article.js'

const route = new Router();

// 用户模块
route.post('/user/checkLogin', checkLogin);
route.post('/user/register', register);
route.post('/user/login', login);
route.post('/user/getUserInfo', getUserInfo);
route.post('/user/logout', logout);
route.post('/user/postHeadImg', postHeadImg);

// 文章模块
route.post('/article/post', postArticle);
route.post('/article/articleList', getArticleList);

export { route };