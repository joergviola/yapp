<template>
    <div  :class="clazz">
        <label v-if="label" for="">{{label}}</label>
        <div class="w-100 mb-2 progress" style="height: 35px">
            <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="52" class="progress-bar" :style="style">{{value}}%</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'progress',
    props:['label', 'value', 'cols'],
    computed: {
        clazz() { return 'form-group col-sm-' + this.cols },
        style() { if (this.value) return 'height: 35px; width: '+this.value+'%; padding-top: 10px;'}
    },
    methods: {
    }
}
</script>
