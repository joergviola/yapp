<template>
  <div :class="clazz">
    <div class="card">
      <div class="card-header">
        <strong>{{label}}</strong>
      </div>
      <div class="card-block" v-on:fieldchange="fieldChange" v-on:with="addWith">
        <slot :item="item"></slot>
      </div>
      <div class="card-footer">
        <a class="btn btn-danger" v-if="!isNew" v-on:click="remove()">Remove</a>
        <a class="btn btn-primary pull-right" v-on:click="save()">{{ isNew ? 'Create' : 'Save' }}</a>
        <a class="btn btn-default pull-right" v-on:click="cancel()">Cancel</a>
      </div>
    </div>
  </div>
</template>

<script>
    import config from '@/config.js'
    export default {
        name: 'ressource',
        props: ['label', 'type', 'id', 'cols'],
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
                let  url = config.api + '/api/1.0/'+this.type+'/' + this.id
                if (this.with.length>0) {
                    url += '?with=' + this.with.map(w => w.field+':'+w.type).join(',')
                }
                this.$http
                    .get(url)
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
                        if (this.item[w.field]) {
                            this.item[w.field] = this.item[w.field].id
                        }
                    }, this )
                }
                const request = this.isNew
                    ? this.$http.post(config.api + '/api/1.0/'+this.type, this.item)
                    : this.$http.put(config.api + '/api/1.0/'+this.type, this.item)

                request.then(response => {
                            this.$router.go(-1)
                        },
                        err => {
                            this.$swal( err.statusText,
                                err.body.message?err.body.message:err.body,
                                'error');
                            console.log(err)
                        }
                    );
            },
            cancel() {
                this.$router.go(-1)
            },
            remove() {
                this.$http
                    .delete(config.api + '/api/1.0/'+this.type+'/' + this.id)
                    .then(response => {
                            this.$router.go(-1)
                        },
                        err => console.log(err)
                    );
            }
        }
    }
</script>
