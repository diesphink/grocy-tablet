<script setup>
import { inject, computed } from 'vue'
const moment = inject('moment')
const props = defineProps(['product'])
const prod = computed(() => {
  return props.product
})
const daysToExpire = props.product.expire
  ? moment.duration(props.product.expire - moment()).asDays()
  : Infinity
const expired = computed(() => daysToExpire < 0)
const exp_now = !expired.value && computed(() => daysToExpire < 7)
const expiring = !expired.value && !exp_now.value && computed(() => daysToExpire < 30)
var prod_image = ''
if (props.product.picture_file_name == null) {
  prod_image = `http://192.168.15.2:9283/api/files/productpictures/${btoa(
    'zckt669zxvh37ydjp9qffvgkml9oy5h0b71.jpg'
  )}?GROCY-API-KEY=VHJVX7l8W0d4jv9PsQl3BqryjvF6f4KccbiLLYVlGbYrFpQ5wk`
} else {
  prod_image = `http://192.168.15.2:9283/api/files/productpictures/${btoa(
    props.product.picture_file_name
  )}?GROCY-API-KEY=VHJVX7l8W0d4jv9PsQl3BqryjvF6f4KccbiLLYVlGbYrFpQ5wk`
}
</script>
<template>
  <div class="card card-sm produto">
    <a href="#" class="d-block"
      ><img
        :src="prod_image"
        style="width: 300px; height: 80px; object-fit: cover"
        class="card-img-top"
    /></a>
    <div class="card-status-top bg-red" v-if="expired"></div>
    <div class="card-status-top bg-orange-lt" v-if="expiring"></div>
    <div class="card-status-top bg-orange" v-if="exp_now"></div>
    <div
      class="card-body"
      :class="{ 'bg-orange-lt': exp_now,'bg-red-lt': expired }"
      style="
        
      "
    >
      <div class="d-flex align-items-center tracking-tight">
        <div>
          <div>{{ props.product.name }}</div>
        </div>
      </div>
    </div>
    <div class="ribbon ribbon-end quantidade">{{ prod.quantity }}</div>
    <div class="ribbon validade bg-red" v-if="expired">{{ prod.expire.fromNow() }}!</div>
    <div class="ribbon validade bg-orange-lt" v-if="expiring">
      {{ prod.expire.fromNow() }}
    </div>
    <div class="ribbon validade bg-orange" v-if="exp_now">
      {{ prod.expire.fromNow() }}
    </div>

    <!-- <div
      class="card-footer"
      :class="{ 'bg-red-lt': expired, 'bg-orange-lt': expiring }"
      v-if="expiring || expired"
    >
      Expires {{ props.product.expire.fromNow() }}
    </div> -->
  </div>
</template>
