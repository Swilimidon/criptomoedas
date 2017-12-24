<template>
  <section>
    <b-collapse class="panel" :open.sync="isOpen">
      <div slot="trigger" class="has-text-right">
        <b-icon :icon="isOpen ?
          'caret-up' : 'caret-up'">
        </b-icon>
      </div>
      <br>
      <div class="">
        <div class="content columns is-multiline is-centered">

          <div class="column" v-for="moeda in limitBy(dados, 4)">
            <div class="box" style="background-color: #f3fff0">
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <div class="columns">
                      <div class="column">
                        <p class="is-size-6 has-text-weight-semibold">{{ moeda.name }}</p>
                      </div>
                      <div class="column has-text-right">
                        <b-tooltip label="Percent change in last 24 hours" animated>
                          <p class="has-text-danger" v-if="moeda.percent_change_24h < 0">
                            <span><b-icon icon="arrow-down" size="is-small"></b-icon></span> {{ moeda.percent_change_24h | percentage(2) }}
                          </p>
                          <p class="has-text-success" v-else>
                            <span><b-icon icon="arrow-up" size="is-small"></b-icon></span> {{ moeda.percent_change_24h | percentage(2) }}
                          </p>
                        </b-tooltip>
                      </div>
                    </div>
                    <p class="is-size-5 has-text-weight-light" v-if="moeda.percent_change_24h < 0">
                      {{ moeda.price_usd | currency }}
                      <span>
                      <b-icon icon="caret-down" size="is-small">
                      </b-icon>
                  </span>
                    </p>
                    <p class="is-size-5 has-text-weight-light" v-else>
                      {{ moeda.price_usd | currency }}
                      <span>
                      <b-icon icon="caret-up" size="is-small">
                      </b-icon>
                  </span>
                    </p>
                    <p class="is-size-7 has-text-weight-light">{{ moeda.price_usd }}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>

        </div>
      </div>
    </b-collapse>

    <h1 class="title">Top cryptocurrencies</h1>
    <h1 class="subtitle">top 100 cryptocurrencies in market volume</h1>

    <hr>

    <vue-chart type="doughnut" :data="myData"></vue-chart>
    <div class="columns is-block-desktop is-block-tablet is-block-widescreen is-block-fullhd ">
      <nav class="column">
        <b-select v-model="perPage">
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="15">15 per page</option>
          <option value="20">20 per page</option>
        </b-select>
      </nav>
      <div class="column">
        <b-table
          :data="isEmpty ? [] : dados"
          :paginated="true"
          :per-page="perPage"
          :pagination-simple="false"
          :mobile-cards="true"
          :loading="loading"
          :selected.sync="selected"
          :hoverable="true"
          :focusable="true"
          :default-sort="['rank', 'asc']"
          detailed
          detail-key="id"
          @details-open="(row, index) => $toast.open(`Expanded ${row.name}`)"
          class="is-unselectable">

          <template scope="props">
            <b-table-column field="rank" label="Rank" width="40" sortable numeric>
              {{  props.row.rank }}
            </b-table-column>

            <b-table-column field="symbol" label="Symbol" width="40" sortable>
              {{ props.row.symbol }}
            </b-table-column>

            <b-table-column field="name" label="Name" sortable>
              <img v-bind:src="getCoinImage(props.row.symbol)"> {{ props.row.name }}
            </b-table-column>

            <b-table-column field="price_usd" label="Price" sortable numeric>
              {{ props.row.price_usd | currency('US$ ') }}
            </b-table-column>

            <b-table-column field="market_cap_usd" label="Market Cap" sortable numeric>
              {{ props.row.market_cap_usd | currency('US$ ') }}
            </b-table-column>

            <b-table-column field="last_updated" label="Date" sortable centered>
                    <span class="tag is-success">
                        {{ new Date(props.row.last_updated).toLocaleDateString() }}
                    </span>
            </b-table-column>
          </template>
          <template slot="detail" scope="props">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ props.row.symbol }} {{ props.row.name }}</strong>
                    <small>@{{ props.row.name }}</small>
                    <small>31m</small>
                    <br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                    Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                  </p>
                </div>
              </div>
            </article>
          </template>
          <template slot="empty">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p>
                  <b-icon
                    icon="error"
                    size="is-large">
                  </b-icon>
                </p>
                <p>Nothing here.</p>
              </div>
            </section>
          </template>
        </b-table>
      </div>
    </div>


  </section>
</template>

<script>
  import 'vue2-filters'

  import VueChart from 'vue-chart'

  // let baseURL = 'https://www.cryptocompare.com/'
  export default {
    name: 'cripto',
    components: {
      VueChart
    },
    data () {
      return {
        dados: [],
        selected: {},
        currency: 'USD',
        myData: {
          labels: ['REMAIN', 'LEAVE'],
          datasets: [{
            backgroundColor: ['#36A2EB', '#FF6384'],
            data: [1, 1]
          }]
        },
        listaDeCoins: {},
        isEmpty: false,
        loading: false,
        perPage: 10
      }
    },
    async asyncData ({ app }) {
      let API_URI = 'https://api.coinmarketcap.com/v1/ticker/'
      let data = (await app.$axios.get(API_URI)).data
      for (let i = 0; i < data.length; i++) {
        let obj = data[i]
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop) && !isNaN(obj[prop])) {
            obj[prop] = +obj[prop]
          }
        }
      }
      return { dados: data }
    },
    methods: {
      async getData (currency) {
        if (!currency) currency = 'USD'
        // let currency = 'BRL'
        this.loading = true
        let API_URI = 'https://api.coinmarketcap.com/v1/ticker/' + '?convert=' + currency
        // let CONVERT_API_URI = 'https://api.coinmarketcap.com/v1/ticker/?convert=' + currency + '&limit=10'

        let data = (await this.$axios.get(API_URI)).data
        for (let i = 0; i < data.length; i++) {
          let obj = data[i]
          for (let prop in obj) {
            if (obj.hasOwnProperty(prop) && !isNaN(obj[prop])) {
              obj[prop] = +obj[prop]
            }
          }
        }
        this.dados = data
        this.loading = false
      },
      //      async getCoinsList ({ app }) {
      //        this.loading = true
      //        let COINS_LIST_API_URI = 'https://min-api.cryptocompare.com/data/all/coinlist'
      //        await app.$axios.$get(COINS_LIST_API_URI)
      //          .then((resp) => {
      //            this.listaDeCoins = resp.data.Data
      //            window.localStorage.setItem('cryptocurrencies', JSON.stringify(resp.data.Data))
      //          })
      //          .catch((err) => {
      //            if (err.response) {
      //              console.log(err.response.data)
      //              console.log(err.response.status)
      //              console.log(err.response.headers)
      //            } else if (err.request) {
      //              console.log(err.request)
      //            } else {
      //              console.log('Error', err.message)
      //            }
      //          })
      //        this.loading = false
      //      },
      getCoinImage (symbol) {
        // return baseURL + this.listaDeCoins[symbol].imageURL
      }
    },
    created: function () {
      setInterval(() => {
        this.getData()
      }, 60000)
    }
  }
</script>
