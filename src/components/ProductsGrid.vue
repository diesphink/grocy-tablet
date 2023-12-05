<script setup>
import ProductCard from './ProductCard.vue'
import { useGrocyStore } from '../stores/grocy.js'
import { useFiltersStore } from '../stores/filters.js'
import { computed } from 'vue'
import moment from 'moment'
const store = useGrocyStore()
const filters = useFiltersStore()

const filtered_products = computed(() => {
  return store.products.filter((product) => {
    var visible = true
    filters.filtered_product_groups.forEach((group) => {
      visible &= product.product_group_id == group
    })
    filters.filtered_locations.forEach((location) => {
      visible &= product.stock.filter((stock) => stock.location_id == location).length > 0
    })
    filters.filtered_expires.forEach((exp) => {
      if (product.expire) {
        visible &= product.quantity > 0 && moment.duration(product.expire - moment()).asDays() < exp
      } else {
        visible = false
      }
    })
    return visible
  })
})
</script>

<template>
  <div class="col-sm-3 col-lg-2" v-for="product in filtered_products" :key="product.id">
    <product-card :product="product" />
  </div>
</template>
