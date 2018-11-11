<template>
  <div class="animated fadeIn">
      <row>
        <list icon="icon-organization" label="Organisations" type="organisation" cols="12" detail="/organisations/organisation/">
          <template slot="header">
            <column span="6"><b>Name</b></column>
            <column span="5"><b>E-Mail</b></column>
          </template>
          <template scope="row">
            <column span="6">{{row.item.name}}</column>
            <column span="5">{{row.item.email}}</column>
          </template>
        </list>
      </row>
    </div>
</template>

<script>
    import {all} from '@/components/all.js'

    export default {
      name: 'organisations',
      components: all,

    }
</script>
