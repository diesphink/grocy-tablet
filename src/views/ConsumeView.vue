<script setup>
import ProductsGrid from '../components/ProductsGrid.vue'
import ProductFilters from '../components/ProductFilters.vue'
</script>

<template>
  <div class="col-3">
    <div class="row row-cards">
      <ProductFilters />
    </div>
  </div>
  <div class="col-9">
    <div class="row row-cards">
      <ProductsGrid />
    </div>
  </div>
</template>
