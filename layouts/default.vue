<template>
  <section>
    <header class="navbar has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" title="criptomoedas.io">
            <img src="@/static/criptomoedas(1).png" alt="Criptomoedas">
          </a>
        </div>
        <div class="navbar-menu is-active">
          <div class="navbar-end">
            <nuxt-link class="navbar-item is-tab" to="/" exact>Home</nuxt-link>
            <nuxt-link class="navbar-item is-tab" to="/cripto" exact>Criptomoedas</nuxt-link>
          </div>
        </div>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <nuxt/>
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Criptomoedas</strong> by <a href="">Kainã Barros</a>. <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
          </p>
        </div>
      </div>
    </footer>
  </section>
</template>

<style>
</style>
