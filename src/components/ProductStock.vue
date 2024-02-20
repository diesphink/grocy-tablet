<script setup>
import { PackageOffIcon } from 'vue-tabler-icons'

const props = defineProps(['product'])

console.log(props.product)
</script>
<template>
  <span class="stock">
    <span>{{ props.product.quantity }}</span>

    <span v-if="props.product.quantity_opened" class="opened"
      >(<PackageOffIcon class="icon" /> {{ props.product.quantity_opened }})</span
    >
  </span>
</template>
