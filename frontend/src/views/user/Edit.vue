<template>
  <div class="animated fadeIn">
    <ressource ref="r" icon="icon-user" label="User" type="user" with="organisation_id:organisation,role_id:role" :id="$route.params.id" cols="12">
      <template scope="$">
        <row>
          <column span="2">
            <file v-model="$.item.avatar" image="true" :url="name => $refs.r.url('avatar', name)"></file>
          </column>
          <column span="10">
          <text-input label="Name" v-model="$.item.name"></text-input>
          <text-input label="E-Mail" v-model="$.item.email"></text-input>
          </column>
        </row>
        <text-input label="Username" v-model="$.item.username"></text-input>
        <password-input label="Password" v-model="$.item.password"></password-input>
        <to-one label="Organisation" v-model="$.item.organisation_id" type="organisation" display="name" to="/organisations/organisation/"></to-one>
        <to-one label="Role" v-model="$.item.role_id" type="role" display="name"></to-one>
      </template>
    </ressource>
  </div>
</template>

<script>
    import {all} from '@/components/all.js'

    export default {
      name: 'user',
      components: all,
    }
</script>
