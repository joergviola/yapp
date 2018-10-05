<template>
  <div class="animated fadeIn">
    <row v-if="company">
        <ressource label="New Client" type="company" :id="$route.params.id" cols="12" :next="companyCreated">
          <template scope="client">
            <row>
              <text-input label="Name" v-model="client.item.name" cols="6"></text-input>
              <text-input label="E-Mail" v-model="client.item.email" cols="6"></text-input>
            </row>
            <row>
              <text-input label="Website" v-model="client.item.website" cols="6"></text-input>
              <text-input label="Telefone" v-model="client.item.telefone" cols="6"></text-input>
            </row>
          </template>
        </ressource>
    </row>
    <row v-if="company">
      <column span="12">
        <link-button type="primary" align="right" label="Use existing client" v-on:click="companyCreated"></link-button>
      </column>
    </row>
    <row v-if="!company">
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
          <column span="7"><b>Name</b></column>
          <column span="2"><b>Due</b></column>
          <column span="2"><b>Planned</b></column>
        </template>
        <template scope="row">
          <text-input v-model="row.item.name" cols="7"></text-input>
          <date-input v-model="row.item.due_at" cols="2"></date-input>
          <time-input v-model="row.item.planned" cols="2"></time-input>
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
                taskTmpl: {state: 'Lead'},
                company: this.$route.params.id=='new',
            }
        },
        methods: {
            companyCreated(company) {
                console.log('CALLED', company)
                this.company = false
                this.$nextTick(() => this.taskTmpl = {name: '', client_id: company, state: 'Lead'})
                // Im nextTick, weil Lead noch ausgeblendet ist und kein watch bekommt.
                // Warum name:''? Keine Ahnung!

            }
        }
    }
</script>
