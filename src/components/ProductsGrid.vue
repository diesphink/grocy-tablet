<script setup>
import { SearchIcon } from 'vue-tabler-icons'
import ProductCard from './ProductCard.vue'
import { useGrocyStore } from '../stores/grocy.js'
import { useFiltersStore } from '../stores/filters.js'
import { computed, ref } from 'vue'
import moment from 'moment'
import fuse from 'fuse.js'

const store = useGrocyStore()
const filters = useFiltersStore()
const search_string = ref('')

const filtered_products = computed(() => {
  var fuzzy_result = null
  var products = store.products
  if (search_string.value && search_string.value.length > 2) {
    const options = {
      keys: ['name'],
      ignoreLocation: true
    }
    const fuse_search = new fuse(store.products, options)
    fuzzy_result = fuse_search.search(search_string.value)
    products = fuzzy_result.map((result) => result.item)
  }

  return products.filter((product) => {
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
    if (search_string.value && search_string.value.length > 2) {
      visible &= fuzzy_result.filter((result) => result.item.id == product.id).length > 0
    }

    return visible
  })
})
</script>

<template>
  <div class="input-icon mb-3">
    <input
      type="text"
      value=""
      class="form-control"
      placeholder="Buscar..."
      v-model="search_string"
    />
    <span class="input-icon-addon">
      <SearchIcon class="icon" style="margin-right: 15px" />
    </span>
  </div>
  <div class="col-sm-3 col-lg-2" v-for="product in filtered_products" :key="product.id">
    <product-card :product="product" />
  </div>
</template>
