<template>
  <div class="animated fadeIn">

    <row>
      <list icon="icon-check" label="My Tasks" type="task" cols="12" with="project_id:project" :detail="taskDetail" :query="'user_id=' + userId ">
        <template slot="header">
          <column span="7"><b>Name</b></column>
          <column span="2"><b>Project</b></column>
          <column span="2"><b>Due</b></column>
        </template>
        <template scope="row">
          <text-input v-model="row.item.name" cols="7"></text-input>
          <column span="2">
            <div class="form-control">
              <router-link :to="'/project/'+row.item.project_id.id">
                {{row.item.project_id.name}}
              </router-link>
            </div>
          </column>
          <date-input v-model="row.item.due_at" cols="2"></date-input>
        </template>
      </list>
    </row>

    <row>
      <list icon="icon-like" label="Leads" type="project" with="client_id:company" cols="6" detail="/lead/" query="state=Lead">
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

      <list icon="icon-clock" label="My Time Entries" type="action" cols="6" with="task_id:task" :query="'created_by='+userId" trash=true>
        <template slot="header">
          <column span="4"><b>From</b></column>
          <column span="4"><b>To</b></column>
          <column span="3"><b>Task</b></column>
        </template>
        <template scope="row">
          <date-input v-model="row.item.from" time=true cols="4"></date-input>
          <date-input v-model="row.item.to" time=true cols="4"></date-input>
          <column span="3">
            <router-link :to="'/project/'+row.item.task_id.project_id+'/task/'+row.item.task_id.id">
              {{row.item.task_id.name}}
            </router-link>
          </column>
        </template>
      </list>
    </row>

  </div>
</template>

<script>
    import {all} from '../components/all.js'

    export default {
        name: 'dashboard',
        components: all,
        computed: {
            userId() { return STATE.user.id },
            taskDetail() { return '/project/$/task/' },
        },
    }
</script>
