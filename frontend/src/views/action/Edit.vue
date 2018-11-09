<template>
    <row>
      <list v-if="task || projectId" icon="icon-clock" label="Actions" type="action" cols="12" with="created_by:user" :query="actionQuery" :reload="latestId" orderBy="created_at:desc" plain=true nofooter="true">
        <ressource ref="newAction" slot="rawheader" type="action" id="new" raw="true" :tmpl="newAction" :next="actionCreated">
          <template scope="$">
            <row>
              <column span="3"></column>
              <column span="1">
                <img :src="avatar(user)" class="img-avatar pull-right" alt="admin@bootstrapmaster.com">
              </column>
              <column span="8">
                <row>
                  <column span="12"><b>{{user.name}}</b></column>
                </row>
                <row>
                  <date-input v-model="$.item.from" cols="6" time=true ></date-input>
                  <text-input v-model="duration" cols="4" time=true :propose="propose($.item.from)" v-on:input="value => setDuration($.item, value)"></text-input>
                  <column span="2">
                    <b-button :variant="running?'outline-secondary':'primary'" :pressed.sync="running" v-on:click="toggle($.item)">
                      <i :class="running?'icon-control-pause':'icon-control-play'"></i>
                    </b-button>
                  </column>
                </row>
                <row>
                  <column span="10">
                    <textarea-input placeholder="Your comment..." v-model="$.item.comment"></textarea-input>
                  </column>
                  <column span="2">
                    <button class="btn btn-primary" v-on:click="saveAction">
                      <i class="icon-folder"></i>
                    </button>
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
              duration: '00:00',
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
            propose(from) {
//              return ['00:15','00:30', '00:45', '01:00','01:15','01:30'].map(min => {
                return [...Array(10).keys()].map(i => {
                  const min = 15*i
                  const h = Math.floor(min / 60)
                  const m = min % 60
                  const display = moment({hours:h, minutes:m}).format('HH:mm')
                  return {
                    value: display,
                    display: display + ' (' + moment().add(min, 'minutes').format('HH:mm') + ')'
                  }
              })
            },
            setDuration(action, duration) {
              const hm = duration.split(':')
              const min = hm[0]*60+1*hm[1]
              action.to = moment(action.from).add(min, 'minutes').format('YYYY-MM-DDTHH:mm:ss')
            },
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
                this.duration = "00:00"
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
