<template>
  <div class="animated fadeIn">
      <row>
        <list label="Users" type="user" with="organisation_id:organisation" cols="12" detail="/users/user/">
          <template slot="header">
            <column span="4"><b>Organisation</b></column>
            <column span="4"><b>Name</b></column>
            <column span="4"><b>E-Mail</b></column>
          </template>
          <template scope="row">
            <column span="4">{{row.item.organisation_id.name}}</column>
            <column span="4">{{row.item.name}}</column>
            <column span="4">{{row.item.email}}</column>
          </template>
        </list>
      </row>
    </div>
</template>

<script>
    import {all} from '../components/all.js'

    export default {
      name: 'users',
      components: all,

    }
</script>
