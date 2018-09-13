<template>
    <div  :class="clazz">
        <label v-if="label" :for="field">{{label}}</label>
        <textarea :name="field" :id="field" class="form-control" rows="5"
                 v-bind:value="value" v-on:input="updateValue($event.target.value)"></textarea>
    </div>
</template>

<script>
export default {
    name: 'textarea-input',
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
