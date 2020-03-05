// 管理城市鄉鎮的 api 請求
import url from './base.js';

import axios from './index.js';

/**
 * 取得城市鄉鎮資料
 */
export const apiGetCityCounty = () => {
  return axios({
    method: 'get',
    url: url.cityCounty
  });
};
