$(document).ready(function() {
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
  $('#outer-hiddenbox').on('mouseenter', function() {
    $('#select-hidden-box').show();
  });
  $('#outer-hiddenbox').on('mouseleave', function() {
    $('#select-hidden-box').hide();
  });
  // li点击隐藏
  $('#select-hidden-box ul li').on('click', function(e) {
    $('#select-hidden-box').hide();
    $('#select-content').html(e.target.innerHTML);
    // 改变选中样式
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active');
  });
  // 更改音乐遮罩层 标题点击事件
  $('#drop-title-click span').on('click', function() {
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
    $('#drop-box-id,.change-music').show();
  });
  // 关闭遮罩层
  $('#closeIcon,#closeIcon2').on('click', function() {
    $('#drop-box-id,.change-music,.setting-music').hide();
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
  var audio = document.getElementById('setting-music-id');
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
    var Y = $(this).offset().left;
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
  // 遮罩层图片上传

  // $('#upJQuery').on('click', function() {
  //   let updateFiles = $('#upoload-file');
  //   // console.log(updateFiles);

  //   // $('#upoload-file').click();
  //   let files = document.getElementById('upoload-file')[0];
  //   console.log(files);

  //   // let formData = new formData();
  //   formData.append('file', files);
  //   // formData.append('file', updateFiles[0].files[0]);
  //   // console.log(files);
  //   console.log(formData);

  //   // const formData = new FormData();
  //   // formData.append('files', files[0]);
  //   // formData.append('file1', files[1]);
  //   axios
  //     .post(saveBaseUrl + '/filesUpdate', formData)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // });
  // 封装请求基地址
  let saveBaseUrl = 'http://localhost:8090';
  // input change事件
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

          var fr = new FileReader();
          fr.onload = function(e) {
            let elementStr = `
            <div class="pic">
              <img src="${this.result}" />
            </div>
            `;
            // 显示隐藏的显示图片的盒子
            $('.update-img-showbox').fadeIn('slow');
            // 添加图片到页面
            $('#backimg').append(elementStr);
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

  // 图片上传后隐藏盒子的鼠标移入
  $('#upload-hidden-imgbox').on('mouseenter', function() {
    $(this)
      .find('.show')
      .css(
        'background',
        "url('../../static/images/template-imguploladHoverIcon/remove-hover.svg') center center/12px auto no-repeat"
      );
    $(this)
      .find('.hidden')
      .fadeIn('slow');
  });
  $('#upload-hidden-imgbox').on('mouseleave', function() {
    $(this)
      .find('.show')
      .css(
        'background',
        "url('../../static/images/template-imguploladHoverIcon/right.svg') center center/12px auto no-repeat"
      );
    $(this)
      .find('.hidden')
      .fadeOut('slow');
  });
});
