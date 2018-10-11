<template>
  <div class="animated fadeIn">

    <row>
      <list icon="icon-check" label="My Tasks" type="task" cols="12" with="project_id:project" :detail="taskDetail" :query="'user_id=' + userId ">
        <template slot="header">
          <column span="7"><b>Name</b></column>
          <column span="2"><b>Project</b></column>
          <column span="2"><b>Due</b></column>
        </template>
        <template slot-scope="row">
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
