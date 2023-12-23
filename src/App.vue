<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import TopMenu from './components/TopMenu.vue'
import ProductDialog from './components/ProductDialog.vue'

import { useGrocyStore } from './stores/grocy.js'

const store = useGrocyStore()

onMounted(() => {
  store.fetch()
})
</script>

<template>
  <main>
    <top-menu />
      <!-- <div
      class="modal modal-blur show"
      id="modal-simple"
      tabindex="-1"
      style="display: block"
      aria-hidden="true"
      @click="console.log('a')"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" >
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi beatae delectus
            deleniti dolorem eveniet facere fuga iste nemo nesciunt nihil odio perspiciatis, quia
            quis reprehenderit sit tempora totam unde.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div> -->
    
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
  <ProductDialog />  
</template>
