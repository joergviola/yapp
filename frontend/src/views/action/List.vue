<template>
  <div class="animated fadeIn">
      <row>
        <list icon="icon-clock" label="My Time Entries" type="action" cols="12" with="task_id:task" :query="'created_by='+userId" trash=true>
          <template slot="header">
            <column span="4"><b>From</b></column>
            <column span="4"><b>To</b></column>
            <column span="3"><b>Task</b></column>
          </template>
          <template scope="row">
            <date-input v-model="row.item.from" time=true cols="4"></date-input>
            <date-input v-model="row.item.to" time=true cols="4"></date-input>
            <column span="2">
              <div class="form-control">
                <router-link :to="'/project/'+row.item.task_id.project_id+'/task/'+row.item.task_id.id">
                  {{row.item.task_id.name}}
                </router-link>
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
      name: 'actions',
      components: all,
        computed: {
            userId() { return STATE.user.id },
        },
    }
</script>
