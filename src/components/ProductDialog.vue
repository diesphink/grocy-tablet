<script setup>
import { computed, ref } from 'vue'
import { useActionsStore } from '../stores/actions.js'
import { useGrocyStore } from '../stores/grocy'
import { MinusIcon, PlusIcon } from 'vue-tabler-icons'
import ProductImage from './ProductImage.vue'

const qtd = ref(1)
const tab = ref(0)
const CONSUMIR = 0,
  ABRIR = 1,
  ADICIONAR = 2,
  INVENTARIO = 3

var actions = useActionsStore()
var grocy = useGrocyStore()

function hide() {
  actions.deselect_product()
  qtd.value = 1
}
function may_increment() {
  if (tab.value == CONSUMIR || tab.value == ABRIR)
    return qtd.value < actions.selected_product.quantity
  else return true
}

function may_decrement() {
  if (tab.value == INVENTARIO) return qtd.value > 0
  else return qtd.value > 1
}

function increment() {
  if (may_increment()) qtd.value++
}
function decrement() {
  if (may_decrement()) qtd.value--
}

var show = computed(() => {
  return actions.selected_product
})

var tabs = computed(() => {
  return [
    {
      label: 'Consumir',
      color: 'blue',
      enabled:
        actions.selected_product.stock.length > 0 &&
        qtd.value > 0 &&
        qtd.value <= actions.selected_product.quantity
    },
    {
      label: 'Abrir',
      color: 'cyan',
      enabled:
        actions.selected_product.stock.length > 0 &&
        qtd.value > 0 &&
        qtd.value <= actions.selected_product.quantity
    },
    {
      label: 'Adicionar',
      color: 'green',
      enabled: true
    },
    {
      label: 'Inventário',
      color: 'orange',
      enabled: true,
      action_label: 'Atualizar inventário'
    }
  ]
})
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
    <div class="modal-dialog modal modal-dialog-centered" role="document">
      <div class="modal-content" @click.stop="">
        <div class="modal-status bg-primary"></div>
        <product-image :product="actions.selected_product" height="150px" width="100%" />
        <div class="modal-body py-0 px-0" style="background-color: #fcfdfe">
          <h3 class="text-center mt-3">{{ actions.selected_product.name }}</h3>

          <div class="card m-2" v-if="actions.selected_product.stock.length > 0">
            <div class="table-responsive">
              <table class="table card-table table-vcenter text-nowrap datatable">
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
          </div>
          <div class="card m-2" v-else>
            <div class="card-body text-center text-secondary">Produto sem estoque</div>
          </div>

          <div class="card m-2">
            <div class="card-header">
              <ul class="nav nav-pills card-header-pills">
                <li class="nav-item w-25 text-center" v-for="(ctab, i) in tabs" :key="ctab.label">
                  <a
                    class="nav-link"
                    @click.prevent="tab = i"
                    :class="[
                      tab == i ? 'bg-' + ctab.color + '-lt' : '',
                      { disabled: !ctab.enabled }
                    ]"
                    href="#"
                  >
                    {{ ctab.label }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="card-body text-center">
              <div class="w-100">
                <div class="row">
                  <div class="col-4">
                    <a
                      href="#"
                      class="btn btn-primary btn-pill"
                      :class="'bg-' + tabs[tab].color + '-lt'"
                      :style="{ opacity: may_decrement() ? '1' : '0.2' }"
                      @click="decrement()"
                      ><MinusIcon height="48" />
                    </a>
                  </div>
                  <div class="col-4">
                    <span class="quantidade">{{ qtd }}</span>
                  </div>
                  <div class="col-4">
                    <a
                      href="#"
                      class="btn btn-primary btn-pill"
                      :class="'bg-' + tabs[tab].color + '-lt'"
                      :style="{ opacity: may_increment() ? '1' : '0.2' }"
                      @click="increment()"
                      ><PlusIcon height="48" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="input-group mt-4" v-if="tab == ADICIONAR">
                <span class="input-group-text"> Validade </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="YYYY-MM-DD"
                  autocomplete="off"
                />
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
                <a
                  href="#"
                  class="btn btn-primary w-100"
                  :class="[{ disabled: !tabs[tab].enabled }, 'bg-' + tabs[tab].color]"
                  data-bs-dismiss="modal"
                  >{{ tabs[tab].action_label || tabs[tab].label }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
