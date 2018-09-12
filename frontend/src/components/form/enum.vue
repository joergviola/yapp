<template>
    <div  :class="clazz">
        <label v-if="label" :for="field">{{label}}</label>
        <select class="form-control" :name="field" :id="field" v-on:input="updateValue($event.target.value)" v-bind:value="value">
            <option v-for="option in options" >{{option}}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'enum-input',
    props:['label', 'field', 'value', 'cols', 'enum'],
    computed: {
        clazz() { return 'form-group col-sm-' + this.cols },
        options() { return this.enum.split(',')}
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
