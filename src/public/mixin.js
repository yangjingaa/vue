import {
  getLocalData} from "../service/tools"
import {
  requestMethod,
  dataMethod
} from "../service/index";

export const SportMiXin = {
  data() {
    return {
      userPrower: false,
    }
  },
  created() {
    this.getPower();
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    
  }
}
