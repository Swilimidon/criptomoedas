import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

/**
 * Vue filter to convert the given value to percent.
 * http://jsfiddle.net/bryan_k/qauf3qyh/
 *
 * @param {String} value    The value string.
 * @param {Number} decimals The number of decimal places.
 */
Vue.filter('percentage', (value, decimals) => {
  if (!value) {
    value = 0
  }

  if (!decimals) {
    decimals = 0
  }

  // value = value * 100
  value = value * Math.pow(10, decimals) / Math.pow(10, decimals)
  value = value + '%'
  return value
})

/**
 * Vue filter to truncate a string to the specified length.
 * @param {String} value The value string.
 */
Vue.filter('truncate', (value, length) => {
  if (value.length < length) {
    return value
  }

  length = length - 3

  return value.substring(0, length) + '...'
})
Vue.use(Vue2Filters)
