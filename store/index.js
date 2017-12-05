import Vuex from 'vuex'
import axios from 'axios'

const store = () => {
  return new Vuex.Store({
    state: {
      cryptocurrencies: []
    },
    mutations: {
      increment (state) {
        let COINS_LIST_API_URI = 'https://min-api.cryptocompare.com/data/all/coinlist'
        axios.get(COINS_LIST_API_URI)
          .then((resp) => {
            state.cryptocurrencies = JSON.parse(JSON.stringify(resp.data.Data))
          })
          .catch((err) => {
            console.log('Error', err.message)
          })
      }
      // add (state, text) {
      //   state.list.push({
      //     text: text,
      //     done: false
      //   })
      // },
      // remove (state, { todo }) {
      //   state.list.splice(state.list.indexOf(todo), 1)
      // },
      // toggle (state, todo) {
      //   todo.done = !todo.done
      // }
    }
  })
}

export default store
