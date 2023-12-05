<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import TopMenu from './components/TopMenu.vue'

import { useGrocyStore } from './stores/grocy.js'

const store = useGrocyStore()


onMounted(() => {
  store.fetch()
})


</script>

<template>
  <main>
    <top-menu/>
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
</template>

