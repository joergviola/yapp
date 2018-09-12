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
            <to-one label="Company" v-model="$.item.company_id" with="company_id:company" display="name" to="/companies/company/" cols="6"></to-one>
            <to-one label="Client" v-model="$.item.client_id" with="client_id:company" display="name" to="/companies/company/" cols="6"></to-one>
          </row>
          <row>
            <text-input label="From" v-model="$.item.starts_at" cols="6"></text-input>
            <text-input label="To" v-model="$.item.ends_at" cols="6"></text-input>
          </row>
        </template>
      </ressource>
    </row>
  </div>
</template>

<script>
    import {all} from '@/components/all.js'

    export default {
      name: 'project',
      components: all,
    }
</script>
