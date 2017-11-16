var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        server: '../service/index.js'
    },
    output: {
        path: path.join(__dirname + '/assets/dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(), // 用途：排序输出 通过模块调用次数给模块分配ids，常用的ids就会分配更短的id，使ids可预测，减小文件大小，推荐使用
        new webpack.HotModuleReplacementPlugin(),  //启用热替换模块(Hot Module Replacement)，也被称为 HMR。W> 永远不要在生产环境(production)下启用 HMR
        new webpack.NoEmitOnErrorsPlugin(),  // 用来跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        new webpack.DefinePlugin({     // 通过配置了DefinePlugin，那么这里面的标识就相当于全局变量
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
}