const path=require("path");
const express=require("express");
const webpack=require("webpack");
const webpackDevMiddleware=require("webpack-dev-middleware");

const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require('./webpack.dev.js');

const complier = webpack(config);   // 编译器，编译器执行一次就会重新打包一下代码
const app = express();  // 生成一个实例

var proxyTable = config.devServer.proxy; //代理的配置
var proxyMiddleware = require('http-proxy-middleware');
const DIST_DIR = path.resolve(__dirname, '../', 'public');  // 设置静态访问文件路径

let devMiddleware = webpackDevMiddleware(complier, {
    quiet: true,
    noInfo: true,
    stats: 'minimal'
});

let hotMiddleware = webpackHotMiddleware(complier,{
    log: false,
    heartbeat: 2000
});

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context];
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
});

app.use(devMiddleware);

app.use(hotMiddleware);

// 设置访问静态文件的路径
app.use(express.static(DIST_DIR));


app.listen(9000, () => {
    console.log("成功启动：localhost:"+ 9000)
});



