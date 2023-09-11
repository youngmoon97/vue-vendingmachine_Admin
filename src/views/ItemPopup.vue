<template>
  <v-container class="container">
    <p>음료 명 : {{ changeInfo.name }}</p>
    <input v-model="changeInfo.name" placeholder="음료 명 수정" />
    <p>음료 가격 : {{ changeInfo.price }}</p>
    <input v-model="changeInfo.price" placeholder="음료 가격 수정" />

    <div class="itemEA">
      <p class="itemEA">음료 수량 : {{ props.selectedItem.EA }}</p>

      <p class="itemEA" @click="emit('addItem', props.selectedItem.idx)">
        | 재고 넣기
      </p>

      <p class="itemEA" @click="emit('returnItem', props.selectedItem.idx)">
        | 재고 빼기
      </p>
    </div>
    <v-divider></v-divider>
    <v-btn
      color="success"
      @click="
        emit(
          'changeItem',
          props.selectedItem.idx,
          changeInfo.name,
          changeInfo.price
        )
      "
    >
      수정 >
      <v-icon icon="mdi-chevron-right" end></v-icon>
    </v-btn>
    <v-btn color="fail" @click="emit('deleteItem', props.selectedItem.idx)">
      삭제 >
      <v-icon icon="mdi-chevron-right" end></v-icon>
    </v-btn>
    <v-btn color="success" @click="emit('close')">
      닫기 >
      <v-icon icon="mdi-chevron-right" end></v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

const changeInfo = ref({
  idx: props.selectedItem.idx,
  name: props.selectedItem.name,
  price: props.selectedItem.price,
});
console.log(changeInfo);
const props = defineProps(["selectedItem"]);
console.log(`props : ${props.selectedItem.idx}`);
// const itemIndex = defineProps(["itemIndex"]);
const emit = defineEmits([
  "close",
  "chageItem",
  "deleteItem",
  "returnItem",
  "addItem",
]);
</script>

<style>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}

.itemEA {
  display: flex;
  padding-right: 20px;
  text-align: center;
}
.container {
  border-radius: 10px;
  border-style: initial;
  text-align: center;
}
</style>
