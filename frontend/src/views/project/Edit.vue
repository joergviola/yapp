<template>
  <div class="animated fadeIn">
    <row>
      <ressource icon="icon-control-play" label="Project" type="project" with="client_id:organisation"  :id="$route.params.id" cols="12" :afterLoad="project => this.links={project_id: project}">
        <template slot="header" scope="$">
          <text-input inline="true" v-model="$.item.name" cols="6" required=true></text-input>
        </template>
        <template scope="$">
          <row>
            <textarea-input v-model="$.item.description" cols="12"></textarea-input>
          </row>
          <row>
            <enum-input label="State" v-model="$.item.state" cols="3" enum="Lead, Ordered, Running, Closed"></enum-input>
            <date-input label="From" v-model="$.item.starts_at" cols="3"></date-input>
            <date-input label="To" v-model="$.item.ends_at" cols="3"></date-input>
            <to-one label="Client" v-model="$.item.client_id" type="organisation" display="name" to="/organisations/organisation/" cols="3"></to-one>
          </row>
          <row>
            <time-input label="Planned" v-model="$.item.planned" cols="3" disabled></time-input>
            <time-input label="Used" v-model="$.item.used" cols="3" disabled></time-input>
            <progressbar label="Progress" :value="$.item.progress ? $.item.progress() : 0" cols="3"></progressbar>
            <checkbox label="Template" v-model="$.item.template" cols="3"></checkbox>
          </row>
        </template>
      </ressource>
    </row>
    <b-tabs v-if="!isNew">
      <b-tab title="Tasks" active>
        <list icon="icon-check" label="Tasks" type="task" :links=links with="user_id:user" cols="12" :detail="taskDetail" :query="userQuery" :tmpl="taskTmpl" trash=true>
          <template slot="header">
            <column span="3"><b>Name</b></column>
            <column span="2"><b>Assigned</b></column>
            <column span="2"><b>Due</b></column>
            <column span="1"><b>Planned</b></column>
            <column span="1"><b>Used</b></column>
          </template>
          <template scope="row">
            <text-input v-model="row.item.name" cols="3" required=true></text-input>
            <to-one v-model="row.item.user_id" type="user" display="name" cols="2"></to-one>
            <date-input v-model="row.item.due_at" cols="2"></date-input>
            <time-input v-model="row.item.planned" cols="1"></time-input>
            <time-input v-model="row.item.used" cols="1" disabled></time-input>
            <progressbar :value="row.item.progress ? row.item.progress() : 0" cols="2"></progressbar>
          </template>
        </list>
      </b-tab>
      <b-tab title="Actions" >
        <Actions :projectId="$route.params.id"></Actions>
      </b-tab>
      <b-tab title="Team" >

      </b-tab>
      <b-tab title="Documents" >

      </b-tab>
      <b-tab title="Burndown" >

      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
    import {all} from '@/components/all.js'

    export default {
        name: 'project',
        components: all,
        computed: {
            userQuery() { return 'project_id=' + this.$route.params.id },
            taskDetail() { return '/project/' + this.$route.params.id + '/task/' },
            isNew() { return this.$route.params.id=='new' },
        },
      data() {
        return {
          taskTmpl: {project_id: this.$route.params.id},
          links: {project_id: null},
        }
      },
    }
</script>
