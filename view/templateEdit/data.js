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

`;
