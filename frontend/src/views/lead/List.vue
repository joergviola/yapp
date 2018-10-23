<template>
  <div class="animated fadeIn">
      <row>
        <list icon="icon-like" label="Leads" type="project" with="client_id:company" cols="12" detail="/lead/" query="state=Lead">
          <template slot="header">
            <column span="7"><b>Name</b></column>
            <column span="4"><b>Client</b></column>
          </template>
          <template scope="row">
            <text-input v-model="row.item.name" cols="7"></text-input>
            <column span="4">
              <div class="form-control">
              {{row.item.client_id.name}}
              </div>
            </column>
          </template>
        </list>
      </row>
      <row>
        <bar-chart icon="icon-like" label="Leads" type="project" cols="12" query="state=Lead" :x="monthCreated" :xaxis="xdata" :height=100>
        </bar-chart>
      </row>
    </div>
</template>

<script>
    import {all} from '@/components/all.js'
    import moment from 'moment'

    export default {
      name: 'leads',
      components: all,
      computed: {
        xdata() {
          const date = moment()
          date.subtract(1, "years")
          const result = {}
          for(var i=0; i<12; i++) {
            date.add(1, "months")
            const key = date.format('MM-YYYY')
            result[key] = 0
          }
          return result;
        }
      },
      methods: {
        monthCreated(lead) {
          console.log(lead.created_at, moment(lead.created_at).format('MM-YYYY'))
          return moment(lead.created_at).format('MM-YYYY')
        }
      }
    }
</script>
