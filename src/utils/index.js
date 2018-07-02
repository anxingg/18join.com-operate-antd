import config from './config'
import menu from './menu'
import request from './request'
import classnames from 'classnames'
import {color} from './theme'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, function () {
    return arguments[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? o[k]
        : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

Object.defineProperty(Array.prototype, 'group', {
  enumerable: false,
  value: function (key) {
    var map = {};
    this.map(e => ({k: key(e), d: e})).forEach(e => {
      map[e.k] = map[e.k] || [];
      map[e.k].push(e.d);
    });
    return map;
  }
});

//金额格式化
Number.prototype.format = function (n, x) {
  let re = `\\d(?=(\\d{${x || 3} })+${n > 0 ? '\\.' : '$'})`
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,')
}

const money100 = (e) => {
  if (!e || e === 0 || e === '0' || e === '0.00') {
    return '0.00'
  }
  if (!e || isNaN(e)) {
    return e
  }
  return (parseInt(e, 10) / 100).format(2)
}

const urlParam = (url) => {
  if (!!window.location.search || !!url) {
    var urlparams;
    if (url) {
      urlparams = url.substring(url.indexOf('?') + 1);
    } else {
      urlparams = decodeURI(window.location.search.substring(1));
    }
    var kv = urlparams.split("&");
    var param = {}, par, paramkey;
    for (var index = 0, len = kv.length; index < len; index++) {
      par = kv[index].split("=");
      paramkey = par[0];
      if (paramkey.indexOf("[]") === (paramkey.length - 2)) {
        var q = paramkey.substring(0, paramkey.length - 2);
        if (param[q] === undefined) {
          param[q] = [];
        }
        param[q].push(par[1]);
      } else {
        param[paramkey] = par[1];
      }
    }
    return param;
  } else {
    return {};
  }
}

module.exports = {
  config,
  menu,
  request,
  color,
  money100,
  classnames,
  urlParam,
}
