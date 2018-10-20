<template>
    <div  :class="clazz">
        <label v-if="label" >{{label}}</label>
        <div v-if="edit" class="input-group">
            <TypeAhead style="width:1%; flex: 1 1 auto" ref="edit" v-model="input" src=":keyword" :getResponse="getResponse" :onHit="onHit" :minChars=1 :fetch="fetch"></TypeAhead>
            <span class="input-group-append">
                <button type="button" class="btn btn-secondary" v-on:click="cancel()">
                    <i class="fa fa-ban"></i>
                </button>
            </span>
        </div>
        <div v-if="!edit" class="input-group">
            <router-link v-if="selected && toUrl" :to="toUrl" class="form-control">
                {{ selected.name }}
            </router-link>
            <span v-if="!toUrl"class="form-control">
                {{ selected.name }}
            </span>
            <span class="input-group-append">
                <button type="button" class="btn btn-secondary" v-on:click="startEdit()">
                    <i class="fa fa-pencil"></i>
                </button>
            </span>
        </div>
    </div>
</template>

<script>

import TypeAhead from 'vue2-typeahead'
import api from '@/api.js'

export default {
    name: 'to-one',
    props:['label', 'cols', 'to', 'type', 'value', 'display'],
    components: {
        'TypeAhead': TypeAhead
    },
    watch: {
        value: function(val) {
            this.selected = val
            this.edit = val==null
            this.input = this.value?this.value[this.display]:''
        },
    },
    computed: {
        clazz() { return 'form-group col-sm-' + this.cols },
        toUrl() { return this.to + this.selected.id },
    },
    data() {
        return {
            edit: this.value==null,
            input: this.value?this.value[this.display]:'',
            data: null,
            selected: this.value
        }
    },
    methods: {
        // Instead of updating the value directly, this
        // method is used to format and place constraints
        // on the input's value
        updateValue: function (value) {
            // Emit the number value through the input event
            this.$emit('input', this.selected)
            this.$parent.$emit('blur', this.selected)
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
            this.data = response
            return response.map(d => d.name)
        },
        onHit: function (item, vue, index) {
            vue.query = item
            this.selected = this.data[index]
            this.edit = false;
            this.updateValue(this.selected)
        },
        fetch(url) {
            console.log("JUHUU")
            return api.list(this.type, this.display+"~"+url, null)
        }
    }
}
</script>
