import { createWebHistory, createRouter } from "vue-router";
// import Main from "@/views/MainView.vue";
import Index from "@/views/indexView.vue";
import Item from "@/views/ItemView.vue";
import Money from "@/views/MoneyView.vue";
// import ItemInfo from "@/views/ItemInfo.vue";
import ItemInsert from "@/views/ItemInsert.vue";
import { useBeveragesStore } from "@/stores/beverages";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/item",
    name: "Item",
    component: Item,
  },
  {
    path: "/money",
    name: "Money",
    component: Money,
  },
  // {
  //   path: "/iteminfo",
  //   name: "ItemInfo",
  //   component: ItemInfo,
  // },
  {
    path: "/iteminsert",
    name: "ItemInsert",
    component: ItemInsert,
  },
  // {
  //   path: "/itempopup",
  //   name: "ItemInsert",
  //   component: ItemInsert,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useBeveragesStore();
  console.log(store);
  next();
});
export default router;
