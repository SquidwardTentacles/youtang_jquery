const db = require('./db');
const fs = require('fs');
const path = require('path');
exports.saveData = (req, res) => {
  let reqobj = req.body;
  for (let i = 0; i < reqobj.list.length; i++) {
    // 先查询
    let sqlSelect =
      'select count(*) as total from videosessonbase where theme_id=?';
    let dataSelect = [reqobj.list[i].theme_id];
    // let data = reqobj.list[i];
    // db.base(sql, data, res => {
    //   console.log(res);
    // });
    db.base(sqlSelect, dataSelect, res => {
      if (res[0].total < 1) {
        let sql = 'insert into videosessonbase set ?';
        let data = {
          theme_id: reqobj.list[i].theme_id,
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
        db.base(sql, data, res => {
          if (res.affectedRows === 1) {
            console.log('存储成功', i);
          } else {
            console.log('err', i);
          }
        });
      } else {
        console.log('已存储过', i);
      }
    });
  }
};
// 存储文件
exports.filesUpdate = (req, res) => {
  let file = req.files.file;
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
