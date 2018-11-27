<template>
    <span :class="(propose?'input-group ':'')+(inline?'':'form-group col-sm-' + this.cols)" >
        <label v-if="label" :for="field">{{label}}</label>
        <input ref="input" type="text" :name="field" :id="field" :class="inline?'inline-control ':'form-control '"
               v-bind:value="value" v-on:input="updateValue($event.target.value)"
               v-on:blur="blur($event)"
               v-on:keyup="keyUp($event)"
               @click.prevent.stop=""
               :placeholder="required?'Must be entered':''"
               :required="required">
        <b-input-group-append v-if="propose">
          <b-dropdown text="" variant="primary" right>
            <b-dropdown-item v-for="item in propose" v-on:click="updateValue(item.value)">{{item.display}}</b-dropdown-item>
          </b-dropdown>
        </b-input-group-append>

    </span>
</template>

<script>

import bubble from "@/util/bubble"

export default {
    name: 'text-input',
    props:['label', 'field', 'value', 'cols', 'inline','propose','required'],
    mounted() {
        this.triggerValidation()
    },
    methods: {
        // Instead of updating the value directly, this
        // method is used to format and place constraints
        // on the input's value
        updateValue: function (value) {
            // Emit the number value through the input event
            this.$emit('input', value)
        },
        blur: function(event) {
            const value = event.target.value;
            this.$parent.$emit('blur', value)
        },
        triggerValidation() {
            if (this.required) {
                bubble(this.$refs.input, 'validation', {
                    component: this,
                    valid: this.value!=null && this.value != "",
                })
            }
        },
        keyUp: function(event) {
            this.triggerValidation()
            if (event.keyCode==13) {
                this.$parent.$emit('returnTyped')
            }
        }
    }
}
</script>