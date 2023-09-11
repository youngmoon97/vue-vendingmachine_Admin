<template>
  <div>
    <h1>재고 음료 리스트</h1>
    <v-table fixed-header="true" hover="true">
      <thead>
        <tr>
          <th class="text-left">상품 번호</th>
          <th class="text-left">음료 사진</th>
          <th class="text-left">음료 이름</th>
          <th class="text-left">음료 가격</th>
          <th class="text-left">음료 재고</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.idx"
          @click="onClickItem(item.idx)"
        >
          <td>{{ item.idx + 1 }}</td>
          <td>
            <v-img :width="100" aspect-ratio="16/9" cover :src="item.pic" />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.EA }}</td>
        </tr>
      </tbody>
    </v-table>

    <v-btn @click="onClickAdd">음료 추가</v-btn>
  </div>
  <div class="modalWrap" v-if="isVisible">
    <ItemPopup
      class="modalBody"
      ref="popup"
      :selectedItem="selectedItem"
      :isVisible="isVisible"
      @close="close"
      @changeItem="changeItem"
      @deleteItem="deleteItem"
      @returnItem="returnItem"
      @addItem="addItem"
    ></ItemPopup>
  </div>
</template>

<script setup>
// import { mapActions } from "pinia";
import { useBeveragesStore } from "../stores/beverages";
import { ref } from "vue";
import router from "@/router/index.js";
import ItemPopup from "@/views/ItemPopup.vue";
// import { computed } from "vue";
const isVisible = ref(false);
const store = useBeveragesStore();
const popup = ref(null);
const items = ref(store.beverages);
const selectedItem = ref(null);

const onClickAdd = () => {
  router.push("/iteminsert");
};

const onClickItem = (idx) => {
  isVisible.value = true;
  selectedItem.value = store.getSelectedItem(idx);
};

const close = () => {
  isVisible.value = false;
};

const changeItem = (idx, name, price) => {
  console.log("changeItem");
  console.log(`selectedItem:${idx}`);
  console.log(`name:${name}`);
  console.log(`price:${price}`);
  store.changeItem(idx, name, price);
  isVisible.value = false;
};

const deleteItem = (idx) => {
  console.log("deleteItem");
  store.deleteItem(idx);
  isVisible.value = false;
};

const returnItem = (idx) => {
  console.log("returnItem");
  store.returnItem(idx);
};

const addItem = (idx) => {
  console.log("addItem");
  store.addItem(idx);
};
</script>

<style scoped>
.modalWrap {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modalBody {
  width: 800px;
  height: 600px;
  padding: 30px 30px;
  margin: 0 auto;
  border: 1px solid #777;
  background-color: #fff;
}
</style>
