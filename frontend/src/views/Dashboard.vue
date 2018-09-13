<template>
  <div class="animated fadeIn">
    <row>
      <list label="My Tasks" type="task" cols="12" :detail="taskDetail" :query="userQuery">
        <template slot="header">
          <column span="4"><b>name</b></column>
          <column span="4"><b>Due</b></column>
        </template>
        <template scope="row">
          <column span="4">{{row.item.name}}</column>
          <column span="4">{{row.item.due_at}}</column>
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
            userQuery() { return 'user_id=' + 1 },
            taskDetail() { return '/project/$/task/' },
        },
    }
</script>
