<template>
  <div :class="clazz">
    <div class="card">
      <div class="card-header">
        <h4 class="clearfix">
          <i v-if="icon" :class="icon"></i>
          {{label}}
        </h4>
      </div>
        <div :class="'card-block mb-4 container-fluid'+(plain?'':' table')">
          <div class="row header">
            <slot name="header"></slot>
          </div>
          <div>
            <slot name="rawheader"></slot>
          </div>
          <div v-if="!detail" v-for="item in items" class="row">
            <slot :item="item"></slot>
            <div class="col-sm-1">
                <button v-if="trash" class="btn btn-link" href="#" v-on:click.prevent="remove(item)">
                  <i class="fa fa-trash"></i>
                </button>
            </div>
          </div>
          <div v-if="detail" v-for="item in items">
            <div v-on:click="jump(item)">
              <editor :ref="'row'+item.id" class="row" :type='type' :value="item" :afterSave="saved(item)"  :with="withFixed">
                <slot :item="item"></slot>
                <div class="col-sm-1">
                    <i class="link fa fa-trash" v-on:click.prevent.stop="remove(item)"></i>
                </div>
              </editor>
            </div>
          </div>
        </div>
        <div class="card-footer clearfix"  v-if="!nofooter">
          <router-link :to="detailNew" class="btn btn-primary float-right">
            Create
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
    import api from '@/api.js'
    import editor from './editor.vue'
    import Vue from 'vue'


    export default {
        name: 'list',
        props: ['icon', 'label', 'cols', 'query', 'type', 'detail', 'with', 'reload', 'orderBy', 'plain', 'trash', 'tmpl', 'links', 'nofooter'],
        components: {editor},
        computed: {
            clazz() { return 'col-sm-' + this.cols },
            detailNew() { return this.detail + 'new' },
            withFixed() { return this.with }
        },
        watch: {
            reload() {
                this.load()
            },
            links() {
                this.items.forEach(item => Object.assign(item, this.links))
            },
        },
        data() {
            return {
                items: [],
            }
        },
        mounted() {
            this.load()
            this.$on('returnTyped', this.returnTyped)
        },
        methods : {
            jump(item) {
              this.$router.push(item.transient.url)
            },
            load() {
                api.list(this.type, this.query, this.with, this.orderBy)
                    .then(response => {
                            this.items = response;
                            this.items.forEach(item => {
                              Object.assign(item, this.links)
                              item.transient = {url : this.detail+item.id}
                            })
                        }
                    );
            },
            save() {
                console.log("save")
            },
            saved(oldItem) {
              return newItem => {
                const index = this.items.indexOf(oldItem)
                Object.assign(newItem, this.links)
                newItem.transient = {url : this.detail+newItem.id}
                this.items = this.items.map(i=>i)
                this.items[index] = newItem
              }
            },
            remove(item) {
                this.$swal(
                    {
                        type: 'warning',
                        title: "Are you sure?",
                        text: "The row will be deleted. This cannot be undone",
                        showConfirmButton: true,
                        showCancelButton: true,
                    }
                ).then(value => {
                    if (value.value) {
                        api.delete(this.type, item.id)
                            .then(response => {
                                  this.load()
                                },
                                err => console.log(err)
                            );
                    }
                });
            },
            returnTyped(row) {
                if (this.tmpl) {
                    const index = this.items.indexOf(row)
                    this.tmpl.transient = {}
                    this.items.splice(index+1, 0, Object.assign({}, this.tmpl))
                    Vue.nextTick(() => this.$refs.rowundefined[0].$el.getElementsByTagName('input')[0].focus())
                }
            }
        }
    }
</script>
