const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * 时长格式化
 */
function durationFormat(duration) {
  var time = duration;
  var minutesInt = 0;
  var secondInt = 0;
  var timeFormat = "";
  var minutes = "";
  var second = "";
  time = time / 60;
  timeFormat = time + "";
  if (timeFormat.indexOf(".") == 0) {
    minutes = timeFormat;
    second = "00";
  } else {
    minutes = timeFormat.substring(0, timeFormat.indexOf("."));
    time = duration % 60;
    timeFormat = time + "";
    second = timeFormat.substring(0, timeFormat.indexOf("."));
  }
  minutesInt = parseInt(minutes);
  secondInt = parseInt(second);
  if (minutesInt < 10) {
    minutes = "0" + minutes;
  }
  if (secondInt < 10) {
    second = "0" + second;
  }
  timeFormat = minutes + ":" + second;
  return timeFormat;
}



module.exports = {
  formatTime: formatTime,
  durationFormat:durationFormat
}
