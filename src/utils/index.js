function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join("/");
  const t2 = [hour, minute, second].map(formatNumber).join(":");

  return `${t1} ${t2}`;
}


//-------------------------------------------------------------------------请求的封装

//定义计时器
let loadCount = 0;

const host = "https://www.heyuhsuo.xyz/heyushuo";
export {
  host
};

//请求封装
function request(url, method, data, header = {}) {
  loadCount++;
  wx.showLoading({
    title: "加载中" //数据请求前loading
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(res) {
        loadCount--;
        if (!loadCount) {
          wx.hideLoading();
        }
        resolve(res.data);
      },
      fail: function(error) {
        console.log(error);
        loadCount--;
        if (!loadCount) {
          wx.hideLoading();
        }
        reject(false);
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  });
}

export function get(url, data) {
  return request(url, "GET", data);
}

export function post(url, data) {
  return request(url, "POST", data);
}

//-------------------------------------------------------------------------请求的封装


//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------


export function toLogin() {
  const userInfo = wx.getStorageSync("userInfo");
  if (!userInfo) {
    wx.navigateTo({
      url: "/pages/login/main"
    });
  } else {
    return true;
  }
}

export function login() {
  const userInfo = wx.getStorageSync("userInfo");
  if (userInfo) {
    return userInfo;
  }
}

//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------


export function getStorageOpenid() {
  const openId = wx.getStorageSync("openId");
  if (openId) {
    return openId;
  } else {
    return "";
  }
}


export function getOpenid() {
  // wx.login({
  //   success: res => {
  //     if (res.code) {
  //       //发起网络请求
  //       wx.request({
  //         url: 'https://api.weixin.qq.com/sns/jscode2session',
  //         data: {
  //           "appid": "wx601ce71bde7b9add",
  //           "secret": "abed5421d88eb8236e933c6e42d5c14e",
  //           "js_code": res.code,
  //           "grant_type": "authorization_code"
  //         },
  //         success: function (data) {
  //           var openid = data.data.openid;
  //           wx.setStorageSync("openid", openid);
  //         }
  //       })
  //     } else {
  //       console.log('登录失败！' + res.errMsg)
  //     }

  //   },
  //   fail: () => {},
  //   complete: () => {}
  // });
}


// 防抖
export function debounce(func, time) {
  var timeout;
  return function() {
    var _this = this;
    var args = arguments;
    //清除定时器
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(_this, args);
    }, time);
  };
}

// 节流-时间戳

export function throttle(func, wait) {
  let resultTime = 0;
  return function() {
    let now = new Date(); //时间戳
    let _this = this;
    let args = arguments;
    // now - resulTime只有大于wait才会执行,在wait时间内只执行一次
    if (now - resultTime > wait) {
      func.apply(_this, args);
      resultTime = now;
    }
  };
}

// 节流-设置定时器

export function throttleTwo(func, wait) {
  let timeout;
  return function() {
    let _this = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(function() {
        func.apply(_this, args);
        timeout = null;
      }, wait);
    }
  };
}
