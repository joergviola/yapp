<template>
  <div class="animated fadeIn">
      <row>
        <list icon="icon-clock" label="My Time Entries" type="action" cols="12" with="task_id:task,project_id:project" :query="'created_by='+userId" trash=true>
          <template slot="header">
            <column span="3"><b>From</b></column>
            <column span="3"><b>To</b></column>
            <column span="3"><b>Project</b></column>
            <column span="2"><b>Task</b></column>
          </template>
          <template scope="row">
            <date-input v-model="row.item.from" time=true cols="3"></date-input>
            <date-input v-model="row.item.to" time=true cols="3"></date-input>
            <column span="2">
              <div class="form-control">
                <router-link :to="'/project/'+row.item.project_id.id">
                  {{row.item.project_id.name}}
                </router-link>
              </div>
            </column>
            <column span="2">
              <div class="form-control">
                <router-link v-if="row.item.task_id" :to="'/project/'+row.item.project_id.id+'/task/'+row.item.task_id.id">
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
