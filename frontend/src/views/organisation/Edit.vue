<template>
  <div class="animated fadeIn">
    <row>
      <ressource icon="icon-organization" label="Organisation" type="organisation" :id="$route.params.id" cols="12">
        <template scope="$">
          <row>
            <text-input label="Name" v-model="$.item.name" cols="6" required=true></text-input>
            <text-input label="E-Mail" v-model="$.item.email" cols="6"></text-input>
          </row>
          <row>
            <text-input label="Website" v-model="$.item.website" cols="6"></text-input>
            <text-input label="Telefone" v-model="$.item.telefone" cols="6"></text-input>
          </row>
        </template>
      </ressource>
    </row>
    <row>
      <list icon="icon-user" label="Persons" type="user" with="organisation_id:organisation" cols="12" detail="/users/user/" :query="userQuery">
        <template slot="header">
          <column span="4"><b>Name</b></column>
          <column span="4"><b>E-Mail</b></column>
        </template>
        <template scope="row">
          <column span="4">{{row.item.name}}</column>
          <column span="4">{{row.item.email}}</column>
        </template>
      </list>
    </row>
  </div>
</template>

<script>
    import {all} from '@/components/all.js'

    export default {
      name: 'organisation',
      components: all,
      computed: {
          userQuery() { return 'organisation_id=' + this.$route.params.id },
      },
    }
</script>
