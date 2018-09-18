<template>
  <div class="animated fadeIn">
      <row>
        <list label="Projects" type="project" with="client_id:company" cols="12" detail="/project/"  query="state!=Lead">
          <template slot="header">
            <column span="4"><b>Name</b></column>
            <column span="4"><b>Client</b></column>
            <column span="3"><b>State</b></column>
          </template>
          <template scope="row">
            <column span="4">{{row.item.name}}</column>
            <column span="4">{{row.item.client_id.name}}</column>
            <column span="3">{{row.item.state}}</column>
          </template>
        </list>
      </row>
    </div>
</template>

<script>
    import {all} from '@/components/all.js'

    export default {
      name: 'projects',
      components: all,

    }
</script>
