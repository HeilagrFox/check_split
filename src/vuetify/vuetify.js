import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const icons = {
  defaultSet: 'mdi',
  aliases,
  sets: {
    mdi,
  }
}
const vuetify = createVuetify({
    components,
    directives,
    icons,
  })

export default vuetify