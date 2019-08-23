const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
const serve = require('./serve');
// 存储首页数据
router.post('/saveData', serve.saveData);
// 文件上传
router.post('/filesUpdate', multipartMiddleware, serve.filesUpdate);

module.exports = router;
