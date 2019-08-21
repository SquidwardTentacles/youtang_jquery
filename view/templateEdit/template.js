// 引入静态资源
document.write("<script type='text/javascript' src='data.js'></script>");
$(document).ready(function() {
  // 监听屏幕宽度
  $(window).resize(function() {
    let width = $(this).width();
    if (width <= 770) {
      // 左侧盒子隐藏
      $('.left-sesson-box')
        .stop()
        .fadeOut();
      // 显示左侧盒子顶部的下拉菜单
      $('#hidden_select_menu')
        .stop()
        .fadeIn();
    } else {
      $('.left-sesson-box')
        .stop()
        .fadeIn();
      $('#hidden_select_menu')
        .stop()
        .fadeOut();
    }
    let height = $(this).height();
  });

  // 点击事件为其添加样式
  $('#mincontent li').on('click', function() {
    $(this)
      .siblings('li')
      .removeClass('active');
    $(this).addClass('active');
  });
  // 用户头像的鼠标事件
  $('#right_user_img,.user-sesson-hiddenbox').on('mouseenter', function() {
    $('.user-sesson-hiddenbox').css('display', 'block');
  });
  $('#outer_bigbox,.user-sesson-hiddenbox').on('mouseleave', function() {
    $('.user-sesson-hiddenbox').css('display', 'none');
  });
  // 视频标题点击显示编辑按钮
  $('#video_title').on('click', function() {
    $(this)
      .siblings('.input-hidden')
      .css('display', 'flex');
    $(this).css('display', 'none');
  });
  // 取消编辑点击事件
  $('.icon-close').on('click', function() {
    $('#video_title').css('display', 'block');
    $('.input-hidden').css('display', 'none');
  });
  // 视频尺寸的显示隐藏
  $(document).on('mouseenter', '#outer-hiddenbox', function() {
    $(this)
      .find('#select-hidden-box')
      .show();
  });
  $(document).on('mouseleave', '#outer-hiddenbox', function() {
    $(this)
      .find('#select-hidden-box')
      .hide();
  });
  //选择尺寸下拉菜单 li点击隐藏
  $(document).on('click', '#select-hidden-box ul li', function(e) {
    // 点击后隐藏列表
    $(this)
      .parents('#select-hidden-box')
      .hide();
    // 赋值元素内容
    $(this)
      .parent('ul')
      .parent('.hidden-box')
      .siblings()
      .find('#select-content')
      .html(e.target.innerHTML);
    // 改变选中样式
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active');
  });
  // 更改音乐遮罩层 标题点击事件
  $(document).on('click', '#drop-title-click span', function() {
    let id = $(this).data('showid');
    if (id === 0) {
      $('#my-music').show();
      $('#recommend').hide();
      $('');
    } else {
      $('#recommend').show();
      $('#my-music').hide();
    }
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active');
  });
  // 更改音乐点击事件 显示遮罩层
  $('#change-music').on('click', function() {
    $('#drop-box-id').show();
    $('#drop-box-id .rel-box').html(changeMusicJson);
  });
  // 关闭遮罩层
  $(document).on('click', '#closeIcon,#closeIcon2', function() {
    $('#drop-box-id').hide();
  });
  // 上传图片盒子鼠标事件 控制文字的显示 隐藏
  $('#outer-addimg-box,#tips-text').on('mouseenter', function() {
    $('#update-tips').show();
  });
  $('#outer-addimg-box,#tips-text').on('mouseleave', function() {
    $('#update-tips').hide();
  });
  // 音乐设置点击事件
  $('#music-setting-click').on('click', function() {
    $('#drop-box-id,.setting-music').show();
  });
  // 音乐设置淡入淡出点击事件
  $('#checkbox-click').on('click', function() {
    $(this).toggleClass('active');
  });
  // 音乐控件
  let time = 0;
  let audio = document.getElementById('setting-music-id');
  // 设置音乐总时长
  // let timeMusic = 0;
  let musicTime = function() {
    // 将秒数转换成为分钟
    time = audio.duration / 60;
    // 保留两位小数
    if (time < 10) {
      time = '0' + time.toFixed(2);
    } else {
      time = time.toFixed(2);
    }
    // 符号转换
    time = time.replace('.', ':');
    $('.duration #totalTime').html(time);
  };
  audio.addEventListener('canplay', function() {
    // 获取音乐总时长
    musicTime();
    //监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
    // document.getElementById('audio_length_total').innerHTML = transTime(
    //   audio.duration
    // );
  });
  let interval = '';
  let barTime = 0;
  let offsetLeftDefault = 0;
  $('.control-bar').on('click', function(event) {
    // 播放条相对于屏幕左侧的距离
    let Y = $(this).offset().left;
    // 播放条点击相对于屏幕左侧的距离
    let mouseOffset = event.pageX;
    // 播放条宽度
    let barTotalWidth = $('.control-bar').innerWidth();
    let currenClickTime =
      (parseInt(mouseOffset - Y) / barTotalWidth) * audio.duration;
    // audio.fastSeek(currentTime);方法，Safari浏览器支持该方法，Chrome浏览器里没有该方法，所以，使用该方法改变audio.currentTime的值之前，需要先判断fastSeek方法是否存在，即
    if (currenClickTime < audio.duration) {
      if ('fastSeek' in audio) {
        // 谷歌浏览器不兼容fastSeek 方法 所以添加条件判断
        audio.fastSeek(currenClickTime); //改变audio.currentTime的值
      } else {
        audio.currentTime = currenClickTime;
      }
    } else {
      audio.pause();
    }
    barStyle();
  });
  let barStyle = function() {
    // 将改变音乐播放条样式的方法封装 方便调用
    barTime = parseFloat(audio.currentTime / audio.duration) * 100;
    $('.control-btn').css('left', barTime + '%');
    $('.control-bar-process').css('width', 100 - barTime + '%');
    // 如果当前播放进度等于总进度 就清空计时器
    if (barTime >= 100) {
      window.clearInterval(interval);
      $('.control-music-btn').removeClass('play');
      $('.control-btn').css('left', 0 + '%');
      $('.control-bar-process').css('width', 100 + '%');
    }
  };
  $('.control-music-btn').on('click', function(e) {
    audioContent();
  });
  let audioContent = function() {
    event.stopPropagation(); //防止冒泡
    if ($('.control-music-btn').hasClass('play')) {
      $('.control-music-btn').removeClass('play');
      audio.pause();
      window.clearInterval(interval);
    } else {
      interval = setInterval(() => {
        barStyle();
      }, 600);
      $('.control-music-btn').addClass('play');
      audio.play();
    }
  };
  // 封装请求基地址
  let saveBaseUrl = 'http://localhost:8090';
  // input change事件 页面 ‘ 拖拽或点击+上传图片’ 上传图片操作
  $('#upoload-file-content').on('change', function(e) {
    let file = $(this)[0].files;
    console.log(file);
    // 使用formData数据格式发送文件
    let formData = new FormData();
    formData.append('file', file[0]);
    // console.log(formData.get('file'));

    axios
      .post(saveBaseUrl + '/filesUpdate', formData)
      .then(res => {
        console.log(res);
        if (res.data.errcode === 0) {
          console.log('chengg');
          // 图片上传成功之后影藏上传提示消息
          $('#tips-text').hide();
          let fr = new FileReader();
          fr.onload = function(e) {
            console.log(fr);

            console.log(this.reset);

            let elementStr = `
              <div class="pic" id="upload-hidden-imgbox">
                <img src="${this.result}" />
                <div class="bottom-editbox flexbox j-end">
                  <li class="hidden one"></li>
                  <li class="hidden two"></li>
                  <li class="show"></li>
                </div>
              </div>
            `;
            // 显示隐藏的显示图片的盒子
            $('.update-img-showbox').fadeIn('slow');
            // 添加图片到页面
            $('#backimg').append(elementStr);
            // 上传成功后显示编辑片头片尾盒子
            $('#have_img_show,#have_img_show1')
              .stop()
              .show();
          };
          fr.readAsDataURL(file[0]); //读取文件
        } else {
          console.log('图片上传保存失败');
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  // 将上传成功之后回显的图片事件封装 每生成一次元素就调用一次 解决js生成元素事件不调用问题
  // let cresateImgElement = function() {
  // 图片上传后隐藏盒子的鼠标移入
  $(document).on('mouseenter', '#upload-hidden-imgbox', function() {
    $(this)
      .find('.show')
      .stop()
      .css(
        'background',
        "url('../../static/images/template-imguploladHoverIcon/remove-hover.svg') center center/12px auto no-repeat"
      );
    $(this)
      .find('.hidden')
      .stop()
      .fadeIn('slow');
  });
  $(document).on('mouseleave', '#upload-hidden-imgbox', function() {
    $(this)
      .find('.show')
      .stop()
      .css(
        'background',
        "url('../../static/images/template-imguploladHoverIcon/right.svg') center center/12px auto no-repeat"
      );
    $(this)
      .find('.hidden')
      .stop()
      .fadeOut('slow');
  });
  // };

  // 页面添加图片动画
  $('#add_img_uploadbox').on('mouseenter', function() {
    $(this)
      .find('#add_icon')
      .stop()
      .hide();
    $(this)
      .find('#left_edit_box')
      .stop()
      .animate({
        left: '10px',
        opacity: 1
      });
    $(this)
      .find('#right_edit_box')
      .stop()
      .animate({
        right: '10px',
        opacity: 1
      });
  });
  $('#add_img_uploadbox').on('mouseleave', function() {
    $(this)
      .find('#left_edit_box')
      .stop()
      .animate({
        left: '20px',
        opacity: 0
      });
    $(this)
      .find('#right_edit_box')
      .stop()
      .animate({
        right: '20px',
        opacity: 0
      });

    $(this)
      .find('#add_icon')
      .stop()
      .show();
  });
});
