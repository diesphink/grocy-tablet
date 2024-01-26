<script setup>
import { ref } from 'vue'
import { CircleCheckIcon, WorldIcon } from 'vue-tabler-icons'
import { useGrocyStore } from '../stores/grocy'
import { useI18n } from 'vue-i18n';

var i18n = useI18n()

const grocy = useGrocyStore()

const server = ref(grocy.server)
const api_key = ref(grocy.api_key)

const processing = ref(false)

function save() {
  processing.value = true
  grocy.save_config(server.value, api_key.value)
  localStorage.setItem('locale', i18n.locale.value)
  
  setTimeout(() => {
    processing.value = false
  }, 100)
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
            :alt="$t('grocy')"
            class="navbar-brand-image"
          />
        </a>
      </div>
      <form class="card card-md" action="./" method="get" autocomplete="off">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">{{ $t('configure-access') }}</h2>
          <p class="text-secondary mb-4">
            {{ $t('access-configuration-line1') }}
          </p>
          <p class="text-secondary mb-4">
            {{ $t('access-configuration-line2') }}
          </p>
          <div class="mb-3">
            <label class="form-label"
              >{{ $t('server-address')
              }}<small class="text-secondary ms-2">(e.g. https://en.demo.grocy.info)</small></label
            >
            <div class="input-group">
              <span class="input-group-text"> <WorldIcon /></span>
              <input
                type="text"
                class="form-control"
                :placeholder="$t('grocy-server-address')"
                v-model="server"
              />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">{{ $t('api-key') }}</label>
            <input
              type="email"
              class="form-control"
              :placeholder="$t('user-api-key')"
              v-model="api_key"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">{{ $t('language') }}</label>
            <div class="btn-group w-100" role="group">
              <input
                type="radio"
                class="btn-check"
                name="btn-radio-toolbar"
                id="btn-radio-toolbar-1"
                autocomplete="off"
                :checked="$i18n.locale == 'en'"
                @click="$i18n.locale = 'en'"
              />
              <label for="btn-radio-toolbar-1" class="btn btn-icon">
                <span class="flag flag-xs flag-country-us"></span>
              </label>
              <input
                type="radio"
                class="btn-check"
                name="btn-radio-toolbar"
                id="btn-radio-toolbar-2"
                autocomplete="off"
                :checked="$i18n.locale == 'ptbr'"
                @click="$i18n.locale = 'ptbr'"
              />
              <label for="btn-radio-toolbar-2" class="btn btn-icon">
                <span class="flag flag-xs flag-country-br"></span>
              </label>
            </div>
          </div>

          <div class="form-footer" >
            <a href="#" class="btn btn-primary w-100" :class="{'disabled': processing}" @click.prevent="save()">
              <CircleCheckIcon class="icon" />

              {{ $t('save') }}
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
