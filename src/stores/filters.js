import { defineStore } from 'pinia'

export const Fields = {
  ProductGroup: 'product_group',
  Location: 'location',
  Tag: 'tag',
  Expire: 'expire',
  Stock: 'stock',
  Hierarchy: 'hierarchy'
}

export const ExpireValues = [
  { id: 0, name: 'expired' },
  { id: 7, name: 'n-days' },
  { id: 30, name: 'n-days' }
]

export const StockValues = [
  { id: 0, name: 'positive' },
  { id: 1, name: 'below-minimum' }
]

export const HierarchyValues = [
  { id: 0, name: 'parents' },
  { id: 1, name: 'children' }
]

function _set(arr, item, value) {
  var index = arr.indexOf(value)
  if (value) {
    if (index < 0) {
      arr.push(value)
    }
  } else {
    if (index >= 0) {
      arr.splice(index, 1)
    }
  }
  return arr
}

function _toggle(arr, value) {
  var index = arr.indexOf(value)
  arr.splice(0, arr.length)
  if (index < 0) {
    arr.push(value)
  }
  return arr
}

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    product_groups: [],
    locations: [],
    expires: [],
    stocks: [0],
    hierarchies: [0]
  }),
  getters: {
    filtered_product_groups: (state) => {
      return state.product_groups
    },
    filtered_locations: (state) => {
      return state.locations
    },
    filtered_expires: (state) => {
      return state.expires
    },
    filtered_stocks: (state) => {
      return state.stocks
    },
    filtered_hierarchies: (state) => {
      return state.hierarchies
    }
  },
  actions: {
    toggle(field, item) {
      switch (field) {
        case Fields.ProductGroup:
          _toggle(this.product_groups, item.id)
          break
        case Fields.Location:
          _toggle(this.locations, item.id)
          break
        case Fields.Expire:
          _toggle(this.expires, item)
          break
        case Fields.Stock:
          _toggle(this.stocks, item)
          break
        case Fields.Hierarchy:
          _toggle(this.hierarchies, item)
          break
      }
    },
    set(field, item, value) {
      switch (field) {
        case Fields.ProductGroup:
          _set(this.product_groups, item.id, value)
          break
        case Fields.Location:
          _set(this.locations, item.id, value)
          break
        case Fields.Expire:
          _set(this.expire, item, value)
          break
        case Fields.Stock:
          _set(this.stocks, item, value)
          break
        case Fields.Hierarchy:
          _set(this.hierarchies, item, value)
          break
      }
    },
    clear() {
      this.product_groups = []
      this.locations = []
      this.expires = []
      this.stocks = [StockValues.Present]
      this.hierarchies = [HierarchyValues.Parents]
    },
    is_filtered(field, item) {
      switch (field) {
        case Fields.ProductGroup:
          return this.product_groups.includes(item.id)
        case Fields.Location:
          return this.locations.includes(item.id)
        case Fields.Expire:
          return this.expires.includes(item)
        case Fields.Stock:
          return this.stocks.includes(item)
        case Fields.Hierarchy:
          return this.hierarchies.includes(item)
      }
    }
  }
})
