import Vue from 'vue';

import {
  Field,
  Button,
  PullRefresh,
  List,
  Tabs,
  Tab,
  Tabbar,
  TabbarItem,
  Image,
  Icon,
  Cell,
  Row,
  Col,
  Form,
  NavBar,
  Search,
  Uploader,
  Toast
} from 'vant';
import 'vant/lib/index.css';

// console.log(Vant)


Vue.use(Field)
Vue.use(Button)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Tabs)
Vue.use(Tab)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Image)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(NavBar)
Vue.use(Search)
Vue.use(Uploader)


Vue.prototype.$toast = Toast

// Vue.use(Vant);
// Vue.prototype.$vantNotify = Notify
// import Vue from 'vue';
// import Vant from 'vant';
// import 'vant/lib/index.css';

// // const app = createApp();
// Vue.use(Vant);
