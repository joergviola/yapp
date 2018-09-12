
import textinput from '../components/form/text.vue'
import enuminput from '../components/form/enum.vue'
import passwordinput from '../components/form/password.vue'
import toOne from '../components/form/to-one.vue'
import ressource from '../components/layout/ressource.vue'
import list from '../components/layout/list.vue'
import row from '../components/layout/row.vue'
import column from '../components/layout/col.vue'

const all = {
    'text-input': textinput,
    'enum-input': enuminput,
    'password-input': passwordinput,
    'to-one': toOne,
    ressource,
    list,
    row,
    column,
}

export  { all }
