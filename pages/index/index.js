//index.js
var util = require('../../utils/util.js');

Page({
  data: {
    currentDuration: "00:00",
    duration: "00:00",
    minSlider: 0,
    maxSlider: 1000,
    currentSlider: 0,
    playStatusUrl: "../../images/icon_pause.png"
  },

  onLoad: function () {
    that = this;
    audio();
  },

  /**
   * 音频播放暂停
   */
  playAudioStatus: function () {
    if (isPlaying) {
      this.setData({
        playStatusUrl: "../../../../images/icon_play.png",
      });
      innerAudioContext.pause(() => { })
      isPlaying = false;
    } else {
      innerAudioContext.play(() => { })
      this.setData({
        playStatusUrl: "../../../../images/icon_pause.png",

      });
      isPlaying = true;
    }
  },

  slidering: function (event) {
    innerAudioContext.pause(() => { })
  },
  
  sliderchange: function (event) {
    innerAudioContext.seek(event.detail.value);
  }

})



var innerAudioContext
var that
var isPlaying = true

function audio() {
  innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.autoplay = true
  innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
  innerAudioContext.onPlay(() => {
  })

  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })

  /**
 * 音频时长
 */
  innerAudioContext.onTimeUpdate((res) => {
    var timeAll = util.durationFormat(innerAudioContext.duration)
    var time = util.durationFormat(innerAudioContext.currentTime)
    console.log(time)
    that.setData({
      currentDuration: time,
      duration: timeAll,
      currentSlider: innerAudioContext.currentTime,
      maxSlider: innerAudioContext.duration
    });
  })

  innerAudioContext.onCanplay(() => {
    innerAudioContext.pause(() => { })
    innerAudioContext.play(() => { })
  })

  innerAudioContext.onWaiting(() => {
  })

  /**
   * 播放结束
   */
  innerAudioContext.onEnded((res) => {
    that.setData({
      playStatusUrl: "../../../../images/icon_play.png",
    });
    isPlaying = false;
  })

}
