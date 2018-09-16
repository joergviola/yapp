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
        props: ['type','value'],
        mounted() {
            this.$on('blur', this.save)
        },
        methods: {
            save() {
                const request = this.value.id
                    ? api.update(this.type, this.value)
                    : api.create(this.type, this.value)

                request.then(response => {
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
