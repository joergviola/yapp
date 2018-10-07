<template>
  <div :class="clazz">
    <slot></slot>
  </div>
</template>

<script>
    export default {
      name: 'column',
        props: ['span'],
        computed: {
            clazz() { return 'col-sm-' + this.span }
        },
    }

</script>
