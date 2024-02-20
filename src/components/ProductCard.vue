<script setup>
import { inject, computed } from 'vue'
import { useActionsStore } from '../stores/actions'
import ProductImage from './ProductImage.vue'
import ProductStock from './ProductStock.vue'

const moment = inject('moment')
const props = defineProps(['product'])

var actions = useActionsStore()

const prod = computed(() => {
  return props.product
})
const daysToExpire = computed(() =>
  props.product.expire ? moment.duration(props.product.expire - moment()).asDays() : Infinity
)
const expired = computed(() => daysToExpire.value < 0)
const exp_now = computed(() => daysToExpire.value < 7 && daysToExpire.value >= 0)
const expiring = computed(() => daysToExpire.value < 30 && daysToExpire.value >= 7)
</script>

<template>
  <div class="card card-sm produto" @click.prevent="actions.select_product(prod)">
    <product-image :product="prod" width="300px" height="80px" />
    <div class="card-status-top bg-red" v-if="expired"></div>
    <div class="card-status-top bg-orange-lt" v-if="expiring"></div>
    <div class="card-status-top bg-orange" v-if="exp_now"></div>
    <div class="card-body" :class="{ 'bg-orange-lt': exp_now, 'bg-red-lt': expired }" style="">
      <div class="d-flex align-items-center tracking-tight">
        <div>
          <div>{{ props.product.name }}</div>
        </div>
      </div>
    </div>
    <div class="ribbon ribbon-end quantidade"><product-stock :product="prod" /></div>
    <div class="ribbon validade bg-red" v-if="expired">{{ prod.expire.fromNow() }}!</div>
    <div class="ribbon validade bg-orange-lt" v-if="expiring">
      {{ prod.expire.fromNow() }}
    </div>
    <div class="ribbon validade bg-orange" v-if="exp_now">
      {{ prod.expire.fromNow() }}
    </div>
  </div>
</template>
