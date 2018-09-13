
import textinput from '../components/form/text.vue'
import textareainput from '../components/form/textarea.vue'
import dateinput from '../components/form/date.vue'
import enuminput from '../components/form/enum.vue'
import passwordinput from '../components/form/password.vue'
import toOne from '../components/form/to-one.vue'
import ressource from '../components/layout/ressource.vue'
import list from '../components/layout/list.vue'
import row from '../components/layout/row.vue'
import column from '../components/layout/col.vue'

const all = {
    'text-input': textinput,
    'textarea-input': textareainput,
    'date-input': dateinput,
    'enum-input': enuminput,
    'password-input': passwordinput,
    'to-one': toOne,
    ressource,
    list,
    row,
    column,
}

export  { all }
