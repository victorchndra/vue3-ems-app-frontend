<!-- Javascript 
  components: { ListEmployeeComponent },-->
<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import ListEmployeeComponent from './components/ListEmployeeComponent.vue';

</script>

<!-- View -->
<template>
  <div class="flex flex-col min-h-[400px] pt-32 justify-center items-center">
    <div class="flex flex-col">
      <header-component />
      <router-view class="mt-4"/>
    </div>
  </div>
</template>

<!-- Styling -->
<style scoped>

</style>
