// src/store/beverages.js
import { defineStore } from "pinia";
import useBeveragesStore from "./beverages";
import useMoneysStore from "@/stores/money";
import useControllerStore from "@/stores/vdmController";
// Define your store
export const useLedsStore = defineStore("leds", {
  state: () => ({
    noMoneyLEDs: [false],
    fullMoneyLEDs: [false],
    buyLEDs: [false],
    noItemLEDs: [false],
  }),
  getters: {},
  actions: {
    noMoneyLEDsOnOff() {
      // 동전 보유량 확인 및 LED 점등
      this.noMoneyLEDs = [false, false, false, false];
      useMoneysStore.eachAmountOfMoneys.forEach((amount, index) => {
        if (amount == 0) {
          this.noMoneyLEDs[index] = true;
        }
      });
    },

    fullMoneyLEDsOnOff() {
      this.fullMoneyLEDs = [false, false, false, false, false];
      useMoneysStore.eachAmountOfMoneys.forEach((amount, index) => {
        if (amount == 100) {
          this.fullMoneyLEDs[index] = true;
        }
      });
    },

    buyLedsOnOff() {
      this.buyLEDs = [false, false, false, false];
      useBeveragesStore.beverages.forEach((element, idx) => {
        if (element.price <= useControllerStore.currentMoney) {
          this.buyLEDs[idx] = true;
        }
      });
    },

    noItemLEDsOnOff() {
      useBeveragesStore.beverages.forEach((item, idx) => {
        if (item.EA == 0) {
          this.noItemLEDs[idx] = true;
        }
      });
    },
  },
  computed: {},
});
