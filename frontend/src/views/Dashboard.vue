<template>
  <div class="animated fadeIn">
    <row>
      <ressource label="User" type="user" id="1" cols="12">
        <template scope="$">
          <text-input label="Name" v-model="$.item.name"></text-input>
          <text-input label="E-Mail" v-model="$.item.email"></text-input>
        </template>
      </ressource>
    </row>
    <row>
      <list label="Users" type="company" query="name='test'" cols="12">
        <template scope="row">
          <text-input v-model="row.item.name"></text-input>
          <text-input v-model="row.item.phone"></text-input>
        </template>
      </list>
    </row>
  </div>
</template>

<script>
    import {all} from '../components/all.js'

    export default {
      name: 'dashboard',
      components: all,
    }
</script>
