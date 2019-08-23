let videoElemenmt = `
<div class="outer-video-box flexbox" id="videoBoxClickId">
<div class="video-box flexbox between">
  <p class="closeIcon" id="closeIcon">×</p>
  <div class="left-video-box flexbox">
    <video
      autoplay=""
      poster=""
      controls="controls"
      controlslist="nodownload"
      src=""
      id="droupVideo"
    ></video>
  </div>
  <div class="right-content">
    <h3 class="title-box" id="video_title"></h3>
    <div class="iconbox time">时长不限</div>
    <div class="iconbox write">支持照片/视频/文本</div>
    <div class="select-drop-box flexbox j-start">
      <span class="lefticon"></span>
      <div class="selectbox right-content-box">
        <li class="title flexbox j-start" id="select-choose_click">
          <div class="rightBox">
            <div class="outerAllBox">
              <p data-show="video-hidden-box" id="placeTitle">
                16 : 9（横屏）
              </p>
            </div>
            <ul class="hideMenu video-hidden-box">
              <li>
                <a href="#">16 : 9（横屏）</a>
              </li>
              <li>
                <a href="#">9 : 16（竖屏）</a>
              </li>
              <li>
                <a href="#">1 : 1（正方形）</a>
              </li>
            </ul>
          </div>
        </li>
      </div>
    </div>
  </div>
</div>
</div>
`;

let lanuageElement = `
<ul id="dropUl" class="flexbox">
        <p class="closeIcon" id="closeIcon2">×</p>
        <div class="flexbox lanuageInbox j-start">
          <li class="us">
            <!-- href="https://lightmv.com/" -->
            <a>English</a>
          </li>
          <li class="fr">
            <!-- href="https://lightmv.com/fr" -->
            <a>Fran?ais</a>
          </li>
          <li class="de">
            <!-- href="https://lightmv.com/de" -->
            <a>Deutsch</a>
          </li>
          <li class="it">
            <!-- href="https://lightmv.com/it" -->
            <a>Italiano</a>
          </li>
          <li class="se">
            <!-- href="https://lightmv.com/se" -->
            <a>Svenska</a>
          </li>
          <li class="nl">
            <!-- href="https://lightmv.com/nl" -->
            <a>Nederlands</a>
          </li>
          <li class="es">
            <!-- href="https://lightmv.com/es" -->
            <a>Espa?ol</a>
          </li>
          <li class="fi">
            <!-- href="https://lightmv.com/fi" -->
            <a>Suomi</a>
          </li>
          <li class="no">
            <!-- href="https://lightmv.com/no" -->
            <a>Norsk</a>
          </li>
          <li class="dk">
            <!-- href="https://lightmv.com/dk" -->
            <a>Dansk</a>
          </li>
          <li class="tr">
            <!-- href="https://lightmv.com/tr" -->
            <a>Türk?e</a>
          </li>
          <li class="pl">
            <!-- href="https://lightmv.com/pl" -->
            <a>Polski</a>
          </li>
          <li class="jp">
            <!-- href="https://lightmv.com/jp" -->
            <a>日本語</a>
          </li>
          <li class="tw">
            <!-- href="https://lightmv.com/tw" -->
            <a>繁體中文</a>
          </li>
          <li class="cn">
            <!-- href="https://lightmv.com/zh" -->
            <a>简体中文</a>
          </li>
          <li class="hu">
            <!-- href="https://lightmv.com/hu" -->
            <a>Magyar</a>
          </li>
          <li class="cz">
            <!-- href="https://lightmv.com/cz" -->
            <a>?e?tina</a>
          </li>
          <li class="pt">
            <!-- href="https://lightmv.com/pt" -->
            <a>Português</a>
          </li>
        </div>
      </ul>
`;
let loadingElement = `
  <div class="loading_box ">
    <p class="closeIcon loading_drop" id="closeIcon2">×</p>
    <div class="inner"></div>
  </div>
`;
