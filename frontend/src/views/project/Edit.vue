<template>
  <div class="animated fadeIn">
    <row>
      <ressource label="Project" type="project" :id="$route.params.id" cols="12">
        <template scope="$">
          <row>
            <text-input label="Name" v-model="$.item.name" cols="6"></text-input>
            <enum-input label="State" v-model="$.item.state" cols="6" enum="Lead, Ordered, Running, Closed"></enum-input>
          </row>
          <row>
            <date-input label="From" v-model="$.item.starts_at" cols="3"></date-input>
            <date-input label="To" v-model="$.item.ends_at" cols="3"></date-input>
            <to-one label="Client" v-model="$.item.client_id" with="client_id:company" display="name" to="/companies/company/" cols="6"></to-one>
          </row>
        </template>
      </ressource>
    </row>
    <row v-if="!isNew">
      <list label="Tasks" type="task" cols="12" :detail="taskDetail" :query="userQuery">
        <template slot="header">
          <column span="5"><b>Name</b></column>
          <column span="2"><b>Due</b></column>
          <column span="1"><b>Planned</b></column>
          <column span="1"><b>Used</b></column>
        </template>
        <template scope="row">
          <text-input v-model="row.item.name" cols="5"></text-input>
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
