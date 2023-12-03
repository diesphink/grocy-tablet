<script setup>
import ProductCard from './ProductCard.vue'
import { useGrocyStore } from "../stores/grocy.js";
const store = useGrocyStore();

</script>

<template>
  <div class="col-sm-3 col-lg-2" v-for="product in store.products" :key="product.id">
    <product-card :product="product"/>
  </div>
</template>

