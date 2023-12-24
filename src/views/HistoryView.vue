<script setup>
import { computed, onMounted, ref } from 'vue'

import { useGrocyStore } from '../stores/grocy.js'
import { ArrowBackUpIcon, ChevronLeftIcon, ChevronRightIcon } from 'vue-tabler-icons'

const store = useGrocyStore()

const page = ref(1)

const arrayRange = (start, stop) =>
  Array.from({ length: stop - start + 1 }, (value, index) => start + index)

onMounted(() => {
  go_to(1)
})
function go_to(page_number) {
  page.value = page_number
  store.fetchHistory(page.value)
}
const last_page = computed(() => {
  return store.history.length < 50
})

async function undo(id) {
  await store.undo_stock_log(id)
  go_to(page.value)
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Histórico</h3>
      </div>

      <div class="table-responsive">
        <table class="table card-table table-vcenter text-nowrap datatable">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Data/Hora</th>
              <th>Tipo</th>
              <th>Local</th>
              <th>Notas</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in store.history" :key="log.id" :class="{ undone: log.undone }">
              <td>{{ log.product.name }}</td>
              <td>
                {{ log.amount }}
              </td>
              <td>
                {{ capitalize(log.row_created_timestamp.fromNow()) }}
                <div v-if="log.undone"><span class="text-danger">(desfeito {{ log.undone_timestamp.fromNow()  }})</span> </div>
              </td>
              <td>{{ log.transaction_type }}</td>
              <td>{{ log.location.name }}</td>
              <td>{{ log.note }}</td>
              <td class="text-end">
                <a
                  href="#"
                  class="btn btn-danger"
                  @click.prevent="undo(log.transaction_id)"
                  v-if="!log.undone"
                >
                  <ArrowBackUpIcon class="icon" /> Desfazer
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer d-flex align-items-center">
        <p class="m-0 text-secondary">
          Exibindo de <span>{{ (page - 1) * 50 + 1 }}</span> a
          <span>{{ (page - 1) * 50 + store.history.length }}</span>
        </p>
        <ul class="pagination m-0 ms-auto">
          <li class="page-item" :class="{ disabled: page == 1 }">
            <a
              class="page-link"
              href="#"
              tabindex="-1"
              aria-disabled="true"
              @click.prevent="go_to(page - 1)"
            >
              <ChevronLeftIcon class="icon" />
            </a>
          </li>
          <li
            class="page-item"
            :class="{ active: i == page }"
            v-for="i in arrayRange(
              Math.max(1, last_page ? page - 4 : page - 2),
              Math.max(5, last_page ? page : page + 2)
            )"
            :key="i"
          >
            <a class="page-link" href="#" @click.prevent="go_to(i)">{{ i }}</a>
          </li>
          <li class="page-item" :class="{ disabled: last_page }">
            <a class="page-link" href="#" @click.prevent="go_to(page - 1)">
              <ChevronRightIcon class="icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
