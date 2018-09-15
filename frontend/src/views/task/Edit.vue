<template>
  <div class="animated fadeIn">
    <row>
      <ressource label="Task" type="task" :id="$route.params.id" :tmpl="tmpl" cols="12" :afterLoad="taskLoaded">
        <template scope="$">
          <row>
            <text-input label="Name" v-model="$.item.name" cols="12"></text-input>
          </row>
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
            <text-input label="Used" v-model="$.item.used" cols="3"></text-input>
          </row>
        </template>
      </ressource>
    </row>
    <row>
      <list label="Actions" type="action" cols="12" with="created_by:user" :query="userQuery" :reload="latestId" orderBy="created_at:desc">
        <template slot="header">
          <ressource label="What have you done" type="action" id="new" :tmpl="actionTmpl" cols="12" :next="actionCreated">
            <template scope="$">
              <row>
                <textarea-input label="Comment" v-model="$.item.comment" cols="12"></textarea-input>
              </row>
              <row>
                <date-input label="Started" v-model="$.item.from" cols="3" time=true></date-input>
                <date-input label="Stopped" v-model="$.item.to" cols="3" time=true></date-input>
                <div class="col-sm-3">
                  <button class="btn btn-primary" v-on:click="toggle($.item)">{{running ? 'Stop' : 'Start'}}</button>
                </div>
              </row>
            </template>
          </ressource>
        </template>
        <template scope="row">
          <column v-if="row.item.created_by.id==1" span="3"></column>
          <column span="1">
            <img src="static/img/avatars/6.jpg" class="img-avatar pull-right" alt="admin@bootstrapmaster.com">
          </column>
          <column span="8">
            <div class="card">
              <div class="card-block">
                <div> {{row.item.comment}} </div>
                <div v-if="duration(row.item)"> Booked: {{ duration(row.item) }} </div>
              </div>
              <div class="card-footer" id="2">
                <small> {{row.item.created_by.name}} <span :title="row.item.created_at">{{fromNow(row.item.created_at)}}</span></small>
              </div>
            </div>
            <column v-if="row.item.created_by.id!=1" span="3"></column>
          </column>
        </template>
      </list>
    </row>
  </div>
</template>

<script>
    import {all} from '@/components/all.js'
    import moment from 'moment'

    export default {
        name: 'task',
        components: all,
        data() {
            return {
                latestId : null,
                running: null,
                task: null
            }
        },
        computed: {
            userQuery() { return 'task_id=' + this.$route.params.id },
            tmpl() {
                return {
                    project_id: this.$route.params.pid
                }
            },
            actionTmpl() {
                return {
                    task_id: this.$route.params.id,
                    from: moment().format('YYYY-MM-DDTHH:mm'),
                    to: moment().format('YYYY-MM-DDTHH:mm'),
                }
            },
        },
        methods: {
            taskLoaded(task) {
                this.task = task
            },
            actionCreated(action) {
                this.latestId = action.body.id
                this.task.refreshUsed()
                console.log("LID", action)
            },
            duration(action) {
                if (!action.to || !action.from) return false
                const ms = new Date(action.to).getTime() - new Date(action.from).getTime()
                if (ms<=0) return false
                let m = Math.round(ms/(1000*60))
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
        }
    }
</script>
