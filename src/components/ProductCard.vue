<script setup>
const props = defineProps(['product'])
var prod_image = ''
console.log(props.product.picture_file_name)
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
  <div class="card card-sm">
    <a href="#" class="d-block"><img :src="prod_image" class="card-img-top" /></a>
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div>
          <div>{{ props.product.name }}</div>
          <div class="text-secondary">3 units, expire in 7 days</div>
        </div>
      </div>
    </div>
  </div>
</template>
