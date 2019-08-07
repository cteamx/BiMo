import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI);

Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')

