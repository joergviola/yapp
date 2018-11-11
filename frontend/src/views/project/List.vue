<template>
  <div class="animated fadeIn">
      <row>
        <list icon="icon-control-play" label="Projects" type="project" with="client_id:organisation" cols="12" detail="/project/"  query="state!=Lead">
          <template slot="header">
            <column span="4"><b>Name</b></column>
            <column span="2"><b>Client</b></column>
            <column span="2"><b>State</b></column>
            <column span="3"><b>Progress</b></column>
          </template>
          <template scope="row">
            <text-input v-model="row.item.name" cols="4"></text-input>
            <column span="2">
              <div class="form-control">
                {{row.item.client_id.name}}
              </div>
            </column>
            <enum-input v-model="row.item.state" cols="2" enum="Lead, Ordered, Running, Closed"></enum-input>
            <progressbar :value="row.item.progress()" cols="3"></progressbar>
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
