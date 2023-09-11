<template>
  <div class="container">
    <h1>자판기</h1>

    <div id="beverage-area" class="panel">
      <v-table fixed-header="true" hover="true">
        <tbody>
          <tr v-for="item in items" :key="item.idx" @click="buyItem(item.idx)">
            <td>
              <v-img :width="100" aspect-ratio="16/9" cover :src="item.pic" />
            </td>
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.price }}
            </td>
            <td>
              <v-btn variant="outlined" @click="buyItem(item.idx)">
                구매
              </v-btn>
              <p>품절</p>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <div class="vertical panel">
      <div class="panel">
        <a>현재금액</a>
        <div id="current-money" class="panel">{{ currentMoney }}</div>
        <hr />
        <div id="money-return" class="money-return" type="button">
          금액반환하기
        </div>
        <hr />
        <div class="monetReturn text">금액반환구</div>
        <textarea
          readonly="readonly"
          id="money-outlet"
          class="outlet panel"
          title="금액반환구"
        ></textarea>
        <div id="get-money" class="get-money" type="button">금액회수하기</div>
      </div>
      <div class="panel">
        <div class="input-money">금액 투입구</div>
        <div class="panel money-box">
          <v-btn variant="outlined" v-bind:key="10" @click="inputMoney(10)"
            >10원</v-btn
          >
          <v-btn variant="outlined" v-bind:key="50">50원</v-btn>
          <v-btn variant="outlined" v-bind:key="100">100원</v-btn>
          <v-btn variant="outlined" v-bind:key="500">500원</v-btn>
          <v-btn variant="outlined" v-bind:key="1000">1000원</v-btn>
        </div>
        <hr />
        <div class="noleds" data-index="0">10원 동전 없음</div>
        <div class="noleds" data-index="1">50원 동전 없음</div>
        <div class="noleds" data-index="2">100원 동전 없음</div>
        <div class="noleds" data-index="3">500원 동전 없음</div>

        <div class="fullleds" data-index="0">10원 동전 꽉 참</div>
        <div class="fullleds" data-index="1">50원 동전 꽉 참</div>
        <div class="fullleds" data-index="2">100원 동전 꽉 참</div>
        <div class="fullleds" data-index="3">500원 동전 꽉 참</div>
        <div class="fullleds" data-index="4">1000원 지폐 꽉 참</div>
      </div>
      <div class="panel">
        <div class="beverageOutlet-text">음료반환구</div>
        <textarea
          readonly="readonly"
          id="beverage-outlet"
          class="outlet panel"
        ></textarea>
        <div id="get-beverage" class="get-beverage" type="button">
          음료회수하기
        </div>
      </div>
      <div id="money-base" class="popup hide">
        <div class="panel"></div>
      </div>

      <div id="result-base" class="popup hide">
        <div class="panel button"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBeveragesStore } from "@/stores/beverages";
import { useMoneyStore } from "@/stores/money";
import { useVdmControlleStore } from "@/stores/vdmController";
import { ref } from "vue";

const beverageStore = useBeveragesStore();
const items = ref(beverageStore.beverages);
const currentMoney = ref(useVdmControlleStore.currentMoney);
console.log(items);

const buyItem = (idx) => {
  alert(`idx : ${idx}`);
  beverageStore.buyBeverageBtn(idx);
};
const inputMoney = (inputMoney) => {
  alert(`money : ${inputMoney}`);
  useMoneyStore.insertMoneyBtn(inputMoney);
};
</script>

<!-- <script type="module" src="@/js/LED"></script>
<script type="module" src="@/js/beverage"></script>
<script type="module" src="@/js/money"></script>
<script type="module" src="@/js/moneyReturn"></script>
<script type="module" src="@/js/vdmController"></script> -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  color: #323330;
}
div {
  align-items: center;
  justify-content: center;
  margin: 10px;
}
.hide {
  display: none;
}

.container {
  padding: 40px;
  margin: 50;
  height: 100vh;
}
.panel.rack {
  display: flex;
}
div#current-money {
  display: flex;
  padding: 10px;
}
.panel {
  text-align: center;
  padding: 20px;
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}

.button {
  text-align: center;
  border-width: 1px;
  border-style: inherit;
}
.panel.vertical {
  display: flex;
}

.textarea {
  height: 150px;
}

.panel.outlet {
  padding: 10px;
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
  height: 200px;
  resize: none;
}

.popup {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup > .panel {
  padding: 30px;
}

.hide {
  display: none;
}

.panel .money-box {
  padding: 20px;
  display: flex;
}

.items {
  padding: 10px;
  border-radius: 10px;
  border-style: double;
  text-align: center;
}

.buyitem {
  border-radius: 10px;
  border-style: inherit;
  font-weight: 800;
}
.buyitem:active {
  transform: scale(1.5);
}
.buyitem:hover {
  letter-spacing: 2px;
  transform: scale(1.2);
  cursor: pointer;
  background-color: #f8e6e0;
  color: #2e2c2c;
}

.noitem {
  border-style: inherit;
  animation: blink 2s linear infinite;
}

.money-value:active {
  transform: scale(1.5);
}
.money-value:hover {
  letter-spacing: 2px;
  transform: scale(1.2);
  cursor: pointer;
  background-color: #f8e6e0;
  color: #2e2c2c;
}
.money-value {
  border-radius: 10px;
  padding: 5px;
  background-color: #f8e6e0;
  color: #2e2c2c;
  border: 3px solid #f8e6e0;
  color: #2e2c2c;
}

.money-return:active {
  transform: scale(1.5);
}
.money-return:hover {
  letter-spacing: 2px;
  transform: scale(1.2);
  cursor: pointer;
  background-color: #f8e6e0;
  color: #2e2c2c;
}
.money-return {
  border-radius: 10px;
  background-color: #f8e6e0;
  color: #2e2c2c;
  border: 3px solid #f8e6e0;
  color: #2e2c2c;
}

.get-beverage:active {
  transform: scale(1.5);
}
.get-beverage:hover {
  letter-spacing: 2px;
  transform: scale(1.2);
  cursor: pointer;
  background-color: #f8e6e0;
  color: #2e2c2c;
}
.get-beverage {
  border-radius: 10px;
  background-color: #f8e6e0;
  color: #2e2c2c;
  border: 3px solid #f8e6e0;
  color: #2e2c2c;
}

.money-outlet {
  margin-top: 10%;
  margin-top: 10%;
}

.noleds {
  margin-bottom: 0px;
  margin-top: 0px;
}

.fullleds {
  margin-bottom: 0px;
  margin-top: 0px;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.get-money:active {
  transform: scale(1.5);
}
.get-money:hover {
  letter-spacing: 2px;
  transform: scale(1.2);
  cursor: pointer;
  background-color: #f8e6e0;
  color: #2e2c2c;
}
.get-money {
  border-radius: 10px;
  background-color: #f8e6e0;
  color: #2e2c2c;
  border: 3px solid #f8e6e0;
  color: #2e2c2c;
}
</style>
