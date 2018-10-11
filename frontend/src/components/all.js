
import textinput from '../components/form/text.vue'
import textareainput from '../components/form/textarea.vue'
import dateinput from '../components/form/date.vue'
import timeinput from '../components/form/time.vue'
import enuminput from '../components/form/enum.vue'
import checkbox from '../components/form/checkbox.vue'
import passwordinput from '../components/form/password.vue'
import progress from '../components/form/progress.vue'
import toOne from '../components/form/to-one.vue'
import button from '../components/form/button.vue'
import ressource from '../components/layout/ressource.vue'
import editor from '../components/layout/editor.vue'
import list from '../components/layout/list.vue'
import row from '../components/layout/row.vue'
import column from '../components/layout/col.vue'

const all = {
    'text-input': textinput,
    'textarea-input': textareainput,
    'date-input': dateinput,
    'time-input': timeinput,
    'enum-input': enuminput,
    'checkbox': checkbox,
    'password-input': passwordinput,
    'progressbar': progress,
    'link-button': button,
    'to-one': toOne,
    ressource,
    list,
    editor,
    row,
    column,
}

export  { all }
