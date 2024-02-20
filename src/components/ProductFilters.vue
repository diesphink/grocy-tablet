<template>
  <div class="filtros">
    <div class="list-group list-group-transparent">
      <!-- ## LOCAIS ## -->
      <h4 class="subheader"><map-pin-filled-icon class="nav-link-icon" /> {{ $t('locations') }}</h4>
      <a
        href="#"
        class="list-group-item list-group-item-action d-flex align-items-center"
        v-for="lc in store.locations"
        :key="lc.id"
        @click.prevent="filters.toggle(Fields.Location, lc)"
        :class="{
          active: filters.is_filtered(Fields.Location, lc),
          'bg-blue-lt': filters.is_filtered(Fields.Location, lc)
        }"
        >{{ lc.name }}<span class="badge text-primary-fg ms-auto">{{ lc.count }}</span></a
      >

      <!-- ## GRUPOS ## -->
      <h4 class="subheader"><category-icon class="nav-link-icon" /> {{ $t('groups') }}</h4>
      <a
        href="#"
        class="list-group-item list-group-item-action d-flex align-items-center"
        v-for="pg in store.product_groups"
        :key="pg.id"
        @click.prevent="filters.toggle(Fields.ProductGroup, pg)"
        :class="{
          active: filters.is_filtered(Fields.ProductGroup, pg),
          'bg-blue-lt': filters.is_filtered(Fields.ProductGroup, pg)
        }"
        >{{ pg.name || $t('no-groups' ) }}<span class="badge text-primary-fg ms-auto">{{ pg.count }}</span></a
      >

      <!-- ## Validade ## -->
      <h4 class="subheader"><calendar-off-icon class="nav-link-icon" />{{ $t('expiration') }}</h4>
      <a
        href="#"
        class="list-group-item list-group-item-action d-flex align-items-center"
        v-for="vl in ExpireValues"
        :key="vl.id"
        @click.prevent="filters.toggle(Fields.Expire, vl.id)"
        :class="{
          active: filters.is_filtered(Fields.Expire, vl.id),
          'bg-blue-lt': filters.is_filtered(Fields.Expire, vl.id)
        }"
        >{{ $t(vl.name, [vl.id]) }}</a
      >
      <!-- <a
        href="#"
        class="list-group-item list-group-item-action d-flex align-items-center"
        v-for="(key, value) in {
          Vencidos: ExpireValues.Expired,
          '7 dias': ExpireValues.Expire7Days,
          '30 dias': ExpireValues.Expire30Days
        }"
        :key="key"
        @click.prevent="filters.toggle(Fields.Expire, key)"
        :class="{
          active: filters.is_filtered(Fields.Expire, key),
          'bg-blue-lt': filters.is_filtered(Fields.Expire, key)
        }"
        >{{ value }}</a
      > -->

      <!-- ## Stock ## -->
      <!-- <h4 class="subheader"><box-seam-icon class="nav-link-icon" /> {{ $t('quantity') }}</h4>
      <a
        href="#"
        class="list-group-item list-group-item-action d-flex align-items-center"
        v-for="(key, value) in {
          'positive': StockValues.Present,
          'below-minimum': StockValues.LowStock
        }"
        :key="key"
        @click.prevent="filters.toggle(Fields.Stock, key)"
        :class="{
          active: filters.is_filtered(Fields.Stock, key),
          'bg-blue-lt': filters.is_filtered(Fields.Stock, key)
        }"
        >{{ $t(value) }}</a
      > -->

      <h4 class="subheader"><box-seam-icon class="nav-link-icon" /> {{ $t('quantity') }}</h4>
      <a
        href="#"
        class="list-group-item list-group-item-action d-flex align-items-center"
        v-for="vs in StockValues" :key="vs.id"
        @click.prevent="filters.toggle(Fields.Stock, vs.id)"
        :class="{
          active: filters.is_filtered(Fields.Stock, vs.id),
          'bg-blue-lt': filters.is_filtered(Fields.Stock, vs.id)
        }"
        >{{ $t(vs.name) }}</a
      >

      <h4 class="subheader"><box-seam-icon class="nav-link-icon" /> {{ $t('hierarchy') }}</h4>
      <a
        href="#"
        class="list-group-item list-group-item-action d-flex align-items-center"
        v-for="hv in HierarchyValues" :key="hv.id"
        @click.prevent="filters.toggle(Fields.Hierarchy, hv.id)"
        :class="{
          active: filters.is_filtered(Fields.Hierarchy, hv.id),
          'bg-blue-lt': filters.is_filtered(Fields.Hierarchy, hv.id)
        }"
        >{{ $t(hv.name) }}</a
      >


    </div>
  </div>
</template>

<script setup>
import { useGrocyStore } from '../stores/grocy.js'
import { useFiltersStore, Fields, ExpireValues, StockValues, HierarchyValues } from '../stores/filters.js'
import { CategoryIcon, MapPinFilledIcon, CalendarOffIcon, BoxSeamIcon } from 'vue-tabler-icons'
const store = useGrocyStore()
const filters = useFiltersStore()
</script>
