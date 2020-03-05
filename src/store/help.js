// 將 state、getters、actions 統一管理於此介面
import { mapGetters, mapActions } from 'vuex';

// 藥房的 computed 屬性
export const pharmaciesComputed = {
  ...mapGetters('pharmacies', ['areaPharmacies'])
};

export const pharmaciesMethods = mapActions('pharmacies', ['getPharmacies']);
