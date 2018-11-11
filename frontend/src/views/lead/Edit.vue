<template>
  <div class="animated fadeIn">
    <row v-if="organisation">
        <ressource icon="icon-organization" label="New Client" type="organisation" :id="$route.params.id" cols="12" :next="organisationCreated">
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
    <row v-if="organisation">
      <column span="12">
        <link-button type="primary" align="right" label="Use existing client" v-on:click="organisationCreated"></link-button>
      </column>
    </row>
    <row v-if="!organisation">
      <ressource icon="icon-like" label="Lead: " type="project" with="client_id:organisation" :id="$route.params.id" cols="12" :tmpl="leadTmpl" :afterLoad="project => this.links={project_id: project}">
        <template slot="header" scope="$">
          <text-input inline="true" v-model="$.item.name" cols="6"></text-input>
        </template>
        <template scope="$">
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
          <list icon="icon-check" label="Tasks" type="task" cols="12" :links=links  :detail="taskDetail" :query="userQuery" :tmpl="taskTmpl" trash=true>
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
                organisation: this.$route.params.id=='new',
                links: {project_id: null},
            }
        },
        methods: {
            organisationCreated(organisation) {
                this.organisation = false
                this.$nextTick(() => this.leadTmpl = {name: '', client_id: organisation, state: 'Lead'})
                // Im nextTick, weil Lead noch ausgeblendet ist und kein watch bekommt.
                // Warum name:''? Keine Ahnung!

            }
        }
    }
</script>
