<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
              :src="avatar"
              class="img-avatar"
              :alt="user.email" />
      {{ user.name }}
    </template>\
    <template slot="dropdown">
      <b-dropdown-item>
        <router-link to="/actions">
          <i class="icon-clock"></i> Time Entries
        </router-link>

      </b-dropdown-item>
      <b-dropdown-item @click="logout"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
  import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
  import api from '@/api.js'

  export default {
    name: 'DefaultHeaderDropdownAccnt',
    components: {
      AppHeaderDropdown
    },
    data: () => {
      return { itemsCount: 42 }
    },
    computed: {
      user() {
        return STATE.user
      },
      avatar() {
        return api.doc('user', STATE.user.id, 'avatar', STATE.user.avatar)
      }
    },
    methods: {
      logout() {
        api.logout()
          .then(response => {
              this.$router.push('/login')
            },
            err => {
              this.$swal(err.statusText,
                err.body.message,
                'error');
              console.log(err)
            }
          );
      }
    },

  }
</script>
