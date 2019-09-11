const db = require('./db');
const fs = require('fs');
const path = require('path');
const https = require('https');

// exports.saveData = (req, res) => {
// let reqobj = req.body;

// 存储视频方法封装
videoSaveFunc = videoUrl => {
  // 截取到视频名称 这里通过连接来获取文件名称以及相关文件类型
  let nameArr = videoUrl.split('?')[0].split('/');
  let fileName = nameArr[nameArr.length - 1];
  // 声明文件存储路径
  let fileEnd = fileName.split('.')[fileName.split('.').length - 1];
  let savePath = '';
  console.log(videoUrl);
  // 通过文件名称的后缀判断文件类型 用于存储文件时拼接文件名称以及文件后缀
  // 创建一个变量保存文件夹名称
  let dirName = '';
  if (fileEnd === 'mp4') {
    dirName = 'video';
  } else if (fileEnd === 'jpg') {
    dirName = 'image';
  } else {
    dirName = 'filedir';
  }
  let pathl = path.join(__dirname, '../satatic/' + dirName);

  // 首先判断文件夹是否存在 不存在则创建
  fs.exists(pathl, exist => {
    if (!exist) {
      // 文件夹不存在就新建
      fs.mkdir(pathl, err => {
        console.log(err, 'err');
        if (err) return false;
      });
    }
  });
  savePath = pathl + '/' + fileName;

  //发送请求获取相关文件信息
  https.get(videoUrl, data => {
    let bufferArr = [];
    data.on('data', chunk => {
      // 数据不会一次性返回 分多次返回数据 所以这里将每次返回的数据都存储在了数组中 方便后续处理
      bufferArr.push(chunk);
    });
    // 数据已经全部返回
    data.on('end', () => {
      // 初始化一个buffer对象
      let data = Buffer.from(bufferArr[0]);
      // 如果存储buffer对象的数组长度大于1 就拼接buffer对象
      if (bufferArr.length > 1) {
        for (let i = 1; i < bufferArr.length; i++) {
          // 将多条buffer对象拼接
          data = Buffer.concat([data, bufferArr[i]]);
        }
      }
      // 写入文件
      fs.writeFile(savePath, data, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log(fileName + '存储成功');
        }
      });
    });
  });
};
// 下载音乐
// videoSaveFunc(
//   'https://webfs.yun.kugou.com/201909101726/a2623a86ba7bbcc8b0cc245037fff9a2/G164/M09/01/13/RIcBAF1oDYqAG2fBADzLmbQBtjQ851.mp3'
// );
saveData = reqobj => {
  for (let i = 0; i < reqobj.list.length; i++) {
    // 存储图片
    videoSaveFunc(reqobj.list[i].cover_thumb_url);
    // 存储视频
    videoSaveFunc(reqobj.list[i].low_video_url);
    // 调用视频存储函数
    let theme_idL = reqobj.list[i].theme_id;
    let videoImgSessondata = {
      cover_thumb_url: reqobj.list[i].cover_thumb_url,
      cover_url: reqobj.list[i].cover_url,
      description: reqobj.list[i].description,
      duration: reqobj.list[i].duration,
      is_free: reqobj.list[i].is_free,
      is_hot: reqobj.list[i].is_hot,
      is_support_hd: reqobj.list[i].is_support_hd,
      low_video_url: reqobj.list[i].low_video_url,
      theme_type: reqobj.list[i].theme_type,
      title: reqobj.list[i].title,
      video_url: reqobj.list[i].video_url
    };
    saveFunc('videosessonbase', videoImgSessondata, theme_idL);
    let sataticData = {
      audio: reqobj.list[i].statistics.audio,
      image: reqobj.list[i].statistics.image,
      text: reqobj.list[i].statistics.text,
      video: reqobj.list[i].statistics.video
      // theme_id: reqobj.list[i].theme_id
    };
    saveFunc('statistics', sataticData, theme_idL);
    let uspportData = {
      0: reqobj.list[i].support_resolution[0],
      1: reqobj.list[i].support_resolution[1],
      2: reqobj.list[i].support_resolution[2]
    };
    saveFunc('support_resolution', uspportData, theme_idL);
  }
};
let saveFunc = (dataBase, setData, id) => {
  setData.theme_id = id;
  // 查询statistics数据
  let selSqlstatistics = `select count(*) as total from ${dataBase} where theme_id=?`;
  db.base(selSqlstatistics, id, res => {
    if (res[0].total < 1) {
      let insertSatatic = `insert into ${dataBase} set ?`;
      db.base(insertSatatic, setData, res => {
        if (res.affectedRows === 1) {
          console.log(dataBase + '存储成功', id, dataBase);
        } else {
          console.log(dataBase + 'err', id, dataBase);
        }
      });
    } else {
      console.log(dataBase + '已经存储过', id, dataBase);
    }
  });
};
// 存储文件
exports.filesUpdate = (req, res) => {
  let file = req.files.file;
  console.log(req);

  // 拼接文件名称以及存储路径
  var des_file =
    path.join(__dirname, '../satatic') + '/' + file.originalFilename;
  // 存储文件
  fs.readFile(file.path, function(err, data) {
    fs.writeFile(des_file, data, function(err) {
      let response = {};
      if (err) {
        console.log(err);
      } else {
        response = {
          errcode: 0,
          message: '文件上传成功',
          // 返回路径
          url: des_file
        };
      }
      console.log(response);
      res.end(JSON.stringify(response));
    });
  });
};
