<template>
  <div class="animated fadeIn">
    <row>
      <ressource icon="icon-check" label="Task: " type="task" :id="$route.params.id" :tmpl="tmpl" cols="12" :afterLoad="taskLoaded">
        <template slot="header" scope="$">
          <text-input inline=true v-model="$.item.name"></text-input>
        </template>
        <template scope="$">
          <row>
            <textarea-input label="Description" v-model="$.item.description" cols="12"></textarea-input>
          </row>
          <row>
            <date-input label="Starts" v-model="$.item.starts_at" cols="3"></date-input>
            <date-input label="Due" v-model="$.item.due_at" cols="3"></date-input>
            <to-one label="Assigned" v-model="$.item.user_id" with="user_id:user" display="name" cols="3"></to-one>
            <to-one label="Project" v-model="$.item.project_id" with="project_id:project" display="name" cols="3" to="/project/" ></to-one>
          </row>
          <row>
            <time-input label="Planned" v-model="$.item.planned" cols="3"></time-input>
            <time-input label="Used" v-model="$.item.used" cols="3" disabled></time-input>
            <progressbar label="Used" :value="$.item.progress ? $.item.progress() : 0" cols="6"></progressbar>
          </row>
        </template>
      </ressource>
    </row>

    <Actions :task=task></Actions>
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
