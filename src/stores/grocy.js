import { defineStore } from 'pinia'
import axios from 'axios'

export const useGrocyStore = defineStore('grocy', {
  state: () => ({
    _product_groups: [],
    _products: []
  }),
  getters: {
    product_groups: (state) => {
      return state._product_groups.map((product_group) => {
        return {name: product_group.name , id: product_group.id, count: state._products.filter((product) => product.product_group_id === product_group.id).length}
      })
    },
    products: (state) => {
      return state._products
    }
  },
  actions: {
    fetch() {
      this.fetchProductGroups()
      this.fetchProcuts()
    },
    fetchProductGroups() {
      axios
        .get('http://192.168.15.2:9283/api/objects/product_groups', {
          headers: { 'GROCY-API-KEY': 'VHJVX7l8W0d4jv9PsQl3BqryjvF6f4KccbiLLYVlGbYrFpQ5wk' }
        })
        .then((response) => {
          this._product_groups = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchProcuts() {
      axios
        .get('http://192.168.15.2:9283/api/objects/products', {
          headers: { 'GROCY-API-KEY': 'VHJVX7l8W0d4jv9PsQl3BqryjvF6f4KccbiLLYVlGbYrFpQ5wk' }
        })
        .then((response) => {
          this._products = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
