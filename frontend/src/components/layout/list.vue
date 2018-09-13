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
  import config from '@/config.js'

    export default {
        name: 'list',
        props: ['label', 'cols', 'query', 'type', 'detail', 'with'],
        computed: {
            clazz() { return 'col-sm-' + this.cols },
            detailNew() { return this.detail + 'new' }
        },
        data() {
            return {
                items: []
            }
        },
        mounted() {
            let url = config.api + '/api/1.0/'+this.type
            let sep = '?'
            if (this.query) {
                url += sep + "q="+ encodeURIComponent(this.query)
                sep = '&'
            }
            if (this.with) {
                url += sep + 'with=' + this.with
                sep = '&'
            }

            this.$http
                .get(url, {credentials: true})
                .then(response => {
                        console.log('GET RESULT', response.body);
                        this.items = response.body;
                        this.items.forEach(item => {
                            item.url = this.detail+item.id
                        })
                    },
                    err => this.$swal( err.statusText,
                        err.body.message?err.body.message:err.body,
                        'error')

        );
        }
    }
</script>
