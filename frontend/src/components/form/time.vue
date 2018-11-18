<template>
    <div  :class="clazz">
        <label v-if="label" :for="field">{{label}}</label>
        <input type="text" :name="field" :id="field" class="form-control" :disabled="disabled"
               :value="timeValue" v-on:blur="updateValue($event.target.value)" @click.prevent.stop="">
    </div>
</template>

<script>
export default {
    name: 'time-input',
    props:['label', 'field', 'value', 'cols', 'time', 'disabled'],
    computed: {
        clazz() { return 'form-group col-sm-' + this.cols },
    },
    data() {
        return {
            timeValue: this.toTime()
        }
    },
    watch: {
        value() {
            this.timeValue = this.toTime();
        }
    },
    methods: {
        toTime() {
            if (!this.value) return "";
            let m = Math.floor(this.value/60)
            let h = Math.floor(m/60)
            m = m % 60;
            return f(h) + ":" + f(m)

            function f(t) {
                return (t<10 ? "0" : "") + t
            }
        },
        updateValue: function (value) {
            const values = value.split(':');
            while (values.length<3) values.push(0)
            let time = 0;
            values.forEach(c => time = 60*time+(parseInt(c)||0));
            console.log(value, values, time)
            this.$emit('input', time)
            this.$parent.$emit('blur', time)
        }
    }
}
</script>
