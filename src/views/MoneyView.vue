<template>
  <h1>동전 / 지폐 보관함 재고 리스트</h1>
  <v-table fixed-header="true" hover="true">
    <thead>
      <tr>
        <th class="text-left">moneyValue</th>
        <th class="text-left">amountOfMoney</th>
        <th class="text-left">total</th>
        <th class="text-left">금액 추가 / 회수</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="money in moneys" :key="money.idx">
        <td>{{ money.moneyValue }}원</td>
        <td>{{ money.amountOfMoney }}개</td>
        <td>{{ money.moneyValue * money.amountOfMoney }}원</td>
        <td>
          <v-btn variant="outlined" @click="getMoney(money.idx)">
            금액 회수
          </v-btn>
          <v-btn variant="outlined" @click="putMoney(money.idx)">
            금액 넣기
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <hr />
  <v-row>
    <v-col>
      <v-btn variant="outlined" @click="getAllMoney()"> 전액 회수 </v-btn>
    </v-col>
    <v-col>
      <p>회수 금액 : {{ this.totalMoney }} 원</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      moneys: [
        {
          idx: 0,
          moneyValue: 10,
          amountOfMoney: 99,
        },
        {
          idx: 1,
          moneyValue: 50,
          amountOfMoney: 20,
        },
        {
          idx: 2,
          moneyValue: 100,
          amountOfMoney: 30,
        },
        {
          idx: 3,
          moneyValue: 500,
          amountOfMoney: 40,
        },
        {
          idx: 4,
          moneyValue: 1000,
          amountOfMoney: 3,
        },
      ],
      totalMoney: 0,
    };
  },
  updated() {},
  methods: {
    getMoney(idx) {
      if (this.moneys[idx].amountOfMoney == 0) {
        alert("회수할 돈이 없습니다.");
      } else {
        const getM =
          this.moneys[idx].amountOfMoney * this.moneys[idx].moneyValue;
        //?왜 안바뀌지 아마 updated?
        alert(`${getM}원을 회수합니다.`);
        this.moneys[idx].amountOfMoney = 0;
        this.totalMoney += getM;
      }
    },
    putMoney(idx) {
      if (this.moneys[idx].amountOfMoney + 1 == 101) {
        alert("보관함이 꽉 찼습니다.");
      } else {
        this.moneys[idx].amountOfMoney += 1;
      }
    },
    getAllMoney() {
      alert("전액 회수합니다.");
      this.moneys.forEach((Element) => {
        this.totalMoney += Element.amountOfMoney * Element.moneyValue;
        Element.amountOfMoney = 0;
      });
    },
  },
};
</script>
<style>
.v-btn {
  margin-right: 10px;
}
</style>
