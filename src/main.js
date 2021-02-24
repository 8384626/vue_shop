import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "assets/fonts/iconfont.css";
import TreeTable from "vue-table-with-tree-grid";

Vue.config.productionTip = false;

// Vue.filter("dateFormat", function(originVal) {
//   const dt = new Date(originVal * 1000);
//   const y = dt.getFullYear();
//   const m = dt.getMonth().length === 1 ? "0" + dt.getMonth() : dt.getMonth();
//   const d = (dt.getDate() + "").padStart(2, "0");

//   const hh = (dt.getHours() + "").padStart(2, "0");
//   const mm = (dt.getMinutes() + "").padStart(2, "0");
//   const ss = (dt.getSeconds() + "").padStart(2, "0");
//   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
// });
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
