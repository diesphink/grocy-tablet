<script setup>
import ProductCard from './ProductCard.vue'
import { useGrocyStore } from "../stores/grocy.js";
import { useFiltersStore } from "../stores/filters.js";
import { computed } from 'vue';
const store = useGrocyStore();
const filters = useFiltersStore();

const filtered_products = computed(() => {
  return store.products.filter((product) => {
    var visible = true;
    filters.filtered_product_groups.forEach((group) => {
      visible &= product.product_group_id == group;
    });
    return visible;
  });
});

</script>

<template>
  <div class="col-sm-3 col-lg-2" v-for="product in filtered_products" :key="product.id">
    <product-card :product="product"/>
  </div>
</template>

