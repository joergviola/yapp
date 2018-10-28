<template>
    <row>
      <list v-if="task || projectId" icon="icon-clock" label="Actions" type="action" cols="12" with="created_by:user" :query="actionQuery" :reload="latestId" orderBy="created_at:desc" plain=true>
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
                    <b-button :variant="running?'outline-primary':'outline'" :pressed.sync="running" v-on:click="toggle($.item)">
                      <i class="icon-clock"></i>
                    </b-button>
                  </column>
                </row>
                <row>
                  <column span="10">
                    <textarea-input placeholder="Your comment..." v-model="$.item.comment"></textarea-input>
                  </column>
                  <column span="2">
                    <button class="btn btn-primary" v-on:click="saveAction">Save</button>
                  </column>
                </row>
                <hr>
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
                    <span v-if="row.item.duration()">, booked: {{ row.item.duration() | duration }} </span>
                  </small>
                </div>
                <div> {{row.item.comment}} </div>
                <hr>
          </column>
          <column v-if="row.item.created_by.id!=userId" span="3"></column>
        </template>
      </list>
    </row>
</template>

<script>
    import Vue from 'vue'
    import {all} from '@/components/all.js'
    import moment from 'moment'
    import api from '@/api'

    export default {
        name: 'Action',
        components: all,
        props: ['task', 'projectId'],
        data() {
            return {
                latestId : null,
                running: null,
                newAction: this.createAction(),
                user: STATE.user,
            }
        },
        watch: {
          task() {
            this.newAction = this.createAction()
          },
          projectId() {
            this.newAction = this.createAction()
          }
        },
        computed: {
            userId() { return STATE.user.id },
            actionQuery() {
              if (this.task) return 'task_id=' + this.task.id
              if (this.projectId) return 'project_id=' + this.projectId
            },
        },
        methods: {
            taskLoaded(task) {
                this.task = task
            },
            actionCreated(action) {
                this.latestId = action.id
                this.task.refreshUsed()
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
              console.log("CA", this.task, this.projectId)
                return {
                    task_id: this.task ? this.task.id : null,
                    project_id: this.task ? this.task.project_id : this.projectId,
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
