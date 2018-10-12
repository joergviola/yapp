<template>
  <div class="animated fadeIn">
    <row v-if="company">
        <ressource icon="icon-organization" label="New Client" type="company" :id="$route.params.id" cols="12" :next="companyCreated">
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
      <ressource icon="icon-like" label="Lead: " type="project" with="client_id:company" :id="$route.params.id" cols="12" :tmpl="leadTmpl">
        <template slot="header" scope="$">
          <text-input inline="true" v-model="$.item.name" cols="6"></text-input>
        </template>
        <template scope="$">
          <row>
            <enum-input label="State" v-model="$.item.state" cols="3" enum="Lead, Ordered, Running, Closed"></enum-input>
            <date-input label="From" v-model="$.item.starts_at" cols="3"></date-input>
            <date-input label="To" v-model="$.item.ends_at" cols="3"></date-input>
            <to-one label="Client" v-model="$.item.client_id" type="company" display="name" to="/companies/company/" cols="3"></to-one>
          </row>
        </template>
      </ressource>
    </row>
    <b-tabs v-if="!isNew">
      <b-tab title="Tasks" active>
          <list icon="icon-check" label="Tasks" type="task" cols="12" :detail="taskDetail" :query="userQuery" :tmpl="taskTmpl">
            <template slot="header">
              <column span="7"><b>Name</b></column>
              <column span="2"><b>Pos-Offer</b></column>
              <column span="2"><b>Planned</b></column>
            </template>
            <template scope="row">
              <text-input v-model="row.item.name" cols="7"></text-input>
              <text-input v-model="row.item.position" cols="2"></text-input>
              <time-input v-model="row.item.planned" cols="2"></time-input>
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
                leadTmpl: {state: 'Lead'},
                taskTmpl: {project_id: this.$route.params.id},
                company: this.$route.params.id=='new',
            }
        },
        methods: {
            companyCreated(company) {
                this.company = false
                this.$nextTick(() => this.leadTmpl = {name: '', client_id: company, state: 'Lead'})
                // Im nextTick, weil Lead noch ausgeblendet ist und kein watch bekommt.
                // Warum name:''? Keine Ahnung!

            }
        }
    }
</script>
