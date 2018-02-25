<template>
    <div  :class="clazz">
        <label v-if="label" :for="field">{{label}}</label>
        <div v-if="edit" class="input-group">
            <TypeAhead ref="edit" v-model="input" :src="querySrc" :getResponse="getResponse" :onHit="onHit"></TypeAhead>
            <span class="input-group-btn">
                <button type="button" class="btn btn-primary" v-on:click="cancel()">
                    <i class="fa fa-ban"></i>
                </button>
            </span>
        </div>
        <div v-if="!edit" class="input-group">
            <router-link v-if="selected" :to="toUrl" class="form-control">
                {{ selected.name }}
            </router-link>
            <span class="input-group-btn">
                <button type="button" class="btn btn-primary" v-on:click="startEdit()">
                    <i class="fa fa-pencil"></i>
                </button>
            </span>
        </div>
    </div>
</template>

<script>

import TypeAhead from 'vue2-typeahead'

export default {
    name: 'to-one',
    props:['label', 'cols', 'to', 'with', 'value', 'display', ],
    components: {
        'TypeAhead': TypeAhead
    },
    mounted() {
        this.$parent.addWith(this.with)
        const v = this.with.split(':')
        this.field = v[0]
        this.type = v[1]
    },
    watch: {
        value: function(val) {
            console.log('updated')
            this.selected = val
            this.input = this.value?this.value[this.display]:''
        },
    },
    computed: {
        clazz() { return 'form-group col-sm-' + this.cols },
        toUrl() { return this.to + this.selected.id },
        querySrc() {
            return "http://localhost/tony/backend/public/api/1.0/"+ this.type + "?q="+this.display+"%3D:keyword" // encoded =
        }
    },
    data() {
        return {
            field: null,
            type: null,
            edit: false,
            input: null,
            data: null,
            selected: null
        }
    },
    methods: {
        // Instead of updating the value directly, this
        // method is used to format and place constraints
        // on the input's value
        updateValue: function (value) {
            // Emit the number value through the input event
            this.$emit('input', this.selected)
        },
        startEdit() {
            this.edit = true;
            this.input = this.value?this.value[this.display]:''
            this.$nextTick(() => this.$refs.edit.$el.children[0].focus())
        },
        cancel() {
            this.edit = false;
        },
        getResponse: function (response) {
            this.data = response.data
            return response.data.map(d => d.name)
        },
        onHit: function (item, vue, index) {
            vue.query = item
            this.selected = this.data[index]
            this.edit = false;
            this.updateValue(this.selected)
        },

    }
}
</script>
