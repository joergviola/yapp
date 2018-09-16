
import textinput from '../components/form/text.vue'
import textareainput from '../components/form/textarea.vue'
import dateinput from '../components/form/date.vue'
import timeinput from '../components/form/time.vue'
import enuminput from '../components/form/enum.vue'
import passwordinput from '../components/form/password.vue'
import progress from '../components/form/progress.vue'
import toOne from '../components/form/to-one.vue'
import ressource from '../components/layout/ressource.vue'
import list from '../components/layout/list.vue'
import row from '../components/layout/row.vue'
import column from '../components/layout/col.vue'

const all = {
    'text-input': textinput,
    'textarea-input': textareainput,
    'date-input': dateinput,
    'time-input': timeinput,
    'enum-input': enuminput,
    'password-input': passwordinput,
    'progressbar': progress,
    'to-one': toOne,
    ressource,
    list,
    row,
    column,
}

export  { all }
