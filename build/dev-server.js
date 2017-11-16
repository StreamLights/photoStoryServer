const webpack = require('webpack');
const webpackConfig = require('./webpackConfig');
const Koa = require('koa');
const koaWebpackMiddleware = require('koa-webpack-middleware');
const webpackDevMiddleware = koaWebpackMiddleware.devMiddleware;
const webpackHotMiddleware = koaWebpackMiddleware.hotMiddleware;

const app = new Koa();
// 使用热更新
var compile = webpack(webpackConfig);
app.use(webpackDevMiddleware(compile, {
    // display nothing to the console 
    quiet: false,
    // watch options (only lazy: false) 
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
}));
app.use(webpackHotMiddleware(compile));
app.listen(3001, function () {
    console.log('server listen at 3001');
});