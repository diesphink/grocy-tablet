<script setup>
import ProductCard from './ProductCard.vue'
import { useGrocyStore } from "../stores/grocy.js";
const store = useGrocyStore();
const sorted_products = store.products.sort((a, b) => {
  return a.name.localeCompare(b.name);
});
</script>

<template>
  <div class="col-sm-3 col-lg-2" v-for="product in sorted_products" :key="product.id">
    <product-card :product="product"/>
  </div>
</template>

