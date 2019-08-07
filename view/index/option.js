$(document).ready(function() {
  // 设置axios默认的请求地址
  axios.defaults.baseURL = 'https://lightmvapi.aoscdn.com';
  // 主界面的事件
  // 发送请求
  let backData = [];
  let pageData = 0;
  let optionElement = '';
  let getData = i => {
    axios
      .get(`/api/themes?language=zh&&page=${i}`)
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
  // 菜单栏筛选的点击事件
  $('#screenlist li').click(function(e) {
    let string = e.target.innerHTML.slice(0, 2) + '视频模板';
    $('#imgBackTitle h2').html(string);
  });
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
  // 暂时注释 注册页面滚动事件
  // window.addEventListener('scroll', handleScroll, true);
  // 将产品列表的鼠标事件封装 每次发送请求时都调用一次 给新添加的元素注册事件
  let mouseEvent = function() {
    // 内容的鼠标移入移除事件
    $(document).ready(function() {
      $('#contentBoxList .show-box').mouseenter(function() {
        $(this)
          .children('.img-box')
          .children('img')
          .css('display', 'none');
        $(this)
          .children('.img-box')
          .children('video')
          .css('display', 'block');
        $(this)
          .children('.title-box')
          .css('display', 'none');
        $(this)
          .children('.title-box.use')
          .css('display', 'block');
      });
      $('#contentBoxList .show-box').mouseleave(function() {
        $(this)
          .children('.img-box')
          .children('img')
          .css('display', 'block');
        $(this)
          .children('.img-box')
          .children('video')
          .css('display', 'none');
        $(this)
          .children('.title-box')
          .css('display', 'block');
        $(this)
          .children('.title-box.use')
          .css('display', 'none');
      });
    });
  };

  // 选择语言 语言的点击事件 设置内容
  $('#dropUl li').click(function(e) {
    // $('#dropdownMenu2').value = e.target.innerHTML;
    $('#dropdownMenu2')[0].value = e.target.innerHTML;
    $('#droupTopbox').css('display', 'none');
  });
  $('.inputBoxClick').click(function() {
    $('#droupTopbox').css('display', 'block');
  });
  // 关闭按钮点击事件
  $('#closeIcon').click(function() {
    // 关闭选择语言弹出框
    $('#droupTopbox').css('display', 'none');
  });
});
