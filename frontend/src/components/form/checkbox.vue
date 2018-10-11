<template>
    <div  :class="clazz">
        <label v-if="label" :for="field">{{label}}</label>
        <div>
            <c-switch classList="form-control" color="primary" :label=true variant="3d" :modelChecked="value" :id="field"
                      v-on:change="value => updateValue(value)" :value="1" :uncheckedValue="0"/>
        </div>
    </div>
</template>

<script>

import { Switch as cSwitch } from '@coreui/vue'

  export default {
    name: 'checkbox',
    props:['label', 'field', 'value', 'cols'],
    components: {
      cSwitch
    },
    computed: {
        clazz() { return 'form-group col-sm-' + this.cols },
    },
    methods: {
        // Instead of updating the value directly, this
        // method is used to format and place constraints
        // on the input's value
        updateValue: function (value) {
          console.log("CB", value)
            // Emit the number value through the input event
            this.$emit('input', value)
        }
    }
}
</script>
