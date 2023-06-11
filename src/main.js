import {createApp} from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'


//Auth0
import { createAuth0 } from '@auth0/auth0-vue';


const app = createApp(App)
app.use(createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
            fa,
        },
    },
}))

app.use(
  createAuth0({
    domain: "dev-1m6tpxbyozmpnfjr.us.auth0.com",
    clientId: "qrGegx8efMlRX4biaMibZo4iEEg1NtHa",
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
);

app.mount('#app')