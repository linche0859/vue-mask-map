import axios from 'axios';
import { Message } from 'element-ui';

/**
 * 提示窗
 * @param {string} msg 提示訊息
 */
const tip = msg => {
  Message({
    message: msg,
    type: 'error'
  });
};

/**
 * 請求失敗後的錯誤統一處理
 * @param {number} status 請求狀態
 * @param {string} other 其他說明
 */
const errorHandler = (status, other) => {
  // 狀態碼判斷
  switch (status) {
    // 401: 未登錄狀態，跳轉登錄頁
    case 401:
    case 403:
    case 404:
      tip('讀取資料錯誤，請稍後再試');
      break;
    default:
      console.log(other);
  }
};

// 創建 axios 實例
var instance = axios.create({ timeout: 1000 * 12 });
// 設置 post 請求頭
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

/**
 * 請求攔截器
 */
instance.interceptors.request.use(
  config => config,
  error => Promise.error(error)
);

// 響應攔截器
instance.interceptors.response.use(
  // 請求成功
  res => (res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)),
  // 請求失敗
  error => {
    const { response } = error;
    if (response) {
      // 請求已發出，但是不在2xx的範圍
      errorHandler(response.status, response.data.message);
      return Promise.reject(response);
    }
    else {
      // 處理斷網的情況
      if (!window.navigator.onLine) {
        tip('網路中斷，請重新連結網路');
      }
      return Promise.reject(error);
    }
  }
);

export default instance;
