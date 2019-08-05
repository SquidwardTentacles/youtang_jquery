// 循环生成导航栏
let navtopData = [
  { title: '全部' },
  { title: '潮流时尚' },
  { title: '婚礼爱情' },
  { title: '商业宣传' },
  { title: '家庭相册' },
  { title: '生日祝福' },
  { title: '节日问候' },
  { title: '旅行时光' },
  { title: '晚会典礼' },
  { title: '毕业留恋' },
  { title: '通用' }
];
for (let i = 0; i < navtopData.length; i++) {
  $('#screenlist').append(`<li>${navtopData[i].title}</li>`);
}

// 主界面的事件
// 发送请求
let backData = [];
let getData = i => {
  axios
    .get(`https://lightmvapi.aoscdn.com/api/themes?language=zh&&page=${i}`)
    .then(res => {
      if (res.data.status === '1') {
        backData = res.data.data.list;

        var html = template('content_list', { data: backData });
        var divResult = $('#content_list');

        //这是模板循环外面的div

        divResult.innerHTML = html;

        console.log(backData);
      } else {
        this.$message.error('请求失败');
      }
    })
    .catch(err => {
      console.log(err);
    });
};
for (let i = 0; i < 2; i++) {
  i = i++;
  getData(i);
}
