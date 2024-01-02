<script setup>
import { ref } from 'vue'
import { CircleCheckIcon, WorldIcon } from 'vue-tabler-icons'
import { useGrocyStore } from '../stores/grocy'

const grocy = useGrocyStore()

const server = ref(grocy.server)
const api_key = ref(grocy.api_key)

function save() {
  grocy.save_config(server.value, api_key.value)
}
</script>

<template>
  <div class="page page-center">
    <div class="container container-tight py-4">
      <div class="text-center mb-4">
        <a href="." class="navbar-brand navbar-brand-autodark">
          <img
            src="../assets/grocy_logo.svg"
            width="110"
            height="32"
            alt="Grocy"
            class="navbar-brand-image"
          />
        </a>
      </div>
      <form class="card card-md" action="./" method="get" autocomplete="off">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">Configure access</h2>
          <p class="text-secondary mb-4">
            Enter the grocy server address and the API key to access the data.
          </p>
          <p class="text-secondary mb-4">
            No data will be sent to us, all data is stored locally on your device.
          </p>
          <div class="mb-3">
            <label class="form-label"
              >Server address<small class="text-secondary ms-2"
                >(e.g. https://en.demo.grocy.info)</small
              ></label
            >
            <div class="input-group">
              <span class="input-group-text"> <WorldIcon /></span>
              <input
                type="text"
                class="form-control"
                placeholder="Grocy server address"
                v-model="server"
              />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">API Key</label>
            <input type="email" class="form-control" placeholder="User API key" v-model="api_key" />
          </div>
          <div class="form-footer">
            <a href="#" class="btn btn-primary w-100" @click.prevent="save()">
              <CircleCheckIcon class="icon" />

              Save
            </a>
          </div>
        </div>
      </form>
      <!-- <div class="text-center text-secondary mt-3">
        Forget it, <a href="./sign-in.html">send me back</a> to the sign in screen.
      </div> -->
    </div>
  </div>
</template>
