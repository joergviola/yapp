<template>
    <a :class="clazz" v-on:click="clicked()">{{label}}</a>
</template>

<script>
export default {
    name: 'button',
    props:['label', 'type', 'align'],
    computed: {
        clazz() { return 'btn'
            + ' btn-' + (this.type || 'default')
            + (this.align ? ' pull-' + this.align : '')},
    },
    methods: {
        clicked: function () {
            this.$emit('click')
        }
    }
}
</script>
