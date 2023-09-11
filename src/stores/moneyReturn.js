// src/store/beverages.js
import { defineStore } from "pinia";
import useBeveragesStore from "./beverages";
import useMoneysStore from "@/stores/money";
import useControllerStore from "@/stores/vdmController";
import useLedsStore from "@/stores/led";

// Define your store
export const useMoneyReturnStore = defineStore("moneyReturn", {
  state: () => ({}),
  getters: {},
  actions: {
    moneyreturnBtn(currentMoney) {
      console.log(`currentMoney : ${currentMoney}`);
      console.log(
        `beverage.beverage.isServiced : ${useBeveragesStore.isServiced}`
      );

      if (!useBeveragesStore.isServiced) {
        // 서비스 사용 안함
        this.inputMoneyReturn(useMoneysStore.inputMoneyList);
      } else {
        // 지폐 있으면 반환
        if (useMoneysStore.hasPaper) {
          let returnPaper = 1000;
          currentMoney -= returnPaper;
          // vdmController.vdmController.returnMoneys.push(returnPaper);
          useControllerStore.currentMoney = currentMoney;
          useControllerStore.render();
        }
        // 동전 반환
        // 순차 반환
        let yesMoney = [];
        // 있는 동전 확인
        useLedsStore.noMoneyLEDsOnOff();
        useLedsStore.noMoneyLEDs.forEach((element, index) => {
          if (element == false) {
            yesMoney.push(useMoneysStore.moneyVALUE[index]);
          }
        });
        yesMoney.reverse().forEach((element) => {
          while (currentMoney >= element) {
            let tempIndex;
            switch (element) {
              case 10:
                tempIndex = 0;
                break;
              case 50:
                tempIndex = 1;
                break;
              case 100:
                tempIndex = 2;
                break;
              case 500:
                tempIndex = 3;
                break;
            }
            if (useMoneysStore.eachAmountOfMoneys[tempIndex] == 0) {
              useLedsStore.noLEDColorOn();
              break;
            }
            currentMoney -= element;
            useMoneysStore.moneyVALUE.forEach((eachMoney, index) => {
              if (eachMoney == element) {
                useMoneysStore.eachAmountOfMoneys[index] -= 1;
              }
            });
            useControllerStore.currentMoney = currentMoney;
            useControllerStore.render();
            useControllerStore.returnMoneys.push(element); //반환구 전해줘야함
            console.log(`element : ${element}`);
          }
        });
      }
      useMoneysStore.hasPaper = false;
      useMoneysStore.inputMoneyList = [];
      useBeveragesStore.isServiced = false;
      useLedsStore.buyItemLEDColorOn();
      useLedsStore.noLEDColorOn();
      useLedsStore.fullLEDColorOn();
    },
    inputMoneyReturn: function inputMoneyReturn(inputMoney) {
      if (typeof inputMoney == "number") {
        useControllerStore.returnMoneys.push(inputMoney);
      } else if (typeof inputMoney == "object") {
        inputMoney.forEach((element) => {
          useControllerStore.returnMoneys.push(element);

          useControllerStore.currentMoney -= element;
          useMoneysStore.moneyVALUE.forEach((eachMoney, index) => {
            if (eachMoney == element) {
              useMoneysStore.eachAmountOfMoneys[index] -= 1;
            }
          });
          useControllerStore.render();
        });
      }
      useLedsStore.buyItemLEDColorOn();
      useLedsStore.noLEDColorOn();
      useLedsStore.fullLEDColorOn();

      // 금액반환구에 표시
    },
  },
  computed: {},
});
