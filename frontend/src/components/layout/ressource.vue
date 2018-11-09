<template>
  <div :class="clazz">
    <div v-if="!raw" class="card">
      <div class="card-header clearfix">
        <h4 class="float-left">
          <i v-if="icon" :class="icon"></i>
          {{label}}
          <slot name="header" :item="item"></slot>
        </h4>

        <div class="float-right card-header-actions">
          <b-btn v-b-toggle.collapse1 variant="link" @click="showCollapse = !showCollapse">
            <i v-if="showCollapse"  class="icon-arrow-up"></i>
            <i v-if="!showCollapse"  class="icon-arrow-down"></i>
          </b-btn>
        </div>

      </div>
      <b-collapse id="collapse1" class="mt-2" :visible=true>
        <div id="collapse1" class="card-block container-fluid" v-on:fieldchange="fieldChange">
          <slot :item="item"></slot>
        </div>
        <div class="card-footer clearfix" id="2">
          <a class="btn btn-danger" v-if="!isNew && canDelete" v-on:click="remove()">Remove</a>
          <a class="btn btn-primary pull-right" v-if="!nosave" v-on:click="save()">{{ isNew ? 'Create' : 'Save' }}</a>
          <a class="btn btn-default pull-right" v-on:click="cancel()">Cancel</a>
        </div>
      </b-collapse>
    </div>
    <slot v-if="raw" :item="item"></slot>
  </div>
</template>

<script>
    import Vue from 'vue'
    import api from '@/api.js'

    export default {
        name: 'ressource',
        props: ['icon', 'label', 'type', 'id', 'cols', 'tmpl', 'next', 'afterLoad', 'raw', "with", 'nosave'],
        computed: {
            clazz() { return this.cols?'col-sm-' + this.cols:'' },
            isNew() { return this.id=='new' },
            canDelete() { return STATE.user.allows(this.type, 'D')}
        },
        data() {
            return {
                item: {},
                showCollapse: true
            }
        },
        mounted() {
          this.$on('save', this.save)

          if (!this.isNew) {
                api.read(this.type, this.id, this.with).then(item => this.setItem(item));
            } else {
                Vue.nextTick(() => this.setItem(api.mixin(this.type, this.tmpl || {})))
            }
        },
        watch: {
            tmpl(val) {
                console.log("ressource tmpl watch", val)
                this.setItem(api.mixin(this.type, this.tmpl || {}))
            }
        },
        methods : {
            setItem(item) {
                this.item = item
                if (this.afterLoad) this.afterLoad(item)
            },
            getValue(field) {
                console.log('GETVALUE', field, this.item[field])
                return this.item[field]
            },
            setValue(field, value) {
                this.item[field] = value
            },
            fieldChange(event) {
                console.log('field-change', event)
            },
            save() {
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
                    err => {}
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
            },

        }
    }
</script>
