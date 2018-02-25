<template>
    <div  :class="clazz">
        <label v-if="label" :for="field">{{label}}</label>
        <input type="text" :name="field" :id="field" class="form-control"
               v-bind:value="value" v-on:input="updateValue($event.target.value)">
    </div>
</template>

<script>
export default {
    name: 'text-input',
    props:['label', 'field', 'value', 'cols'],
    computed: {
        clazz() { return 'form-group col-sm-' + this.cols }
    },
    methods: {
        // Instead of updating the value directly, this
        // method is used to format and place constraints
        // on the input's value
        updateValue: function (value) {
            // Emit the number value through the input event
            this.$emit('input', value)
        }
    }
}
</script>
