import { defineStore } from 'pinia'

export const Fields = {
  ProductGroup: 'product_group',
  Location: 'location',
  Tag: 'tag',
  Expire: 'expire',
  Stock: 'stock'
}

export const ExpireValues = {
  Expired: 'expired',
  Expire7Days: '7',
  Expire30Days: '30'
}

export const StockValues = {
  Present: 'present',
  LowStock: 'low_stock',
  Empty: 'empty'
}

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
  if (index >= 0) {
    arr.splice(index, 1)
  } else {
    arr.push(value)
  }
  return arr
}

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    product_groups: [],
    locations: [],
    tags: [],
    others: [StockValues.Present]
  }),
  getters: {
    filtered_product_groups: (state) => {
      return state.product_groups
    },
    filtered_locations: (state) => {
      return state.locations
    },
    filtered_tags: (state) => {
      return state.tags
    },
    filtered_others: (state) => {
      return state.others
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
        case Fields.Tag:
          _toggle(this.tags, item)
          break
        case Fields.Expire:
          _toggle(this.others, item)
          break
        case Fields.Stock:
          _toggle(this.others, item)
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
        case Fields.Tag:
          _set(this.tags, item, value)
          break
        case Fields.Expire:
          _set(this.expire, item, value)
          break
        case Fields.Stock:
          _set(this.stock, item, value)
          break
      }
    },
    clear() {
      this.product_groups = []
      this.locations = []
      this.tags = []
      this.others = [StockValues.Present]
    },
    is_filtered(field, item) {
      switch (field) {
        case Fields.ProductGroup:
          return this.product_groups.includes(item.id)
        case Fields.Location:
          return this.locations.includes(item.id)
        case Fields.Tag:
          return this.tags.includes(item)
        case Fields.Expire:
          return this.others.includes(item)
        case Fields.Stock:
          return this.others.includes(item)
      }
    }
  }
})
