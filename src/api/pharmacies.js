// 管理藥房的 api 請求
import url from './base.js';

import axios from './index.js';

/**
 * 取得藥房資料
 */
export const apiGetPharmacies = () => {
  return axios({
    method: 'get',
    url: url.pharmacies
  });
};
