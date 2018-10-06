<template>
    <span :class="inline?'':'form-group col-sm-' + this.cols">
        <label v-if="label" :for="field">{{label}}</label>
        <input type="text" :name="field" :id="field" :class="inline?'inline-control ':'form-control '"
               v-bind:value="value" v-on:input="updateValue($event.target.value)"
               v-on:blur="$parent.$emit('blur', $event.target.value)"
               v-on:keyup="keyUp($event)">
    </span>
</template>

<script>
export default {
    name: 'text-input',
    props:['label', 'field', 'value', 'cols', 'inline'],
    methods: {
        // Instead of updating the value directly, this
        // method is used to format and place constraints
        // on the input's value
        updateValue: function (value) {
            // Emit the number value through the input event
            this.$emit('input', value)
        },
        keyUp: function(event) {
            if (event.keyCode==13) {
                this.$parent.$emit('returnTyped')
            }
        }
    }
}
</script>
