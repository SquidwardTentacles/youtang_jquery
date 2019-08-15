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
});
