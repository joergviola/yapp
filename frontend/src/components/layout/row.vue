<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
    export default {
      name: 'row',
        methods : {
            getValue(field) {
                return this.$parent.getValue(field)
            },
            setValue(field, value) {
                this.$parent.setValue(field, value)
            },
            addWith(arg) {
                this.$parent.addWith(arg)
            },
        }
    }
</script>
