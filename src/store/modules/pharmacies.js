import { apiGetPharmacies } from '@/api/pharmacies.js';
import { Message } from 'element-ui';

export const state = {
  // 藥房列表
  pharmacyList: []
};

export const getters = {
  // 地區的藥房
  areaPharmacies: (state) => ({ county = '', town = '', address = '' }) => {
    let searchRegex = null;
    // 取代「臺」字為「台」字
    county = county.replace(/臺/gi, '台');
    address = address.replace(/臺/gi, '台');
    // 依地區搜尋
    if (!address) {
      // 區域為「全部區域」，則依市搜尋
      if (town === '全部區域') searchRegex = county;
      else searchRegex = county + town;
    }
    else searchRegex = address;
    const regex = new RegExp(searchRegex, 'gi');
    return state.pharmacyList.filter(pharmacy => {
      return pharmacy.properties.address.match(regex);
    });
  }
};

export const actions = {
  // 預設執行
  init({ dispatch }) {
    return new Promise(resolve => {
      dispatch('getPharmacies').then(() => resolve());
    });
  },
  // 取得藥房列表
  getPharmacies({ commit }) {
    return new Promise(resolve => {
      apiGetPharmacies()
        .then(res => {
          commit('SET_PHARMACIES', res.features);
        })
        .catch(() => {
          Message({
            message: '讀取資料錯誤，請稍後再試',
            type: 'error'
          });
        })
        .finally(() => resolve());
    });
  }
};

export const mutations = {
  // 設定藥房列表
  SET_PHARMACIES(state, data = []) {
    state.pharmacyList = data;
  }
};
