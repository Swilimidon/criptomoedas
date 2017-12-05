<template>
  <section>
    <header class="navbar has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" title="criptomoedas.io">
            <img src="~/static/criptomoedas(1).png" alt="Criptomoedas">
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
            <strong>Criptomoedas</strong> by <a href="">Kainã Barros</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
          </p>
        </div>
      </div>
    </footer>
  </section>
</template>

<style>
</style>
