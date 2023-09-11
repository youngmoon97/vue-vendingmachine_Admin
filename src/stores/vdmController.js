// src/store/beverages.js
import { defineStore } from "pinia";
import useMoneyReturnStore from "@/stores/moneyReturn";
// Define your store
export const useControllerStore = defineStore("controller", {
  state: () => ({
    inputMoney: 0,
    currentMoney: 0,
    returnMoneys: [],
  }),
  getters: {},
  actions: {
    //투입 금액 계산
    moneyAdd: function moneyAdd(inputMoney) {
      let tempMoney = this.currentMoney + inputMoney;
      if (this.inputMAXChk(tempMoney) == "return") {
        return 0;
      } else {
        this.currentMoney += inputMoney;
      }
    },
    //최대 투입 금액 계산
    inputMAXChk: function inputMAXChk(tempMoney) {
      if (tempMoney > this.inputMAX) {
        this.currentMoney = tempMoney;
        useMoneyReturnStore.inputMoneyReturn();
        return "return";
      } else {
        return "ok";
      }
    },
  },
  computed: {},
});
