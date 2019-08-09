$(document).ready(function() {
  // 设置axios默认的请求地址
  axios.defaults.baseURL = 'https://lightmvapi.aoscdn.com';
  // 主界面的事件
  // 发送请求
  // 主界面内容数组
  let backData = [];
  // 分页页数
  let pageData = 0;
  // 主要内容的元素
  let optionElement = '';
  // 发送请求携带的参数
  let requestData = {
    // 默认0 全部 1仅图片  2仅视频  3图片和视频
    theme_resource_type: 0,
    // 默认 0全部    1查询免费  2查询仅收费
    charge_type: 0,
    // 默认0 全部 1 flexible  2 fixed
    composition_type: 0,
    //theme_resolution 不传查询全部  可选 16x9 9x16 1x1
    /*
      排序类型 created_at  按创建时间
      task_num    按使用量
      orderby     后台权重 默认
    */
    order_field: 'orderby'
  };
  let getData = (i, requestObj, clearElement) => {
    let reqData = '';
    if (requestObj) {
      // 如果传递过来了参数 则拼接参数-
      reqData = `theme_resource_type=${
        requestObj.theme_resource_type
      }&charge_type=${requestObj.charge_type}&composition_type=${
        requestObj.composition_type
      }&order_field=${requestObj.order_field}`;
      // 如果对象中有尺寸字段则拼接尺寸 0也不会拼接
      if (requestObj.theme_resolution) {
        reqData += `&theme_resolution=${requestObj.theme_resolution}`;
      }
    }
    axios
      .get(`/api/themes?language=zh&page=${i}&per_page=16&${reqData}`)
      .then(res => {
        if (res.data.status === '1') {
          backData = res.data.data.list;
          pageData = i;
          // var data = {
          //   list: backData.concat(res.data.data.list)
          // };
          // const html = template('list_temp2', data);
          // $('#contentBoxList').html(html);
          console.log(i);
          let freeIcon = `<div class="free">免费</div>`;
          if (i <= 1) {
            backData.forEach(function(element, index) {
              let videoObj = JSON.stringify({
                title: element.title,
                video_url: element.video_url
              });
              optionElement += `<li>
              <div class="outer-box">
            ${element.is_free == 0 ? '' : freeIcon}
              <span class="hd-mark">HD</span>
                <div class="show-box">
                  <div class="img-box">
                    <img src="${element.cover_thumb_url}" alt="" />
                    <video autoplay="autoplay" id="low_video" preload="none" data-dataobj='${videoObj}' muted="false" loop="loop" poster="${
                element.cover_thumb_url
              }" src="${element.low_video_url}"></video>
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
            // 如果需要先清空之前的数据在进行赋值 下拉菜单的点击事件需要先清空
            if (clearElement) $('#contentBoxList').empty();
            $('#contentBoxList').append(optionElement);
            optionElement = '';
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
  getData(1);
  // 菜单栏筛选的点击事件
  $('#screenlist li').on('click', function(e) {
    let string = e.target.innerHTML.slice(0, 2) + '视频模板';
    $('#imgBackTitle h2').html(string);
  });

  // 视频点击放大
  $(document).on('click', '#low_video', function() {
    let objstr = $(this).data('dataobj');
    $('#droupVideo').prop('src', objstr.video_url);
    $('#droupTopbox').css('display', 'block');
  });

  // 内容显示的筛选点击事件
  let elementClass = '';
  $('#select-choose_click p').on('mouseenter', function() {
    // class 名称被绑定到对应的data数据中 在鼠标移入时 为变量赋值并记录 以便于在鼠标移除时控制相关影藏
    elementClass = $(this).data('show');
    $(`.hideMenu.${elementClass}`).css('display', 'block');
  });
  $('#select-choose_click p').on('click', function() {
    // class 名称被绑定到对应的data数据中 在鼠标移入时 为变量赋值并记录 以便于在鼠标移除时控制相关影藏
    elementClass = $(this).data('show');
    $(`.hideMenu.${elementClass}`).css('display', 'none');
  });
  // 列表标题 全部 外面的大盒子的鼠标移除 下拉菜单影藏
  $('.outerAllBox').on('mouseleave', function() {
    $(`.hideMenu.${elementClass}`).css('display', 'none');
  });
  // 下拉菜单盒子鼠标移除 盒子影藏
  $('.rightBox .hideMenu').on('mouseleave', function() {
    $(`.hideMenu.${elementClass}`).css('display', 'none');
  });
  $('.rightBox .hideMenu').on('mouseenter', function() {
    $(`.hideMenu.${elementClass}`).css('display', 'block');
  });

  // 选择菜单a标签的点击事件
  $('.rightBox .hideMenu li a').on('click', function(e) {
    // 点击后设置对应的p标签的内容
    $(this)
      .parent('li')
      .parent('ul')
      .siblings('div')
      .children('#placeTitle')
      .html(e.target.innerHTML);
    // 为当前点击的li标签设置类名
    $('.hideMenu li').removeClass('active');
    $(this)
      .parent('li')
      .addClass('active');
    // 声明一个对象来保相关内容
    let typeObj = {};
    // 内容的点击事件
    typeObj.theme_resource_type = $(this).data('theme_resource_type')
      ? $(this).data('theme_resource_type')
      : 0;
    // 权限的点击事件
    typeObj.charge_type = $(this).data('charge_type')
      ? $(this).data('charge_type')
      : 0;
    // 类型
    typeObj.composition_type = $(this).data('composition_type')
      ? $(this).data('composition_type')
      : 0;
    // 尺寸
    typeObj.theme_resolution = $(this).data('theme_resolution')
      ? $(this).data('theme_resolution')
      : 0;
    // 排序方式
    typeObj.order_field = $(this).data('order_field')
      ? $(this).data('order_field')
      : 0;

    // 点击后关闭菜单栏
    $(`.hideMenu.${elementClass}`).css('display', 'none');
    //
    // 发送请求 并且携带参数 发送请求前 先清空ul下已有元素 第三个参数为1 清空 0或者不传则不清空
    e.stopPropagation();
    getData(1, typeObj, 1);
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
    $('#contentBoxList li').on('mouseenter', function() {
      $(this)
        .find('.free')
        .fadeOut('slow');
      $(this)
        .find('img')
        .css('display', 'none');
      $(this)
        .find('video')
        .css('display', 'block');
      $(this)
        .find('.title-box')
        .css('display', 'none');
      $(this)
        .find('.title-box.use')
        .css('display', 'block');
    });
    $('#contentBoxList li').on('mouseleave', function() {
      $(this)
        .find('.free')
        .fadeIn('slow');
      $(this)
        .find('img')
        .css('display', 'block');
      $(this)
        .find('video')
        .css('display', 'none');
      $(this)
        .find('.title-box')
        .css('display', 'block');
      $(this)
        .find('.title-box.use')
        .css('display', 'none');
    });
  };

  // 选择语言 语言的点击事件 设置内容 弹出式遮罩框
  // $('#dropUl li').on('click', function(e) {
  //   // $('#dropdownMenu2').value = e.target.innerHTML;
  //   $('#dropdownMenu2')[0].value = e.target.innerHTML;
  //   $('#droupTopbox').css('display', 'none');
  // });
  $('.inputBoxClick').on('click', function() {
    $('#droupTopbox').css('display', 'block');
  });
  // 关闭按钮点击事件
  $('#closeIcon').on('click', function() {
    // 关闭选择语言弹出框
    $('#droupTopbox').css('display', 'none');
  });
  $('#droupTopbox').on('click', function() {
    $(this).css('display', 'none');
  });
});
