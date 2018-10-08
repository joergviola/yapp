<template>
    <div  :class="clazz">
        <label v-if="label" :for="field">{{label}}</label>
        <input :type="type" :name="field" :id="field" class="form-control"
               :value="dateValue" v-on:change="updateValue($event.target.value)"
               v-on:blur="$parent.$emit('blur', $event.target.value)">
    </div>
</template>

<script>

import moment from 'moment'

export default {
    name: 'date-input',
    props:['label', 'field', 'value', 'cols', 'time'],
    computed: {
        clazz() { return 'form-group col-sm-' + this.cols },
        type() { return this.time ? 'datetime-local' : 'date' },
    },
    data() {
        return {
            dateValue: this.toDate()
        }
    },
    watch: {
        value() {
            this.dateValue = this.toDate();
        }
    },
    methods: {
        // "2018-09-15 12:06:23" => "2018-09-15T12:06:23"

        toDate() {
            if (this.time) return moment(this.value).format('YYYY-MM-DDTHH:mm:ss')
            else return moment(this.value).format('YYYY-MM-DD')
        },

        updateValue: function (value) {
            // Emit the number value through the input event
            this.$emit('input', moment(value).format('YYYY-MM-DD HH:mm:ss'))
        }
    }
}
</script>
