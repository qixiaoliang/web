import Vue from 'vue'
import App from './App'
import './base.scss';
import '../src/assets/svgxuse';
import VueTouch from 'vue2-touch';

Vue.config.productionTip = false
Vue.use( VueTouch );

window.alarmBell = new Vue();

/* eslint-disable no-new */
new Vue( {
    el: '#app',
    render: h => h( App )
} )