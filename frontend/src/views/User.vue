<template>
  <div class="animated fadeIn">
    <row>
      <ressource icon="icon-user" label="User" type="user" with="organisation_id:organisation,role_id:role" :id="$route.params.id" cols="12">
        <template scope="$">
          <text-input label="Name" v-model="$.item.name"></text-input>
          <text-input label="E-Mail" v-model="$.item.email"></text-input>
          <text-input label="Username" v-model="$.item.username"></text-input>
          <password-input label="Password" v-model="$.item.password"></password-input>
          <to-one label="Organisation" v-model="$.item.organisation_id" type="organisation" display="name" to="/organisations/organisation/"></to-one>
          <to-one label="Role" v-model="$.item.role_id" type="role" display="name"></to-one>
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
