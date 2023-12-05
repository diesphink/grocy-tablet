<template>
  <form action="./" method="get" autocomplete="off" novalidate="true" class="filtros">
    <div class="accordion" id="filter_accordion_menu">
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading-1">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-1"
          >
            <category-icon class="nav-link-icon" />
            Grupos
          </button>
        </h2>
        <div id="collapse-1" class="accordion-collapse" data-bs-parent="#filter_accordion_menu">
          <div class="accordion-body pt-0">
            <label class="form-check" v-for="pg in store.product_groups" :key="pg.id">
              <input
                type="checkbox"
                class="form-check-input"
                :name="'pg' + pg.id"
                :checked="filters.is_filtered(Fields.ProductGroup, pg)"
                @change="filters.toggle(Fields.ProductGroup, pg)"
              />
              <span class="form-check-label">{{ pg.name }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading-2">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-2"
          >
            <map-pin-filled-icon class="nav-link-icon" />
            Locais
          </button>
        </h2>
        <div
          id="collapse-2"
          class="accordion-collapse collapse"
          data-bs-parent="#filter_accordion_menu"
        >
          <div class="accordion-body pt-0">
            <label class="form-check" v-for="lc in store.locations" :key="lc.id">
              <input
                type="checkbox"
                class="form-check-input"
                :name="'lc' + lc.id"
                :checked="filters.is_filtered(Fields.Location, lc)"
                @change="filters.toggle(Fields.Location, lc)"
              />
              <span class="form-check-label">{{ lc.name }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading-4">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-4"
          >
            <list-check-icon class="nav-link-icon" />
            Outros
          </button>
        </h2>
        <div
          id="collapse-4"
          class="accordion-collapse collapse"
          data-bs-parent="#filter_accordion_menu"
        >
          <div class="accordion-body pt-0">
            <div class="subheader mb-2">Validade</div>
            <label class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                name="vencidos"
                :checked="filters.is_filtered(Fields.Expire, ExpireValues.Expired)"
                @change="filters.toggle(Fields.Expire, ExpireValues.Expired)"
              />
              <span class="form-check-label">Vencidos</span>
            </label>
            <label class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                name="vence7"
                :checked="filters.is_filtered(Fields.Expire, ExpireValues.Expire7Days)"
                @change="filters.toggle(Fields.Expire, ExpireValues.Expire7Days)"
              />
              <span class="form-check-label">7 dias</span>
            </label>
            <label class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                name="vence30"
                :checked="filters.is_filtered(Fields.Expire, ExpireValues.Expire30Days)"
                @change="filters.toggle(Fields.Expire, ExpireValues.Expire30Days)"
              />
              <span class="form-check-label">30 dias</span>
            </label>
            <div class="subheader mb-2">Estoque</div>
            <label class="form-check">
              <input type="checkbox" class="form-check-input"                 name="positivo"
                :checked="filters.is_filtered(Fields.Stock, StockValues.Present)"
                @change="filters.toggle(Fields.Stock, StockValues.Present)"
 />
              <span class="form-check-label">Positivo</span>
            </label>
            <label class="form-check">
              <input type="checkbox" class="form-check-input" name="positivo"
                :checked="filters.is_filtered(Fields.Stock, StockValues.LowStock)"
                @change="filters.toggle(Fields.Stock, StockValues.LowStock)" />
              <span class="form-check-label">Abaixo do mínimo</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <button class="btn btn-primary w-100" @click.prevent="filters.clear()">Limpar filtros</button>
    </div>
  </form>
</template>

<script setup>
import { useGrocyStore } from '../stores/grocy.js'
import { useFiltersStore, Fields, ExpireValues, StockValues } from '../stores/filters.js'
import { CategoryIcon, MapPinFilledIcon, ListCheckIcon } from 'vue-tabler-icons'
const store = useGrocyStore()
const filters = useFiltersStore()
</script>
