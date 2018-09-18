<template>
  <div class="animated fadeIn">
    <row v-if="isNew">
        <ressource label="Company" type="company" :id="$route.params.id" cols="12" :next="companyCreated">
          <template scope="$">
            <row>
              <text-input label="Name" v-model="$.item.name" cols="6"></text-input>
              <text-input label="E-Mail" v-model="$.item.email" cols="6"></text-input>
            </row>
            <row>
              <text-input label="Website" v-model="$.item.website" cols="6"></text-input>
              <text-input label="Telefone" v-model="$.item.telefone" cols="6"></text-input>
            </row>
          </template>
        </ressource>
    </row>
    <row>
      <ressource label="Lead" type="project" :id="$route.params.id" cols="12" :tmpl="taskTmpl">
        <template scope="$">
          <row>
            <text-input label="Name" v-model="$.item.name" cols="6"></text-input>
            <enum-input label="State" v-model="$.item.state" cols="6" enum="Lead, Ordered, Running, Closed"></enum-input>
          </row>
          <row>
            <text-input label="From" v-model="$.item.starts_at" cols="6"></text-input>
            <to-one label="Client" v-model="$.item.client_id" with="client_id:company" display="name" to="/companies/company/" cols="6"></to-one>
          </row>
          <row>
            <text-input label="To" v-model="$.item.ends_at" cols="6"></text-input>
          </row>
        </template>
      </ressource>
    </row>
    <row v-if="!isNew">
      <list label="Tasks" type="task" cols="12" :detail="taskDetail" :query="userQuery">
        <template slot="header">
          <column span="4"><b>name</b></column>
          <column span="4"><b>Due</b></column>
        </template>
        <template scope="row">
          <column span="4">{{row.item.name}}</column>
          <column span="4">{{row.item.due_at}}</column>
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
        data() {
            return {
                taskTmpl: {}
            }
        },
        methods: {
            companyCreated(company) {
                this.taskTmpl = {client_id: company}
            }
        }
    }
</script>
