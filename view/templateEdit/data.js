// 更改音乐弹窗文件
let changeMusicJson = `
<div class="change-music rel_center">
<div class="in-rel-box">
  <p class="closeIcon" id="closeIcon">×</p>
  <div class="title-box" id="drop-title-click">
    <span class="active" data-showid="0">我的音乐</span>
    <span data-showid="1">推荐</span>
  </div>
  <div class="outer-music show" id="my-music">
    <form enctype="multipart/form-data" id="uploadForm">
      <div class="update-music flexbox">
        <span class=" add-icon">上传</span>
        <input type="file" id="upoload-file" />
      </div>
      <input
        type="button"
        value="上传"
        id="upJQuery"
        class="update-btn"
      />
    </form>
  </div>
  <!-- 遮罩层 推荐内容 -->
  <div class="outer-music hidden" id="recommend">
    <div class="music-box">
      <div class="check-icon active"></div>
    </div>
    <input
      type="button"
      value="上传"
      id="upJQuery"
      class="update-btn"
    />
  </div>
</div>
</div>
`;
// 音乐设置弹窗代码
let musicSetting = `
<div class="setting-music rel_center">
<div class="setting-rel-box">
  <p class="closeIcon" id="closeIcon2">×</p>
  <p class="box-title">音乐截取（默认）</p>
  <div class="audio-box">
    <audio src="../../static/music.mp3" id="setting-music-id">
      您的浏览器不支持 audio 标签。
    </audio>
    <div class="control-music flexbox">
      <div class="control-music-btn"></div>
      <div class="control-bar">
        <div class="control-bar-process" style="width: 100%"></div>
        <div class="control-btn left-control" style="left: 0%;">
          <span>00:00</span>
        </div>
        <div class="control-btn right-control" style="left: 100%;">
          <span>141</span>
        </div>
      </div>
      <div class="duration">
        <span id="totalTime">00:00</span>
      </div>
    </div>
  </div>
  <div class="check">
    <div class="checkbox flexbox j-end" id="checkbox-click">
      <div class="checkbox-icon">
        <svg
          class="icon icon-checkbox"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          is="icon"
          type="checkbox"
          viewBox="0 0 18 18"
          width="19px"
          height="19px"
        >
          <path
            style="stroke:none; fill:currentColor"
            d="M12.7,4.3C11,6.6,8.9,9.1,8.1,12c-0.9-1-1.9-2-2.9-2.8c-0.7-0.5-1.6,0.4-0.9,1c1.3,1,2.5,2.3,3.7,3.6c0.3,0.3,1,0.2,1.1-0.3C9.6,10.3,12,7.6,13.9,5C14.4,4.3,13.2,3.6,12.7,4.3"
          ></path>
        </svg>
      </div>
      <div class="checkbox-label">
        淡入淡出
      </div>
    </div>
  </div>
  <div class="bottom-btn-outer flexbox">
    <div class="bottom-btn">确定</div>
  </div>
</div>
</div>
`;
// ‘开头’ 点击事件的弹窗
let titlesData = `
        <div class="titles rel_center">
          <div class="titles_innerrel">
            <div class="icon_box">
              <p class="close" id="titles_close">×</p>
              <p class="toggle left_icon disable"></p>
              <p class="toggle right_icon" id="titles_next"></p>
            </div>
            <div class="top_img_bg">
              <img src="../../static/images/video-img.jpg" id="droup_img_titles" alt="" srcset="" />
            </div>  
            <div class="operation flexbox j-end">
              <p id="clear_input_data">清空</p>
              <p>重置</p>
            </div>
            <div class="input_box flexbox between">
              <input type="text" id="titles_input" maxlength="10" />
              <p><span id="feed_in">0</span> / <span> 10</span></p>
            </div>
            <div class="btn_box">确定</div>
          </div>
        </div>
`;
// 图片滤镜弹窗
let picticeFilter = `
<div class="titles rel_center">
          <div class="titles_innerrel">
            <div class="icon_box">
              <p class="close" id="titles_close">×</p>
              <p class="toggle left_icon" id="titles_last"></p>
              <p class="toggle right_icon disable"></p>
            </div>
            <div class="top_img_bg">
              <img src="../../static/images/video-img.jpg" id="droup_filter_img" alt="" srcset="" />
            </div>
            <div class="operation filter flexbox j-center">
              <li class="change">
                <div class="inner">
                  更换
                </div>
              </li>
              <li class="rotate">
                <div class="inner">
                  旋转
                </div>
              </li>
              <li class="self_adaption">
                <div class="inner">
                  自适应
                </div>
              </li>
              <li class="filter">
                <div class="inner">
                  滤镜
                </div>
              </li>
              <li class="reset">
                <div class="inner">
                  重置
                </div>
              </li>
            </div>
            <div class="btn_box">确定</div>
          </div>
        </div>
`;
