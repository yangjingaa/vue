<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <p>{{name}}</p>
    <p>{{addName}}</p>
    <button type="button" @click="add">加</button>
    <div id="demo">
      <button v-on:click="show = !show">
        Toggle
      </button>
      <transition name="fade">
        <p v-if="show">hello</p>
      </transition>
    </div>
    <input type="text" placeholder="names" v-focus>
    <div class="stylus names">
      <p>我是一个兵</p>
      <h1>{{get_name}}</h1>
      <h1>{{get_name_array}}</h1>
    </div>
    <button type="button" @click="getChild">按钮</button>
    <input type="text" v-model="get_name" placeholder="input">
    <p>{{localeUpper | toUpperCase}}</p>
    <components is="child" ref="child"></components>
    <button type="button" @click="addState">我是一个修改</button>
    <button type="button">我是一个dev</button>
  </div>
</template>

<script>
import child from "components/login"
import {mapGetters,mapMutations,mapActions} from "vuex"
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        name: 1,
        show: false,
        localeUpper:"joney"
      }
    },
    mounted() {
      this.show = true;
      window.onscroll=this.throttle(function () {
        console.log("防抖")
      },300);
    },
    computed: {
      addName: function () {
        let that = this;
        let a = () => this.name;
        return a();
      },
      ...mapGetters(['get_name','get_name_object',"get_name_array"])
    },
    filters:{
      toUpperCase:function (value) {
        if (!value){
          return " "
        }
        else if(value.length<2){
          return value.toLocaleUpperCase()
        } else {
          return value.charAt(0).toLocaleUpperCase()+value.slice(1)
        }
      }
    },
    methods: {
      ...mapMutations(["set_name"]),
      ...mapActions(["setNameCount"]),
      addState(){
        this.setNameCount(10)
        let a = this.get_name;
        a++;
        console.log(a);
        this.set_name(a);
      },
      add: function () {
        this.name++
      },
      getChild(){
        this.$refs.child.childInfo();
      },
      throttle:function (fun, time) {
        var timer=null;
        return function () {
          clearTimeout(timer);
          timer=setTimeout(()=> fun(),time)
        }
      }
    },
    components:{
      child:child
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import "./stylus.styl"
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 3s;
  }

  .fade-enter /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translate(-50px, 0);
  }

  .fade-leave-to {
    transform: translate(50px, 0);
    opacity: 0;
  }


</style>
