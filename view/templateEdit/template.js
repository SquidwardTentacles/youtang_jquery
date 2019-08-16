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
    console.log(id);
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
  $('#update-click').on('click', function() {
    console.log($('#upload-file').val());
  });

  $('#upJQuery').on('click', function() {
    var fd = new FormData();
    fd.append('upload', 1);
    console.log($('#upoload-file').get(0).files[0]);

    fd.append('upfile', $('#upfile').get(0).files[0]);
    // $.ajax({
    //   url: 'test.php',
    //   type: 'POST',
    //   processData: false,
    //   contentType: false,
    //   data: fd,
    //   success: function(d) {
    //     console.log(d);
    //   }
    // });
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
  var audio = document.getElementById('setting-music-id');
  // 设置音乐总时长
  let timeMusic = 0;
  let musicTime = function() {
    timeMusic = audio.duration;
    let time = timeMusic / 60;
    var timeStr = '';
    console.log(time.toFixed(2));
    if (time < 10) {
      timeStr += '0' + time.toFixed(2);
    } else {
      timeStr = time.toFixed(2);
    }
    console.log(timeStr);

    $('.duration').html(timeStr);
  };
  audio.addEventListener('canplay', function() {
    musicTime();
    //监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
    // document.getElementById('audio_length_total').innerHTML = transTime(
    //   audio.duration
    // );
  });
  let interval = '';
  let barTime = 0;
  let offsetLeftDefault = 0;
  $('.control-bar-process').on('click', function(e) {
    console.log($(this).offset().left);
  });
  $('.control-music-btn').on('click', function(e) {
    console.log($(this).offset().left);

    event.stopPropagation(); //防止冒泡
    if ($(this).hasClass('play')) {
      $(this).removeClass('play');
      audio.pause();
      window.clearInterval(interval);
    } else {
      interval = setInterval(() => {
        barTime = parseFloat(audio.currentTime / timeMusic) * 100;
        $('.control-btn').css('left', barTime + '%');
        $('.control-bar-process').css('width', 100 - barTime + '%');
        // 如果当前播放进度等于总进度 就清空计时器
        if (barTime >= 100) {
          window.clearInterval(interval);
          $(this).removeClass('play');
          $('.control-btn').css('left', 0 + '%');
          $('.control-bar-process').css('width', 100 + '%');
        }
      }, 1000);
      $(this).addClass('play');
      audio.play();
    }
  });
});
