<template>
  <div :class="clazz">
    <div class="card">
      <div class="card-header">
        <h4>
          <i v-if="icon" :class="icon"></i>
          {{label}}
        </h4>
      </div>
      <div :class="'card-block'+(plain?'':' table')">
        <div class="row header">
          <slot name="header"></slot>
        </div>
        <div v-if="!detail" v-for="item in items" class="row">
          <slot :item="item"></slot>
          <div class="col-sm-1">
            <div class="form-control">
              <a v-if="trash" href="#" v-on:click.prevent="remove(item)">
                <i class="fa fa-trash"></i>
              </a>
            </div>
          </div>
        </div>
        <div v-if="detail" v-for="item in items">
            <editor class="row" :type='type' :value="item">
              <slot :item="item"></slot>
              <div class="col-sm-1">
                <div class="form-control">
                  <router-link :to="item.transient.url">
                    <i class="fa fa-chevron-right"></i>
                  </router-link>
                  <a v-if="trash" href="#">
                    <i class="fa fa-trash"></i>
                  </a>
                </div>
              </div>
            </editor>
        </div>
      </div>
      <div class="card-footer">
        <router-link :to="detailNew"  class="pull-right">
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
        props: ['icon', 'label', 'cols', 'query', 'type', 'detail', 'with', 'reload', 'orderBy', 'plain', 'trash', 'tmpl'],
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
            this.$on('returnTyped', this.returnTyped)
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
                    this.items.splice(index+1, 0, this.tmpl)
                }
            }
        }
    }
</script>
