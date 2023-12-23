<script setup>
import { computed } from 'vue'

const props = defineProps(['product', 'width', 'height'])

const prod_image = computed(() => {
  if (props.product.picture_file_name == null) {
    return `http://192.168.15.2:9283/api/files/productpictures/${btoa(
      'zckt669zxvh37ydjp9qffvgkml9oy5h0b71.jpg'
    )}?GROCY-API-KEY=VHJVX7l8W0d4jv9PsQl3BqryjvF6f4KccbiLLYVlGbYrFpQ5wk`
  } else {
    return `http://192.168.15.2:9283/api/files/productpictures/${btoa(
      props.product.picture_file_name
    )}?GROCY-API-KEY=VHJVX7l8W0d4jv9PsQl3BqryjvF6f4KccbiLLYVlGbYrFpQ5wk`
  }
})
</script>
<template>
  <img
    :src="prod_image"
    :style="{ width: props.width, height: props.height, 'object-fit': 'cover' }"
    class="card-img-top"
  />
</template>
