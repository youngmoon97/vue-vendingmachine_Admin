<template>
  <v-card class="mx-auto" max-width="4600">
    <h1>음료 추가</h1>
    <v-container>
      <v-text-field
        v-model="item.name"
        color="primary"
        label="음료 명"
        variant="underlined"
      ></v-text-field>
      <p>음료 사진 등록</p>
      <input type="file" @change="handleImageUpload" />

      <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" />
      <div v-if="imagePreviewUrl">
        <h2>Image Preview</h2>
        <img :src="imagePreviewUrl" alt="Image Preview" :width="200" />
      </div>

      <br />

      <v-text-field
        v-model="item.price"
        color="primary"
        label="음료 가격"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="item.EA"
        color="primary"
        label="음료 수량"
        variant="underlined"
      ></v-text-field>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success" @click="onClickAdd">
        음료 추가 >
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useBeveragesStore } from "@/stores/beverages";
import { onMounted, ref } from "vue";
import router from "@/router/index";

const store = useBeveragesStore();
const tempidx = store.beverages.length;
const imageUrl = ref(null);
const selectedImage = ref(null);
const imagePreviewUrl = ref(null);

const item = ref({
  idx: tempidx,
  name: null,
  pic: imagePreviewUrl,
  price: null,
  EA: null,
});

onMounted(() => {
  console.log(`tempidx: ${tempidx}`);
});

const handleImageUpload = (event) => {
  if (event.target.files[0] == null) {
    selectedImage.value = imagePreviewUrl.value;
  } else {
    selectedImage.value = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviewUrl.value = e.target.result;
    };
    reader.readAsDataURL(selectedImage.value);
    console.log(item.value.pic);
  }
  // Display a preview of the selected image
};

const onClickAdd = () => {
  // if(item.value.EA<)
  store.addBeverage(item.value);
  router.push("/Item");
};

// import { ref, defineEmits } from "vue";
// // import ItemView from "@/views/ItemView.vue";

// const emit = defineEmits(["addItem"]);

// const onClickAdd = () => {
//   emit("addItem", item);
// };

// const props = defineProps({
//   idx: Number,
//   name: String,
//   pic: String,
//   price: Number,
//   EA: Number,
// });
// console.log(props.item);
//TODO: null값 검사 , 중복 검사, 숫자인지 검사, 파일업로드
</script>

<style>
/* .v-container {
  padding: 5%;
} */
</style>
