const db = require('./db');
const fs = require('fs');
const path = require('path');
const https = require('https');

// 发送请求 获取数据
let baseUrl = 'https://lightmvapi.aoscdn.com/api/';
https.get(`${baseUrl}themes?language=zh&page=2&per_page=12`, data => {
  let str = '';
  data.on('data', chunk => {
    str += chunk;
  });
  data.on('end', () => {
    saveData(JSON.parse(str).data);
  });
});

// exports.saveData = (req, res) => {
// let reqobj = req.body;
// 存储视频方法封装
videoSaveFunc = videoUrl => {
  // 截取到视频名称
  let nameArr = videoUrl.split('?')[0].split('/');
  let fileName = nameArr[nameArr.length - 1];
  // 声明文件存储路径
  let fileEnd = fileName.split('.');
  let savePath = '';
  if (fileEnd[fileEnd.length - 1] === 'mp4') {
    savePath = path.join(__dirname, '../satatic/video') + '/' + fileName;
  } else {
    savePath = path.join(__dirname, '../satatic/image') + '/' + fileName;
  }
  //发送请求获取相关文件信息
  https.get(videoUrl, data => {
    let bufferArr = [];
    data.on('data', chunk => {
      bufferArr.push(chunk);
    });
    data.on('end', () => {
      var data = null;
      // 初始化一个buffer对象
      data = Buffer.from(bufferArr[0]);
      // 如果存储buffer对象的数组长度大于1 就拼接buffer对象
      if (bufferArr.length > 1) {
        for (var i = 1; i < bufferArr.length; i++) {
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
