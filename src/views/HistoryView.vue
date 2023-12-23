<script setup>
import { onMounted } from 'vue'

import { useGrocyStore } from '../stores/grocy.js'
import { ArrowBackUpIcon } from 'vue-tabler-icons'

const store = useGrocyStore()

onMounted(() => {
  store.fetchHistory()
})
</script>

<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Histórico</h3>
        <div class="ms-auto text-secondary">
          Exibir
          <div class="mx-2 d-inline-block">
            <input
              type="text"
              class="form-control form-control-sm"
              value="8"
              size="3"
              aria-label="Invoices count"
            />
          </div>
          itens
        </div>
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
            <tr v-for="log in store.history" :key="log.id">
              <td>{{ log.product.name }}</td>
              <td>
                {{ log.amount }}
              </td>
              <td>{{ log.row_created_timestamp.fromNow() }}</td>
              <td>{{ log.transaction_type }}</td>
              <td>{{ log.location.name }}</td>
              <td>{{ log.note }}</td>
              <td class="text-end">
                <a href="#" class="btn btn-danger"> <ArrowBackUpIcon class="icon"/> Desfazer </a>
                <!-- <span class="dropdown">
                  <button
                    class="btn dropdown-toggle align-text-top"
                    data-bs-boundary="viewport"
                    data-bs-toggle="dropdown"
                  >
                    Actions
                  </button>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="#"> Action </a>
                    <a class="dropdown-item" href="#"> Another action </a>
                  </div>
                </span> -->
              </td>
            </tr>
            <!-- <tr>
              <td><span class="text-secondary">001401</span></td>
              <td><a href="invoice.html" class="text-reset" tabindex="-1">Design Works</a></td>
              <td>
                <span class="flag flag-xs flag-country-us me-2"></span>
                Carlson Limited
              </td>
              <td>87956621</td>
              <td>15 Dec 2017</td>
              <td><span class="badge bg-success me-1"></span> Paid</td>
              <td>$887</td>
              <td class="text-end">
                <span class="dropdown">
                  <button
                    class="btn dropdown-toggle align-text-top"
                    data-bs-boundary="viewport"
                    data-bs-toggle="dropdown"
                  >
                    Actions
                  </button>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="#"> Action </a>
                    <a class="dropdown-item" href="#"> Another action </a>
                  </div>
                </span>
              </td>
            </tr> -->
          </tbody>
        </table>
      </div>
      <div class="card-footer d-flex align-items-center">
        <p class="m-0 text-secondary">
          Showing <span>1</span> to <span>8</span> of <span>16</span> entries
        </p>
        <ul class="pagination m-0 ms-auto">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
              <!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M15 6l-6 6l6 6"></path>
              </svg>
              prev
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item">
            <a class="page-link" href="#">
              next
              <!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 6l6 6l-6 6"></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
