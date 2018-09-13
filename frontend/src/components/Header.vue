<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none mr-auto" type="button" @click="sidebarMinimize">&#9776;</button>
    <button @click="logout">logout</button>
    <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">&#9776;</button>
  </header>
</template>
<script>
import config from '@/config.js'



export default {
  name: 'header',
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    },
      logout() {
          let  url = config.api + '/api/1.0/logout'
          this.$http
              .post(url, {}, {credentials: true})
              .then(response => {
                      this.$router.push('/login')
                  },
                  err => {
                      this.$swal( err.statusText,
                          err.body.message,
                          'error');
                      console.log(err)
                  }
              );
      }        ,

  }
}
</script>
