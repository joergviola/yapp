<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
    import Vue from 'vue'
    import api from '@/api.js'

    export default {
        name: 'editor',
        props: ['type','value','afterSave','with'],
        mounted() {
            this.$on('blur', this.save)
            this.$on('returnTyped', () => this.$parent.$emit('returnTyped', this.value))
        },
        methods: {
            save() {
                const request = this.value.id
                    ? api.update(this.type, this.value, this.with)
                    : api.create(this.type, this.value, this.with)

                request.then(response => {
                      if (this.afterSave) this.afterSave(response)
                    },
                    err => {
                        this.$swal(err.statusText,
                            err.body.message ? err.body.message : err.body,
                            'error');
                        console.log(err)
                    }
                );
            },
        }

    }
</script>
