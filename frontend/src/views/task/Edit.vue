<template>
  <div class="animated fadeIn">
    <row>
      <ressource icon="icon-check" label="Task: " type="task" :id="$route.params.id" with="user_id:user,project_id:project"
                 :tmpl="tmpl" cols="4" :afterLoad="taskLoaded">
        <template slot="header" scope="$">
          <text-input inline=true v-model="$.item.name"></text-input>
        </template>
        <template scope="$">
          <row>
            <textarea-input label="Description" v-model="$.item.description" cols="12"></textarea-input>
          </row>
          <row>
            <date-input label="Starts" v-model="$.item.starts_at" cols="12"></date-input>
          </row>
          <row>
            <date-input label="Due" v-model="$.item.due_at" cols="12"></date-input>
          </row>
          <row>
            <to-one label="Assigned" v-model="$.item.user_id" type="user" display="name" cols="12"></to-one>
          </row>
          <row>
            <to-one label="Project" v-model="$.item.project_id" type="project" display="name" cols="12" to="/project/" ></to-one>
          </row>
          <row>
            <time-input label="Planned" v-model="$.item.planned" cols="12"></time-input>
          </row>
          <row>
            <time-input label="Used" v-model="$.item.used" cols="12" disabled></time-input>
          </row>
          <row>
            <progressbar label="Used" :value="$.item.progress ? $.item.progress() : 0" cols="12"></progressbar>
          </row>
        </template>
      </ressource>
      <column span="8">
        <Actions v-if="$route.params.id!='new'" :task=task></Actions>
      </column>
    </row>

  </div>
</template>

<script>
    import Vue from 'vue'
    import {all} from '@/components/all.js'
    import moment from 'moment'
    import api from '@/api'
    import Action from '@/views/action/Edit.vue'

    all.Actions = Action

    export default {
        name: 'task',
        components: all,
        data() {
            return {
                task: null,
            }
        },
        computed: {
            tmpl() {
                return {
                    user_id: STATE.user.id,
                    project_id: this.$route.params.pid,
                }
            },
        },
        methods: {
          taskLoaded(task) {
            this.task = task
          },
        }
    }
</script>
