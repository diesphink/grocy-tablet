<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { HomeIcon, HistoryIcon } from 'vue-tabler-icons'

const route=useRoute();

const path = computed(() =>route.path)
</script>

<template>
  <header class="navbar navbar-expand-md d-print-none">
    <div class="container-xl">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-menu"
        aria-controls="navbar-menu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
        <a href=".">
          <img
            src="../assets/grocy_logo.svg"
            width="110"
            height="32"
            alt="Grocy"
            class="navbar-brand-image"
          />
        </a>
      </h1>

      <div class="collapse navbar-collapse" id="navbar-menu">
        <div
          class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center"
        >
          <ul class="navbar-nav">
            <li class="nav-item" :class="{active: path == '/'}">
              <router-link to="/" class="nav-link"
                ><span class="nav-link-icon d-md-none d-lg-inline-block"><HomeIcon /> </span>
                <span class="nav-link-title"> Início </span>
              </router-link>
            </li>
            <li class="nav-item" :class="{active: path == '/history'}">
              <router-link to="/history" class="nav-link"
                ><span class="nav-link-icon d-md-none d-lg-inline-block"><HistoryIcon /> </span>
                <span class="nav-link-title"> Histórico </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
