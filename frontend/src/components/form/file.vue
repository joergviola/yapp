<template>
    <div  :class="clazz">
        <label v-if="label" :for="field">{{label}}</label>

        <div class="dropbox">
            <input type="file" :multiple="multiple" name="file" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                   accept="image/*" class="input-file">
            <p v-if="files.length==0">
                Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="files.length>0">
                <span v-if="image" v-for="file in files"><img class="preview" :src="src(file)"><i class="icon-trash" @onclick="remove(file)"></i></span>
                <span v-if="!image" v-for="file in files">{{file.name}}</span>
            </p>
        </div>

    </div>
</template>

<script>

import api from '@/api.js'

// Largely inspired from: https://scotch.io/tutorials/how-to-handle-file-uploads-in-vue-2
export default {
    name: 'file-input',
    props:['label', 'field', 'value', 'cols', 'multiple', 'image', 'url'],
    computed: {
        clazz() { return 'form-group col-sm-' + this.cols },
    },
    data() {
        return {
            files: [],
            uploadError: null,
            currentStatus: null,
            uploadFieldName: 'photos'
        }
    },
    mounted() {
        this.reset();
    },
    watch: {
        value() {
            this.files = this.value.split(',').map(name => ({name:name}))
        }
    },
    methods: {
        src(file) {
            if (file.content) return file.content
            return this.url(file.name)
        },
        reset() {
            // reset form to initial state
            this.files = [];
            this.uploadError = null;
        },
        filesChange(fieldName, fileList) {
            // handle file changes
            const formData = new FormData();

            if (!fileList.length) return;

            if (this.multiple) {
                for (var i = 0, f; f = fileList[i]; i++) {
                    this.loadFile(f)
                }
            } else {
                this.files = []
                this.loadFile(fileList[0])
            }
        },
        loadFile(file) {
            var reader = new FileReader();
            const target = this
            reader.onload = (function(theFile) {
                return function(e) {
                    target.files.push({
                        name: file.name,
                        content: e.target.result
                    })
                    target.updateValue()
                };
            })(file);

            // Bilder als Data URL auslesen.
            reader.readAsDataURL(file);
        },
        remove(file) {
          this.files = this.files.filter(f => f!=file)
        },
        // Instead of updating the value directly, this
        // method is used to format and place constraints
        // on the input's value
        updateValue: function () {
            // Emit the number value through the input event
            this.$emit('input', {
                type: 'file',
                files: this.files
            })
        }
    }
}
</script>

<style lang="scss">
    .dropbox {
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        background: lightcyan;
        color: dimgray;
        padding: 10px 10px;
        //min-height: 200px; /* minimum height */
        position: relative;
        cursor: pointer;
    }

    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 100%;
        height: 200px;
        position: absolute;
        cursor: pointer;
    }

    img.preview {
        max-height: 100%;
        max-width: 100%;
    }

    .dropbox:hover {
        background: lightblue; /* when mouse over to the drop zone, change color */
    }

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 50px 0;
    }
</style>