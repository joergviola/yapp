<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none mr-auto" type="button" @click="sidebarMinimize">&#9776;</button>
    <button @click="logout">logout</button>

    <b-nav is-nav-bar class="ml-auto">
      <b-nav-item-dropdown right>
        <template slot="button-content">
          <span class="d-md-down-none">{{ user }}</span>
        </template>
        <b-dropdown-item @click="logout"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>

    <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">&#9776;</button>
  </header>
</template>
<script>
import api from '@/api.js'



export default {
  name: 'header',
    computed: {
      user() {return window.user ? window.user.name : "None"}
    },
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
          api.logout()
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
