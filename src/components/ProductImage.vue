<script setup>
import { computed } from 'vue'
import { useGrocyStore } from '../stores/grocy'
import { ref } from 'vue';

const props = defineProps(['product', 'width', 'height'])
const grocy = useGrocyStore()

const server = ref(grocy.server)
const api_key = ref(grocy.api_key)


const prod_image = computed(() => {
  if (!server.value) return ''

  var base_url = server.value

  if (!base_url.endsWith('/')) base_url += '/'
  base_url += 'api/files/productpictures'

  if (props.product.picture_file_name == null) {
    return '/no-image.jpg'
  } else {
    return `${base_url}/${btoa(props.product.picture_file_name)}?GROCY-API-KEY=${
      api_key.value
    }`
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
