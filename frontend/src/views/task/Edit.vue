<template>
  <div class="animated fadeIn">
    <row>
      <ressource label="Task" type="task" :id="$route.params.id" :tmpl="tmpl" cols="12">
        <template scope="$">
          <row>
            <text-input label="Name" v-model="$.item.name" cols="12"></text-input>
          </row>
          <row>
            <textarea-input label="Description" v-model="$.item.description" cols="12"></textarea-input>
          </row>
          <row>
            <date-input label="Starts" v-model="$.item.starts_at" cols="6"></date-input>
            <date-input label="Due" v-model="$.item.due_at" cols="6"></date-input>
          </row>
        </template>
      </ressource>
    </row>
    <row>
      <list label="Actions" type="action" cols="12" detail="/project/task/action" :query="userQuery">
        <template slot="header">
          <column span="12"><b>Comment</b></column>
        </template>
        <template scope="row">
          <column span="12">{{row.item.comment}}</column>
        </template>
      </list>
    </row>
  </div>
</template>

<script>
    import {all} from '@/components/all.js'

    export default {
        name: 'task',
        components: all,
        computed: {
            userQuery() { return 'task_id=' + this.$route.params.id },
            tmpl() {
                return {
                    project_id: this.$route.params.pid
                }
            }
        }
    }
</script>
