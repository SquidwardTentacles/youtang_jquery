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
saveData = reqobj => {
  for (let i = 0; i < reqobj.list.length; i++) {
    let theme_idL = reqobj.list[i].theme_id;
    // videoArr.push(reqobj.list[i].low_video_url);
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
