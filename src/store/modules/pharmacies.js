import { apiGetPharmacies } from '@/api/pharmacies.js';
import { Message, Loading } from 'element-ui';

export const state = {
  // 全部藥房列表
  pharmacyList: [],
  // 地區的藥房
  areaPharmacies: []
};

export const getters = {
  // 取得地區的藥房
  getAreaPharmacies: (state) => ({ county = '', town = '', address = '' }) => {
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
  },
  // 全部的藥房
  allPharmacies: state => state.pharmacyList,
  // 地區的藥房
  areaPharmacies: state => {
    return state.areaPharmacies;
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
      const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      apiGetPharmacies()
        .then(res => {
          loading.close();
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
  },
  // 設定地區的藥房
  setAreaPharmacies({ commit }, data) {
    commit('SET_AREA_PHARMACIES', data);
  }
};

export const mutations = {
  // 設定藥房列表
  SET_PHARMACIES(state, data = []) {
    state.pharmacyList = data;
  },
  // 設定地區的藥房
  SET_AREA_PHARMACIES(state, data = []) {
    state.areaPharmacies = data;
  }
};
