import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
 faMoon,faSun,faBars, faAddressBook, faEnvelope, faPerson, faUserTie, faCog, faFolder, faAt, faCheckCircle, faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
library.add(faMoon,faSun,faBars,faAddressBook,faEnvelope,faPerson,faUserTie,faFolder,faCog,faGithub,faLinkedin,faTwitter,faEnvelope,faAt,faCheckCircle,faExclamationCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false
 
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
