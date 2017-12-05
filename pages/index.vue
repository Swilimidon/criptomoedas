<template>
  <div>
    <section class="hero is-large">
      <div class="hero-head">
        <header class="navbar has-shadow">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item" title="criptomoedas.io">
                <img src="~/static/criptomoedas(1).png" alt="Criptomoedas">
              </a>
            </div>

            <div class="navbar-menu is-active">
              <div class="navbar-end">
                <nuxt-link class="navbar-item is-tab" to="/cripto" exact>Criptomoedas</nuxt-link>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div class="hero-body hero-image">
        <div class="container has-text-centered">
          <div class="columns">
            <div class="column"></div>
            <div class="column is-6">
              <h3 class="title is-3 primary-span-home">
                Keep track of the top 100 criptocurrencies.
              </h3>
              <nuxt-link class="button is-link is-large" to="/cripto" exact>Let's go!</nuxt-link>
            </div>
            <div class="column"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    layout: 'home'
  }
</script>
<style>
  .hero-image {
     background: url(../static/Forex.jpg) no-repeat center;
  }
  .primary-span-home {
    padding: 0.5em;
    background-color: #40C9A2;
    color: #FFF !important;
    opacity: .9;
  }

</style>

<style lang="scss">
  $primary: #1E645F;
  $is-info: #2f9c95;
  $link: #40C9A2;
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>
