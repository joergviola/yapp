<template>
  <div class="animated fadeIn">
    <row>
      <ressource icon="icon-user" label="User" type="user" :id="$route.params.id" cols="12">
        <template scope="$">
          <text-input label="Name" v-model="$.item.name"></text-input>
          <text-input label="E-Mail" v-model="$.item.email"></text-input>
          <text-input label="Username" v-model="$.item.username"></text-input>
          <password-input label="Password" v-model="$.item.password"></password-input>
          <to-one label="Company" v-model="$.item.company_id" with="company_id:company" display="name" to="/companies/company/"></to-one>
          <to-one label="Role" v-model="$.item.role_id" with="role_id:role" display="name"></to-one>
        </template>
      </ressource>
    </row>
  </div>
</template>

<script>
    import {all} from '../components/all.js'

    export default {
      name: 'user',
      components: all,
    }
</script>
