<template>
  <div :class="clazz">
    <div class="card">
      <div class="card-header">
        <strong>{{label}}</strong>
      </div>
      <div :class="'card-block'+(plain?'':' table')">
        <div class="row header">
          <slot name="header"></slot>
        </div>
        <div v-if="!detail" v-for="item in items" class="row">
          <slot :item="item"></slot>
        </div>
        <div v-if="detail" v-for="item in items">
            <editor class="row" :type='type' :value="item">
              <slot :item="item"></slot>
              <div class="col-sm-1">
                <div class="form-control">
                  <router-link :to="item.transient.url">
                    <i class="fa fa-chevron-right"></i>
                  </router-link>
                </div>
              </div>
            </editor>
        </div>
      </div>
      <div class="card-footer">
        <router-link :to="detailNew"  class="btn btn-default pull-right">
          Create
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
    import api from '@/api.js'
    import editor from './editor.vue'

    export default {
        name: 'list',
        props: ['label', 'cols', 'query', 'type', 'detail', 'with', 'reload', 'orderBy', 'plain'],
        components: {editor},
        computed: {
            clazz() { return 'col-sm-' + this.cols },
            detailNew() { return this.detail + 'new' }
        },
        watch: {
            reload() {
                this.load()
                console.log("reload")

            }
        },
        data() {
            return {
                items: [],
            }
        },
        mounted() {
            this.load()
        },
        methods : {
            load() {
                api.list(this.type, this.query, this.with, this.orderBy)
                    .then(response => {
                            this.items = response;
                            this.items.forEach(item => {
                                item.transient = {url : this.detail+item.id}
                            })
                        }
                    );
            },
            save() {
                console.log("save")
            }
        }
    }
</script>
