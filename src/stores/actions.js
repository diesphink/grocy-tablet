import { defineStore } from 'pinia'

export const useActionsStore = defineStore('actions', {
  state: () => ({
    selected_product: null
  }),
  actions: {
    select_product(product) {
      this.selected_product = product
    },
    deselect_product() {
      this.selected_product = null
    }
  }
})
