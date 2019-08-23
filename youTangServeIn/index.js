const express = require('express');
const app = express();
const router = require('./js/router');
// 引入body-parser插件 处理请求参数
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );
  res.header('cache-control', 'no-cache');
  res.header('content-type', 'application/json; charset=utf-8');
  res.header('ETag', '');
  //header头信息设置结束后，结束程序往下执行，返回
  if (req.method.toLocaleLowerCase() === 'options') {
    res.status(204);
    return res.json({}); //直接返回空数据，结束此次请求
  } else {
    next();
  }
});

app.use(router);
app.listen(8090, () => {
  console.log('running...');
});
