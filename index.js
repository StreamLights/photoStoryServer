import Koa from 'koa';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import server from 'koa-static'
import mongoose from 'mongoose'
import axios from 'axios'
import session from 'koa-session'
import { route } from './router/router.js'


const app = new Koa();

app.use(bodyParser());
app.use(cors({
    credentials: true                // 如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。
}));
app.use(logger());

// 控制session
app.keys = ['fgdfgfhghjfg', 'yhfhe5ytisrdfhfg'];
const CONFIG = {
    key: 'warmcat',
    maxAge: 20 * 60 * 1000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false
}
app.use(session(CONFIG, app));

// 连接mongodb
mongoose.connect('mongodb://localhost:27017/warm-cat');
mongoose.connection.on('error', console.error);

app
    .use(route.routes())
    .use(route.allowedMethods());
app.listen(3001, () => {
    console.log('server listen at 3001');
});