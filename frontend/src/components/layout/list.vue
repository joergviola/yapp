<template>
  <div :class="clazz">
    <div class="card">
      <div class="card-header">
        <strong>{{label}}</strong>
      </div>
      <div class="card-block">
        <div class="row">
          <slot name="header"></slot>
        </div>
        <div v-if="!detail" v-for="item in items" class="row">
          <slot :item="item"></slot>
        </div>
        <div v-if="detail" v-for="item in items">
          <router-link :to="item.url">
            <div  class="row">
                <slot :item="item"></slot>
            </div>
          </router-link>
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

    export default {
        name: 'list',
        props: ['label', 'cols', 'query', 'type', 'detail', 'with', 'reload', 'orderBy'],
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
                items: []
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
                                item.url = this.detail+item.id
                            })
                        }
                    );
            }
        }
    }
</script>
