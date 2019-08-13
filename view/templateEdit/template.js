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
});
