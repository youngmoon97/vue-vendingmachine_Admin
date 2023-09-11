<template>
  <div class="menu-container">
    <router-link class="menu" to="/">Main</router-link> |
    <router-link class="menu" to="/Item">Item</router-link> |
    <router-link class="menu" to="/Money">Money</router-link>
  </div>
</template>

<style scoped>
.menu-container {
  display: flex;
  justify-content: center; /* Horizontally center content */
  align-items: center; /* Vertically center content */
  height: 100px; /* Adjust the height as needed */
}

.menu {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  margin: 0 10px; /* Adjust spacing between menu items as needed */
}
</style>
