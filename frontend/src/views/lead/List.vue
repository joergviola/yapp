<template>
  <div class="animated fadeIn">
      <row>
        <list icon="icon-like" label="Leads" type="project" with="client_id:company" cols="12" detail="/lead/" query="state=Lead">
          <template slot="header">
            <column span="7"><b>Name</b></column>
            <column span="4"><b>Client</b></column>
          </template>
          <template scope="row">
            <text-input v-model="row.item.name" cols="7"></text-input>
            <column span="4">
              <div class="form-control">
              {{row.item.client_id.name}}
              </div>
            </column>
          </template>
        </list>
      </row>
    </div>
</template>

<script>
    import {all} from '@/components/all.js'

    export default {
      name: 'companies',
      components: all,

    }
</script>
