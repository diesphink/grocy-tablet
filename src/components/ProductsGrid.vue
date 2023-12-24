<script setup>
import { BackspaceFilledIcon, CrossIcon, SearchIcon } from 'vue-tabler-icons'
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
  if (search_string.value) {
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
    if (search_string.value) {
      visible &= fuzzy_result.filter((result) => result.item.id == product.id).length > 0
    }

    return visible
  })
})

const grouped_products = computed(() => {
  var products = filtered_products.value
  var grouped = []
  for (var i = 0; i < products.length; i += 6) {
    grouped.push({ id: i, items: products.slice(i, i + 6) })
  }
  console.log(grouped)
  return grouped
})
</script>

<template>
  <div class="input-group">
    <span class="input-group-text">
      <a href="#" class="link-secondary ms-2" @click.prevent="search_string = ''">
        <SearchIcon />
      </a>
    </span>
    <input
      type="text"
      class="form-control"
      autocomplete="off"
      placeholder="Pesquisar..."
      v-model="search_string"
    />
    <span class="input-group-text" v-if="search_string">
      <a href="#" class="link-secondary ms-2" @click.prevent="search_string = ''">
        <BackspaceFilledIcon /> Limpar filtro
      </a>
    </span>
  </div>

  <DynamicScroller :items="grouped_products" :min-item-size="54" class="scroller">
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[item.message]"
        :data-index="index"
      >
        <div class="row row-cards">
          <div class="col-sm-4 col-lg-2" v-for="product in item.items" :key="product.id">
            <ProductCard :product="product" :key="product.id" />
          </div>
        </div>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
