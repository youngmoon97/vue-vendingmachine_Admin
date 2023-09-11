// src/store/beverages.js
import { defineStore } from "pinia";

import useMoneyReturnStore from "./moneyReturn";
import useLedsStore from "./led";
import useVdmControllerStore from "./vdmController";
import useMoneyStore from "./money";

// Define your store
export const useMoneysStore = defineStore("moneys", {
  state: () => ({
    eachAmountOfMoneys: [0, 90, 5, 40, 50],
    moneyVALUE: [10, 50, 100, 500, 1000],
    inputMoney: 0,
    hasPaper: false,
    inputMoneyList: [],
    //금액 투입
    insertMoneyBtn(inputMoney) {
      if (useVdmControllerStore.currentMoney + inputMoney <= 9990) {
        this.moneyVALUE.forEach((value, index) => {
          if (value == inputMoney) {
            let whatCoin = index;
            if (whatCoin == 4 && this.eachAmountOfMoneys[whatCoin] < 100) {
              if (this.hasPaper) {
                alert(
                  `${useMoneyStore.moneyVALUE[index]}원은 한번만 투입가능합니다.\n반환하겠습니다.`
                );
                useMoneyReturnStore.inputMoneyReturn(inputMoney);

                return 0;
              } else {
                this.hasPaper = true;
              }
            }
            // 해당 동전 꽉 찻을때 반환
            if (this.eachAmountOfMoneys[whatCoin] == 100) {
              useMoneyReturnStore.inputMoneyReturn(inputMoney);
              alert(`${inputMoney}원 보관함이 꽉 찼습니다. 반환하겠습니다.`);
            } else {
              // 현재금액에 더하기
              if (this.inputMoneyList.includes(1000) && inputMoney < 1000) {
                this.inputMoneyList.push(inputMoney);
              } else {
                this.inputMoneyList.push(inputMoney);
              }
              useVdmControllerStore.moneyAdd(inputMoney);
              if (whatCoin != 4) {
                this.eachAmountOfMoneys[whatCoin] += 1;
              }
              useLedsStore.buyItemLEDColorOn();
            }
            useLedsStore.noLEDColorOn();
            useLedsStore.fullLEDColorOn();
            // console.log(`this.inputMoneyList : ${this.inputMoneyList}`);
          }
        });
      } else {
        // if (!this.hasPaper) {
        //   moneyReturn.moneyReturn.inputMoneyReturn(inputMoney);
        // }
        alert(
          "최대 투입 금액은 9990원입니다.\n마지막 투입 금액을 반환하겠습니다."
        );
      }
      inputMoney = 0;
    },
    savePaper() {
      this.eachAmountOfMoneys[4] += 1;
      this.hasPaper = false;
      useLedsStore.fullLEDColorOn();
    },
  }),
  getters: {},
  actions: {},
  computed: {},
});
