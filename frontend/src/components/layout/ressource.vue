<template>
  <div :class="clazz">
    <div class="card">
      <div class="card-header">
        <strong>{{label}}</strong>
      </div>
      <div class="card-block" v-on:fieldchange="fieldChange" v-on:with="addWith" id="1">
        <slot :item="item"></slot>
      </div>
      <div class="card-footer" id="2">
        <a class="btn btn-danger" v-if="!isNew" v-on:click="remove()">Remove</a>
        <a class="btn btn-primary pull-right" v-on:click="save()">{{ isNew ? 'Create' : 'Save' }}</a>
        <a class="btn btn-default pull-right" v-on:click="cancel()">Cancel</a>
      </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import api from '@/api.js'

    export default {
        name: 'ressource',
        props: ['label', 'type', 'id', 'cols', 'tmpl', 'next'],
        computed: {
            clazz() { return 'col-sm-' + this.cols },
            isNew() { return this.id=='new' }
        },
        data() {
            return {
                item: {},
                with: [],
            }
        },
        mounted() {
            if (!this.isNew) {
                api.read(this.type, this.id, this.with)
                    .then(response => {
                            console.log('GET RESULT', response.body);
                            this.item = response.body;
                        },
                        err => {
                            this.$swal( err.statusText,
                                err.body.message,
                                'error');
                            console.log(err)
                        }
                    );
            } else {
                Vue.nextTick(() => this.item = this.tmpl || {})
            }
        },
        methods : {
            getValue(field) {
                console.log('GETVALUE', field, this.item[field])
                return this.item[field]
            },
            setValue(field, value) {
                this.item[field] = value
            },
            addWith: function(arg) {
                const [field, type] = arg.split(':')
                this.with.push({field,type})
            },
            fieldChange(event) {
                console.log('field-change', event)
            },
            save() {
                if (this.with) {
                    this.with.forEach(w =>{
                        if (this.item[w.field] && typeof this.item[w.field]==='object') {
                            this.item[w.field] = this.item[w.field].id
                        }
                    }, this )
                }
                const request = this.isNew
                    ? api.create(this.type, this.item)
                    : api.update(this.type, this.item)

                request.then(response => {
                        if (this.next) {
                            this.next(response)
                        } else {
                            this.$router.go(-1)
                        }
                    },
                    err => {
                        this.$swal(err.statusText,
                            err.body.message ? err.body.message : err.body,
                            'error');
                        console.log(err)
                    }
                );
            },
            cancel() {
                this.$router.go(-1)
            },
            remove() {
                this.$swal(// "Are you sure?",
                    //this.label + "will be deleted. This cannot be undone",
                    {
                        type: 'warning',
                        title: "Are you sure?",
                        text: this.label + " will be deleted. This cannot be undone",
                        showConfirmButton: true,
                        showCancelButton: true,
                    }
                ).then(value => {
                  if (value.value) {
                      api.delete(this.type, this.id)
                          .then(response => {
                                  this.$router.go(-1)
                              },
                              err => console.log(err)
                          );
                  }
                });
            }
        }
    }
</script>
