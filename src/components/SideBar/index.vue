<script>
import { apiGetCityCounty } from '@/api/cityCounty.js';
import { pharmaciesMethods } from '@/store/help.js';
import markerOpen from '@/utils/markerOpen.js';

export default {
  name: 'SideBar',
  components: {},
  props: {
    markers: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      // 使用者裝置解析度
      userDeviceWidth: 768,
      // 側邊欄開關
      sideBarSwitch: false,
      // 城市鄉鎮資料
      cityCountyList: [],
      // 下拉資料
      select: {
        // 城市列表
        cities: [],
        // 鄉鎮列表
        counties: []
      },
      // 已被選擇的資料
      selected: {
        city: null,
        county: null
      },
      input: {
        // 搜尋地址
        searchAddress: ''
      },
      // 地區藥局資料
      pharmacyList: [],
      date: {
        // 星期
        week: '',
        // 完整日期
        completeDate: ''
      },
      // 可購買的身分證末碼
      idCardLastNumber: ''
    };
  },
  watch: {
    sideBarSwitch(val) {
      this.changeSideBarPosition(val);
    }
  },
  created() {
    this.getCityCountyHandler();
  },
  mounted() {
    this.userDeviceWidth =
      window.innerWidth > 0 ? window.innerWidth : screen.width;
    const date = new Date();
    const weeks = ['日', '一', '二', '三', '四', '五', '六'];
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    this.date.week = `星期${weeks[date.getDay()]}`;
    this.date.completeDate = `${year}-${month}-${day}`;
    let i = 0;
    const lastNumbers = [];
    if (date.getDay() === 0) lastNumbers.push('不限制');
    else {
      while (i < 10) {
        const remainder = date.getDay() % 2;
        // 0 為偶數的處理方式
        if (i === 0) {
          remainder === 0 && lastNumbers.push(i);
        }
        else {
          i % 2 === remainder && lastNumbers.push(i);
        }
        i++;
      }
    }
    this.idCardLastNumber = lastNumbers.toString();
  },
  methods: {
    // actions of store
    ...pharmaciesMethods,
    /**
     * 取得城市鄉鎮資料
     */
    async getCityCountyHandler() {
      const cityCounties = await apiGetCityCounty();
      cityCounties.forEach(city => {
        const areaList = city.AreaList;
        // 加入全部區域選項
        if (areaList.findIndex(area => area.AreaName === '全部區域') === -1) {
          areaList.splice(0, 0, {
            AreaName: '全部區域'
          });
        }
      });
      this.cityCountyList = cityCounties;
      this.select.cities = cityCounties.map(({ CityName, CityEngName }) => {
        return {
          CityName,
          CityEngName
        };
      });
      const defaultCity = this.select.cities[0].CityName;
      this.selected.city = defaultCity;
      this.getCountiesHandler(defaultCity);
    },
    /**
     * 取得選擇城市後的鄉鎮列表
     */
    getCountiesHandler(cityName) {
      const area = this.cityCountyList.find(city => city.CityName === cityName);
      this.select.counties = area.AreaList;
      this.selected.county = area.AreaList[0].AreaName;
      this.resetSearchAddressHandler();
    },
    /**
     * 重置搜尋地址事件
     */
    resetSearchAddressHandler() {
      this.input.searchAddress = '';
      this.getPharmacyListHandler();
    },
    /**
     * 取得地區的藥局資料
     */
    getPharmacyListHandler() {
      this.pharmacyList = this.$store.getters['pharmacies/getAreaPharmacies']({
        county: this.selected.city,
        town: this.selected.county,
        address: this.input.searchAddress
      });
      this.setAreaPharmacies(this.pharmacyList);
    },
    /**
     * 選擇城市事件
     */
    changeCityHandler(cityName) {
      this.getCountiesHandler(cityName);
      this.getDefaultPharmacy();
    },
    /**
     * 選擇鄉鎮事件
     */
    changeCountyHandler() {
      this.resetSearchAddressHandler();
      this.getDefaultPharmacy();
    },
    /**
     * 輸入查詢地址事件
     */
    changeSearchAddressHandler() {
      this.getPharmacyListHandler();
      this.getDefaultPharmacy();
    },
    /**
     * 取得預設的藥房
     * @param {number} lat 藥房緯度
     * @param {number} lng 藥房經度
     */
    getDefaultPharmacy(lat = 0, lng = 0) {
      if (!this.pharmacyList.length) {
        this.$message({
          message: '查無資料喔',
          type: 'warning'
        });
        return;
      }
      if (!lat && !lng) {
        lat = this.pharmacyList[0].geometry.coordinates[1];
        lng = this.pharmacyList[0].geometry.coordinates[0];
      }
      if (this.userDeviceWidth <= 768) this.sideBarSwitch = true;
      markerOpen(this.markers, lat, lng);
    },
    /**
     * 切換側邊攔位置
     * @param {boolean} status 開閉狀態
     */
    changeSideBarPosition(status = true) {
      const sideBar = document.querySelector('.side-bar');
      const left = '-300px';
      // const left = this.userDeviceWidth > 768 ? '-350px' : '-300px';
      sideBar.style.left = `${status ? left : '0'}`;
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
