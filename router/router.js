import Router from 'koa-router';
import multer from 'koa-multer'
import { identifyLogin, checkLogin, register, login, getUserInfo, logout, postHeadImg } from '../controller/user.js'
import { postArticle, getArticleList, getArticle, getArticleDetail} from '../controller/article.js'


const upload = multer({ dest: 'uploads/' });
const route = new Router();

// 用户模块
route.post('/user/checkLogin', checkLogin);
route.post('/user/register', register);
route.post('/user/login', login);
route.post('/user/getUserInfo', identifyLogin, getUserInfo);
route.post('/user/logout', logout);
route.post('/user/postHeadImg', upload.single('file'), postHeadImg);

// 文章模块
route.post('/article/post', postArticle);
route.post('/article/articleList', getArticleList);
route.get('/article/detail', getArticleDetail);

export { route };