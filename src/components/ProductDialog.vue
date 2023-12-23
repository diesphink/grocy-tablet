<script setup>
import { computed, ref } from 'vue'
import { useActionsStore } from '../stores/actions.js'
import { useGrocyStore } from '../stores/grocy'
import { MinusIcon, PlusIcon } from 'vue-tabler-icons'
import ProductImage from './ProductImage.vue'

const qtd = ref(1)

var actions = useActionsStore()
var grocy = useGrocyStore()
var show = computed(() => {
  return actions.selected_product
})
function hide() {
  actions.deselect_product()
  qtd.value = 1
}

function increment() {
  if (qtd.value < actions.selected_product.quantity) qtd.value++
}
function decrement() {
  if (qtd.value > 1) qtd.value--
}
</script>

<template>
  <div
    v-if="show"
    class="modal modal-blur show dialog-produto"
    id="modal-success"
    style="display: block"
    aria-modal="true"
    role="dialog"
    @click="hide()"
  >
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
      <div class="modal-content" @click.stop="">
        <div class="modal-status bg-success"></div>
        <div class="modal-body text-center py-4 px-0">
          <h3>{{ actions.selected_product.name }}</h3>
          <div class="text-secondary"></div>
          <product-image :product="actions.selected_product" height="150px" width="100%" />
        </div>
        <div class="py-0 px-0">
          <div class="table-responsive">
            <table class="table table-vcenter card-table">
              <thead>
                <tr>
                  <th class="w-auto">Local</th>
                  <th class="w-auto">Qtd</th>
                  <th class="w-auto">Validade</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="stock in actions.selected_product.stock" :key="stock.id">
                  <td class="text-secondary">{{ grocy.locationById[stock.location_id].name }}</td>
                  <td>{{ stock.amount }} {{ stock.open == 1 ? ' aberto' : '' }}</td>
                  <td class="text-secondary">{{ stock.best_before_date }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- <label v-for="stock in actions.selected_product.stock" :key="stock.id">{{ grocy.locationById[stock.location_id] }}</label><br>
            <label v-for="stock in actions.selected_product.stock" :key="stock.id">{{ stock }}</label><br> -->
        </div>
        <!-- <div class="modal-body text-center py-4" >{{actions.selected_product.stock}}</div> -->
        <div class="modal-body py-4 text-center">
          <div class="w-100">
            <div class="row">
              <div class="col-4">
                <a href="#" class="btn btn-primary btn-pill" @click="decrement()"
                  ><MinusIcon height="48" />
                </a>
              </div>
              <div class="col-4">
                <span class="quantidade">{{ qtd }}</span>
              </div>
              <div class="col-4">
                <a href="#" class="btn btn-primary btn-pill" @click="increment()"
                  ><PlusIcon height="48" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="w-100">
            <div class="row">
              <div class="col">
                <a href="#" class="btn w-100" @click.prevent="hide()">Cancelar</a>
              </div>
              <div class="col">
                <a href="#" class="btn btn-primary w-100" data-bs-dismiss="modal">Consumir</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="modal-backdrop show" v-if="show"></div> -->
</template>
