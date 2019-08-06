$(document).ready(function() {
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
  let option = '';
  for (let i = 0; i < navtopData.length; i++) {
    option += `<li>${navtopData[i].title}</li>`;
  }
  $('#screenlist').append(option);

  // 主界面的事件
  // 发送请求
  let backData = [];
  let pageData = 0;
  let optionElement = '';
  let getData = i => {
    axios
      .get(`https://lightmvapi.aoscdn.com/api/themes?language=zh&&page=${i}`)
      .then(res => {
        if (res.data.status === '1') {
          backData = res.data.data.list;
          pageData = i;
          // var data = {
          //   list: backData.concat(res.data.data.list)
          // };
          // const html = template('list_temp2', data);
          // $('#contentBoxList').html(html);

          if (i <= 1) {
            backData.forEach(function(element, index) {
              optionElement += `<li>
              <div class="outer-box">
              <span class="hd-mark">HD</span>
                <div class="show-box">
                  <div class="img-box">
                    <img src="${element.cover_thumb_url}" alt="" />
                    <video autoplay="autoplay" muted="muted" src="${
                      element.low_video_url
                    }"></video>
                  </div>
                  <div class="title-box">
                    <span>${element.title}</span>
                    <span>自由入模板</span>
                  </div>
                  <div class="title-box flexbox between use">
                    <span>使用</span>
                  </div>
                </div>
              </div>
            </li>`;
            });
            $('#contentBoxList').append(optionElement);
          } else {
            backData.forEach(function(element, index) {
              optionElement = `<li>
               <div class="outer-box">
               <p class="hd-mark">HD</p>
                 <div class="show-box">
                   <div class="img-box">
                     <img src="${element.cover_thumb_url}" alt="" />
                     <video autoplay="autoplay" muted="muted" src="${
                       element.low_video_url
                     }"></video>
                   </div>
                   <div class="title-box">
                     <span>${element.title}</span>
                     <span>自由入模板</span>
                   </div>
                   <div class="title-box flexbox between use">
                     <span>使用</span>
                   </div>
                 </div>
               </div>
             </li>`;
              $('#contentBoxList').append(optionElement);
            });
          }
          mouseEvent();
        } else {
          this.$message.error('请求失败');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // 进入页面默认调用两次请求获取数据
  for (let i = 0; i < 2; i++) {
    i = i++;
    getData(i);
  }

  // 页面滚动事件
  let handleScroll = function() {
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
    var windowHeight =
      document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
    var scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
    let h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight; //浏览器高度
    if (scrollTop + windowHeight == scrollHeight) {
      // console.log(
      //   '距顶部' +
      //     scrollTop +
      //     '可视区高度' +
      //     windowHeight +
      //     '滚动条总高度' +
      //     scrollHeight
      // );
      pageData++;
      getData(pageData);
      mouseEvent();
    }
  };
  window.addEventListener('scroll', handleScroll, true);

  let mouseEvent = function() {
    // 内容的鼠标移入移除事件
    $(document).ready(function() {
      $('#contentBoxList>li').mouseenter(function() {
        $(this)
          .children('.outer-box')
          .children('.show-box')
          .children('.img-box')
          .children('img')
          .css('display', 'none');
        $(this)
          .children('.outer-box')
          .children('.show-box')
          .children('.img-box')
          .children('video')
          .css('display', 'block');
        $(this)
          .children('.outer-box')
          .children('.show-box')
          .children('.title-box')
          .css('display', 'none');
        $(this)
          .children('.outer-box')
          .children('.show-box')
          .children('.title-box.use')
          .css('display', 'block');
      });
      $('#contentBoxList>li').mouseleave(function() {
        $(this)
          .children('.outer-box')
          .children('.show-box')
          .children('.img-box')
          .children('img')
          .css('display', 'block');
        $(this)
          .children('.outer-box')
          .children('.show-box')
          .children('.img-box')
          .children('video')
          .css('display', 'none');
        $(this)
          .children('.outer-box')
          .children('.show-box')
          .children('.title-box')
          .css('display', 'block');
        $(this)
          .children('.outer-box')
          .children('.show-box')
          .children('.title-box.use')
          .css('display', 'none');
      });
    });
  };
});
