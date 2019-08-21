let changeMusicJson = `
<div class="change-music">
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
let musicSetting = `
<div class="setting-music">
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
