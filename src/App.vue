<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import TopMenu from './components/TopMenu.vue'
import ProductDialog from './components/ProductDialog.vue'

import { useGrocyStore } from './stores/grocy.js'
import ConfigView from './views/ConfigView.vue'

const store = useGrocyStore()

onMounted(() => {
  store.init()
})
</script>

<template>
  <main v-if="store.api_key">
    <top-menu />
    <div class="page-wrapper">
      <div class="page-body">
        <div class="container-xl">
          <div class="row g-4">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </main>
  <ConfigView v-else />
  <ProductDialog />
</template>
