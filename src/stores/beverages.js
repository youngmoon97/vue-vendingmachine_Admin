// src/store/beverages.js
import useLedsStore from "./led";
import useVdmControllerStore from "./vdmController";
import useMoneyStore from "./money";

import { defineStore } from "pinia";

// Define your store
export const useBeveragesStore = defineStore("beverages", {
  state: () => ({
    // 음료 정보
    beverages: [
      {
        idx: 0,
        pic: require("../assets/coke.jpg"),
        name: "Coke",
        price: "1500",
        EA: 8,
      },
      {
        idx: 1,
        pic: require("../assets/coffee.jpg"),
        name: "Coffee",
        price: "3000",
        EA: 5,
      },
      {
        idx: 2,
        pic: require("../assets/tea.jpg"),
        name: "Tea",
        price: "2600",
        EA: 5,
      },
      {
        idx: 3,
        pic: require("../assets/water.jpg"),
        name: "Water",
        price: "280",
        EA: 10,
      },
    ],
    beveragesOutlet: [],
    isServiced: false,
  }),
  getters: {
    getBeverages() {
      return this.beverages;
    },
  },
  actions: {
    addBeverage(item) {
      this.beverages.push(item);
    },

    getSelectedItem(itemidx) {
      return this.beverages[itemidx];
    },

    changeItem(idx, name, price) {
      this.beverages.forEach((element, index) => {
        if (element.idx == idx) {
          this.beverages[index].name = name;
          this.beverages[index].price = price;
        }
      });
    },

    deleteItem(idx) {
      console.log(`idx : ${idx}`);
      this.beverages.forEach((element, index) => {
        if (element.idx == idx) {
          this.beverages.splice(index, 1);
        }
      });
    },
    //음료재고뺴기
    returnItem(idx) {
      this.beverages.forEach((element, index) => {
        if (element.idx == idx) {
          this.beverages[index].EA--;
        }
      });
    },

    addItem(idx) {
      this.beverages.forEach((element, index) => {
        if (element.idx == idx) {
          this.beverages[index].EA++;
        }
      });
    },

    buyBeverageBtn(itemIndex) {
      const item = this.beverages[itemIndex];
      if (useLedsStore.noItemLEDs[itemIndex] == true) {
        alert("품절되어 구매할 수 없습니다.");
      } else {
        item.EA -= 1;
        this.beveragesOutlet.push(item.name);
        alert(`${item.name}을 구매하였습니다.\n음료반환구를 확인해주세요!`);
        // itemToOutlet();

        if (useMoneyStore.hasPaper) {
          useMoneyStore.savePaper();
        }
        if (item.EA == 0) {
          useLedsStore.noItemLEDColorOn();
        }
        this.isServiced = true;
        useVdmControllerStore.currentMoney -= item.price;
        useVdmControllerStore.render();
        useLedsStore.buyItemLEDColorOn();
      }
    },
  },
  computed: {
    beverages() {
      return useBeveragesStore().getBeverages;
    },
  },
});
