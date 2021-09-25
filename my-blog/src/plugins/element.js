import Vue from 'vue';
import {
  Button,
  Card,
  Container,
  Input,
  Radio,
  RadioGroup,
  Row,
  Header,
  Col,
  Main,
  Aside,
  Dialog,
  Image,
  Avatar,
  Form,
  FormItem,
  Upload,
  Menu,
  MenuItem,
  Notification,
  Message,
  // Notify
} from 'element-ui';


Vue.use(Button)
Vue.use(Card)
Vue.use(Container)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Row)
Vue.use(Header)
Vue.use(Col)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Dialog)
Vue.use(Image)
Vue.use(Avatar)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Upload)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Notification)
// Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification