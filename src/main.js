import Vue from 'vue'
import App from './App.vue'
import QuestionsBlock from './components/QuestionsBlock.vue'

Vue.component('QuestionsBlock', QuestionsBlock)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
