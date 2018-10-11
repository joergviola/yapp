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

    <row>
      <list icon="icon-clock" label="Actions" type="action" cols="12" with="created_by:user" :query="userQuery" :reload="latestId" orderBy="created_at:desc" plain=true>
        <ressource ref="newAction" slot="rawheader" type="action" id="new" raw="true" :tmpl="newAction" :next="actionCreated">
          <template scope="$">
            <row>
              <column span="3"></column>
              <column span="1">
                <img :src="avatar(user)" class="img-avatar pull-right" alt="admin@bootstrapmaster.com">
              </column>
              <column span="8">
                <row>
                  <column span="2"><b>{{user.name}}</b></column>
                    <date-input v-model="$.item.from" cols="4" time=true></date-input>
                    <date-input v-model="$.item.to" cols="4" time=true></date-input>
                  <column span="2">
                    <button class="btn btn-primary" v-on:click="toggle($.item)">{{running ? 'Stop' : 'Timer'}}</button>
                  </column>
                </row>
                <row>
                  <column span="10">
                    <textarea-input v-model="$.item.comment"></textarea-input>
                  </column>
                  <column span="2">
                    <button class="btn btn-primary" v-on:click="saveAction">Save</button>
                  </column>
                </row>
              </column>

            </row>
          </template>
        </ressource>
        <template scope="row">
          <column v-if="row.item.created_by.id==userId" span="3"></column>
          <column span="1">
            <img :src="avatar(row.item.created_by)" class="img-avatar pull-right" alt="admin@bootstrapmaster.com">
          </column>
          <column span="8">
                <div>
                  <b>{{row.item.created_by.name}}</b>
                  <small class="light-grey">
                    <span :title="row.item.created_at">
                      {{fromNow(row.item.created_at)}}
                    </span>
                    <span v-if="duration(row.item)">, booked: {{ duration(row.item) }} </span>
                  </small>
                </div>
                <div> {{row.item.comment}} </div>
                <hr>
          </column>
          <column v-if="row.item.created_by.id!=userId" span="3"></column>
        </template>
      </list>
    </row>
  </div>
</template>

<script>
    import Vue from 'vue'
    import {all} from '@/components/all.js'
    import moment from 'moment'
    import api from '@/api'

    export default {
        name: 'task',
        components: all,
        data() {
            return {
                latestId : null,
                running: null,
                task: null,
                newAction: this.createAction(),
                user: STATE.user,
            }
        },
        computed: {
            userId() { return STATE.user.id },
            userQuery() { return 'task_id=' + this.$route.params.id },
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
            actionCreated(action) {
                this.latestId = action.id
                this.task.refreshUsed()
                console.log("LID", action)
            },
            duration(action) {
                const duration = action.duration()
                if (duration==0) return false
                let m = Math.round(duration/60)
                let h = Math.round(m/60)
                m = m % 60;
                return f(h) + ":" + f(m)

                function f(t) {
                    return (t<10 ? "0" : "") + t
                }
            },
            toggle: function (item) {
                const self = this;
                if (this.running) {
                    clearTimeout(self.running)
                    self.running = null;
                } else {
                    update()

                    function update() {
                        item.to = moment().format('YYYY-MM-DDTHH:mm:ss')
                        self.running = setTimeout(update, 1000)
                    }
                }
            },
            fromNow(date) {
                return moment(date).fromNow()
            },
            saveAction() {
                this.$refs.newAction.save()
                Vue.nextTick(() => this.newAction = this.createAction())
            },
            createAction() {
                return {
                    task_id: this.$route.params.id,
                    from: moment().format('YYYY-MM-DDTHH:mm'),
                    to: moment().format('YYYY-MM-DDTHH:mm'),
                }
            },
            avatar(user) {
              return api.url() + '/img/users/'+ user.id + '.jpg'
            }

        },
    }
</script>
