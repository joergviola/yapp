<template>
  <div class="animated fadeIn">
    <row>
      <ressource icon="icon-control-play" label="Project" type="project" with="client_id:company"  :id="$route.params.id" cols="12">
        <template slot="header" scope="$">
          <text-input inline="true" v-model="$.item.name" cols="6"></text-input>
        </template>
        <template scope="$">
          <row>
            <textarea-input v-model="$.item.description" cols="12"></textarea-input>
          </row>
          <row>
            <enum-input label="State" v-model="$.item.state" cols="3" enum="Lead, Ordered, Running, Closed"></enum-input>
            <date-input label="From" v-model="$.item.starts_at" cols="3"></date-input>
            <date-input label="To" v-model="$.item.ends_at" cols="3"></date-input>
            <to-one label="Client" v-model="$.item.client_id" type="company" display="name" to="/companies/company/" cols="3"></to-one>
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
    <row v-if="!isNew">
      <list icon="icon-check" label="Tasks" type="task" with="user_id:user" cols="12" :detail="taskDetail" :query="userQuery">
        <template slot="header">
          <column span="3"><b>Name</b></column>
          <column span="2"><b>Assigned</b></column>
          <column span="2"><b>Due</b></column>
          <column span="1"><b>Planned</b></column>
          <column span="1"><b>Used</b></column>
        </template>
        <template scope="row">
          <text-input v-model="row.item.name" cols="3"></text-input>
          <to-one v-model="row.item.user_id" type="user" display="name" cols="2"></to-one>
          <date-input v-model="row.item.due_at" cols="2"></date-input>
          <time-input v-model="row.item.planned" cols="1"></time-input>
          <time-input v-model="row.item.used" cols="1" disabled></time-input>
          <progressbar :value="row.item.progress ? row.item.progress() : 0" cols="2"></progressbar>
        </template>
      </list>
    </row>
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
    }
</script>
