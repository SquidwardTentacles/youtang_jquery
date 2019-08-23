// 引入静态资源
document.write("<script type='text/javascript' src='data.js'></script>");
$(document).ready(function() {
  // 设置axios默认的请求地址
  // axios.defaults.baseURL = 'https://lightmvapi.aoscdn.com';
  let getBaseUrl = 'https://lightmvapi.aoscdn.com';
  let saveBaseUrl = 'http://localhost:8090';
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
  // 声明一个变量 验证是否要发送请求
  let unRequest = 0;
  // 设置返回数据的总条数
  let listDataLength = 12;
  // 声明一个变量保存计时器 用来记录视频加载时间
  let timeout = '';

  // // 监听屏幕宽度
  // $(window).resize(function() {
  //   let width = $(this).width();
  //   if (width <= 770) {
  //   }
  //   let height = $(this).height();
  // });
  // 设置一个变量 限制在初始化完成前不能重复发送请求
  let againRequest = true;
  // i 分页 requestObj请求携带的参数  clearElement是否清空后再赋值0 不清空 1 清空 str 菜单栏点击的内容

  let getData = (i, requestObj, clearElement, str) => {
    // 如果上一次请求返回的数据不足设定的条数 就设置计时器并且关闭遮罩层
    if (unRequest || !againRequest) {
      setTimeout(() => {
        $('.element_video.flexbox')
          .find('.hidden_tip')
          .fadeIn();
      }, 3000);
      return;
    }
    let reqData = '';
    // 参数来源于下拉菜单
    if (requestObj && requestObj.type == 1) {
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
      // 参数来源于菜单栏
    } else if (requestObj && requestObj.type == 0) {
      reqData = `tag_brief_name=${requestObj.tag_brief_name}`;
    }
    // 发送请求前 清空计时器 关闭遮罩层
    window.clearTimeout(timeout);
    $(`#video_box_mark${i - 1}`).css('display', 'none');
    axios
      .get(
        `${getBaseUrl}/api/themes?language=zh&page=${i}&per_page=${listDataLength}&${reqData}`
      )
      .then(res => {
        if (res.data.status === '1') {
          againRequest = false;
          backData = res.data.data.list;
          // 如果返回的数据条数不等于设置的条数 则没有数据了
          if (backData.length !== listDataLength) unRequest = 1;
          pageData = i + 1;
          i = i + 1;
          let freeIcon = `<div class="free">免费</div>`;
          let videoObj = {};
          backData.forEach(function(element, index) {
            videoObj = JSON.stringify({
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
                    <video width="100%" autoplay="autoplay" id="low_video" class="video_class_name${i}" preload="none" data-dataobj='${videoObj}' muted="false" loop="loop" poster="${
              element.cover_thumb_url
            }" src="${element.low_video_url}"></video>
                  </div>
                  <div class="title-box">
                    <span>${element.title}</span>
                    <span>自由入模板</span>
                  </div>
                  <div class="title-box flexbox between use">
                    <span> <a href="../templateEdit/template.html?url=${
                      element.cover_thumb_url
                    }">使用</a></span>
                  </div>
                </div>
              </div>
            </li>`;
          });
          // 如果需要先清空之前的数据在进行赋值 下拉菜单的点击事件需要先清空
          if (clearElement) $('#contentBoxList').empty();
          optionElement = `<div class="element_video flexbox j-start">
                              <div id="video_box_mark${i}">
                                <p class="closeIcon loading_drop hidden_tip video_mnark_close${i}" id="closeIcon2">×</p>
                                 <div class="markbox rel_center">
                                  <div class="loading_box rel_center">
                                    <div class="inner"></div>
                                    <P class="hidden_tip">视频加载时间过长 您可以手动关闭遮罩层或者继续等待</P>
                                  </div>
                                </div>
                              </div>
                              ${optionElement}
                          </div>`;
          $('#contentBoxList .video_inner_box').append(optionElement);
          optionElement = '';
          mouseEvent();
          // 请求回来后显示页尾
          $('.footerBox').css('display', 'block');
          // 如果是菜单栏的点击事件 则等待请求回来后再去更新h2标题
          if (str) {
            switch (str) {
              case '全部视频模板':
                $('#imgBackTitle').css(
                  'background',
                  "url('../../static/images/all.jpg') center center no-repeat"
                );
                $('#imgBackTitle')
                  .find('P')
                  .html('- 轻松制作精彩视频 -');
                break;
              case '潮流视频模板':
                $('#imgBackTitle').css(
                  'background',
                  "url('../../static/images/fashion.jpg') center center no-repeat"
                );
                $('#imgBackTitle')
                  .find('P')
                  .html('- 用精彩视频展示你的光芒 -');
                break;
              case '婚礼视频模板':
                $('#imgBackTitle').css(
                  'background',
                  "url('../../static/images/wedding.jpg') center center no-repeat"
                );
                $('#imgBackTitle')
                  .find('P')
                  .html('- 用高端浪漫的婚礼视频记录幸福时光 -');
                break;
              case '商业视频模板':
                $('#imgBackTitle').css(
                  'background',
                  "url('../../static/images/business.jpg') center center no-repeat"
                );
                $('#imgBackTitle')
                  .find('P')
                  .html('- 制做高端大气的商业视频 -');
                break;
              case '家庭视频模板':
                $('#imgBackTitle').css(
                  'background',
                  "url('../../static/images/family.jpg') center center no-repeat"
                );
                $('#imgBackTitle')
                  .find('P')
                  .html('- 为家人制做动人视频 -');
                break;
              case '生日视频模板':
                $('#imgBackTitle').css(
                  'background',
                  "url('../../static/images/birthday.jpg') center center no-repeat"
                );
                $('#imgBackTitle')
                  .find('P')
                  .html('- 用视频给生日增添惊喜 -');
                break;
              case '节日视频模板':
                $('#imgBackTitle').css(
                  'background',
                  "url('../../static/images/holiday.jpg') center center no-repeat"
                );
                $('#imgBackTitle')
                  .find('P')
                  .html('- 制作视频来记录每一个节日 -');
                break;
              case '旅游视频模板':
                $('#imgBackTitle').css(
                  'background',
                  "url('../../static/images/travel.jpg') center center no-repeat"
                );
                $('#imgBackTitle')
                  .find('P')
                  .html('- 用炫酷视频记录每一次旅行 -');
                break;
              case '晚会典礼视频模板':
                $('#imgBackTitle').css(
                  'background',
                  "url('../../static/images/ceremony.jpg') center center no-repeat"
                );
                $('#imgBackTitle')
                  .find('P')
                  .html('- 用令人印象深刻的视频点燃你的晚会 -');
                break;
              case '毕业视频模板':
                $('#imgBackTitle').css(
                  'background',
                  "url('../../static/images/graduation.jpg') center center no-repeat"
                );
                $('#imgBackTitle')
                  .find('P')
                  .html('- 制作毕业视频，珍藏最美时光 -');
                break;
              case '通用视频模板':
                $('#imgBackTitle').css(
                  'background',
                  "url('../../static/images/general.jpg') center center no-repeat"
                );
                $('#imgBackTitle')
                  .find('P')
                  .html('- 用独特的视频点亮你生活 -');
                break;

              default:
                break;
            }
            $('#imgBackTitle')
              .find('h2')
              .html(str);
          }
          let video = '';
          video = document.getElementsByClassName('video_class_name' + i)[0];
          // 设置计时器 如果视频加载时间太长 显示关闭按钮 让用户可以手动关闭遮罩层
          timeout = setTimeout(() => {
            // 如果5秒后视频还未加载完成 允许发送二次请求
            againRequest = true;
            $('.element_video.flexbox')
              .find('.hidden_tip')
              .fadeIn();
          }, 5000);
          // 遮罩层关闭按钮点击事件
          $(document).on('click', `.video_mnark_close${i}`, function() {
            // 视频加载完成后允许发送二次请求
            $(`#video_box_mark${i}`).css('display', 'none');
          });
          // 监听视频是否加载完成
          video.addEventListener('loadedmetadata', function(e) {
            time = 0;
            againRequest = true;
            console.log(againRequest);
            // 视频加载完成关闭遮罩层
            $(`#video_box_mark${i}`).css('display', 'none');
            // // 清除计时器
            window.clearTimeout(timeout);
          });

          $('.free').css('display', 'block');
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
    // h2主题文本提示内容
    let reqobj = {};
    if ($(this).data('tag_brief_name')) {
      reqobj.tag_brief_name = $(this).data('tag_brief_name');
      reqobj.type = 0;
    }
    let string = e.target.innerHTML.slice(0, 2) + '视频模板';

    getData(1, reqobj, 1, string);
    // 先将其兄弟元素移除active类名 然后在添加active类名
    $(this)
      .siblings()
      .removeClass('active');
    $(this).addClass('active');
  });

  // 视频点击放大
  $(document).on('click', '#low_video', function() {
    let objstr = $(this).data('dataobj');
    // 弹出框的显示
    $('#droupTopbox')
      .css('display', 'block')
      .html(videoElemenmt);
    // 赋值视频地址
    $('#droupVideo').prop('src', objstr.video_url);
    // 赋值标题
    $('#video_title').html(objstr.title);
  });

  //下拉菜单 内容显示的筛选点击事件
  $('#select-choose_click p').on('mouseenter', function() {
    // class 名称被绑定到对应的data数据中 在鼠标移入时 为变量赋值并记录 以便于在鼠标移除时控制相关影藏
    // elementClass = $(this).data('show');
    $(this)
      .parent('.outerAllBox')
      .siblings('.hideMenu')
      .css('display', 'block');
  });
  $('#select-choose_click p').on('click', function() {
    // class 名称被绑定到对应的data数据中 在鼠标移入时 为变量赋值并记录 以便于在鼠标移除时控制相关影藏
    elementClass = $(this).data('show');
    $(this)
      .parent('.outerAllBox')
      .siblings('.hideMenu')
      .css('display', 'none');
  });
  // 列表标题 全部 外面的大盒子的鼠标移除 下拉菜单影藏
  $('.outerAllBox').on('mouseleave', function() {
    $(this)
      .siblings('.hideMenu')
      .css('display', 'none');
  });
  // 下拉菜单盒子鼠标移除 盒子影藏
  $('.rightBox .hideMenu').on('mouseleave', function() {
    $(this).css('display', 'none');
  });
  $('.rightBox .hideMenu').on('mouseenter', function() {
    $(this).css('display', 'block');
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
    // type参数用于判断参数是从下拉菜单（1）传递的还是从模板筛选菜单栏传递的（0）
    typeObj.type = 1;
    // 点击后关闭菜单栏
    $(`.hideMenu`).css('display', 'none');
    //阻止事件冒泡
    e.stopPropagation();
    // 发送请求 并且携带参数 发送请求前 先清空ul下已有元素 第三个参数为1 清空 0或者不传则不清空
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
    console.log(scrollTop + windowHeight, scrollHeight);

    if (scrollTop + windowHeight == scrollHeight - 400 || pageData === 2) {
      // console.log(
      //   '距顶部' +
      //     scrollTop +
      //     '可视区高度' +
      //     windowHeight +
      //     '滚动条总高度' +
      //     scrollHeight
      // );

      getData(pageData);
      mouseEvent();
    }
  };
  // 暂时注释 注册页面滚动事件
  window.addEventListener('scroll', handleScroll, true);
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
        .css('display', 'flex');
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
        .css('display', 'flex');
      $(this)
        .find('.title-box.use')
        .css('display', 'none');
    });
  };

  // 选择语言 语言的点击事件 设置内容 弹出式遮罩框
  $('#dropUl li').on('click', function(e) {
    $('#dropdownMenu2')[0].value = e.target.innerHTML;
    $('#droupTopbox').css('display', 'none');
  });
  $('.inputBoxClick').on('click', function() {
    $('#droupTopbox')
      .css('display', 'block')
      .empty()
      .html(lanuageElement);
  });
  // 关闭按钮点击事件
  $(document).on('click', '#closeIcon,#closeIcon2', function() {
    // 关闭选择语言弹出框
    $('#droupTopbox').css('display', 'none');
    // 关闭弹出框的同时清空视频地址
    $('#droupVideo').prop('src', '');
    // 弹出框内的视频的隐藏
    $('.outer-video-box').css('display', 'none');
  });
  // 弹出框大盒子的点击事件
  // $('#droupTopbox').on('click', function(e) {
  //   e.stopPropagation();
  //   $(this).css('display', 'none');
  //   // 关闭弹出框的同时清空视频地址
  //   $('#droupVideo').prop('src', '');
  //   // 弹出框内的视频的隐藏
  //   $('.outer-video-box').css('display', 'none');
  //   // 弹出框内语言栏的隐藏
  //   $('#dropUl').css('display', 'none');
  // });
});
