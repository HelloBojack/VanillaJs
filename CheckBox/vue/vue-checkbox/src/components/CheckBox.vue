
<template>
  <slot name="header"></slot>

  <div v-bind="info">
  <span>全选</span>
    <input type="checkbox" :checked="checkedAll" @change="changeCheckAll">
  </div>
  <div v-for="item in list" :key="item.id">
  <label :for="item.id">
    <input type="checkbox" v-model="checkedList" :id="item.id" :value="item.ctx">
    {{item.ctx}}
  </label>
    
  </div>
  <div>{{checkedList}}</div>
  <slot name="footer"></slot>
</template>
<script setup>
import { ref,reactive } from "vue";

// defineProps({
//   msg: String,
// });
let checkedList =ref([]);
const checkedAll = ref(false)

const info = {
  name:'k',
  age:25,
}

let list = reactive([
  { id: 1, ctx: 'ctx1', checked: true },
  { id: 2, ctx: 'ctx2', checked: false },
  { id: 3, ctx: 'ctx3', checked: false },
  { id: 4, ctx: 'ctx4', checked: false },
]);
const changeCheckAll=(e)=>{
  console.log(e.target.checked);
  checkedList.value=e.target.checked?list.map(item=>item.ctx):[];
}

</script>

