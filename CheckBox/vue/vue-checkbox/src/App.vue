<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import CheckBox from "./components/CheckBox.vue";
</script>

<template>
  <CheckBox>
    <template #header>Hello</template> 
    <template #footer>World</template> 
    
  </CheckBox>
</template>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
