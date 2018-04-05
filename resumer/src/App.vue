<template>
  <div>
    <el-container class=page>
      <el-header>
        <Topbar/>
      </el-header>
      <el-main>
        <ResumeEditor />
        <ResumePreview />
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import "normalize.css/normalize.css"
  import './assets/reset.css'

  import Topbar from "./components/Topbar"
  import ResumeEditor from "./components/ResumeEditor"
  import ResumePreview from "./components/ResumePreview"
  import icons from './assets/icons'
  import {Container, Header, Main} from 'element-ui'
  import store from './store/index'
  import AV from "./lib/leancloud"
  import getAVUser from "./lib/getAVUser"

// <el-container>
//   <el-header>Header</el-header>
//   <el-main>Main</el-main>
//   <el-footer>Footer</el-footer>
// </el-container>
  export default {
    name: 'app',
    store,
    components: { Topbar, ResumeEditor, ResumePreview,
      'el-container': Container,
      'el-header': Header,
      'el-main': Main
    },
    created() {
      document.body.insertAdjacentHTML("afterbegin", icons)

      let state = localStorage.getItem("state")
      if (state) {
        state = JSON.parse(state)
      } 
      this.$store.commit("initState", state)
      this.$store.commit("setUser",getAVUser())
    }
  }

</script>

<style lang="less">
  .page {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    height: 100vh;
    min-width: 1024px!important;
    // display: flex;
    // flex-direction: column;
    background: #eaebec;
    main {
      flex-grow: 1;
    }
    main {
      // min-width: 1024px;
      max-width: 1440px;
      margin-top: 16px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      width: 100%;
      align-self: center;
    }
  }
  
  #resumeEditor {
    min-width: 35%;
    background: #444;
  }
  
  #resumePreview {
    flex-grow: 1;
    margin-left: 16px;
    background: #777;
  }
  
  svg.icon {
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: -0.1em;
    font-size: 16px;
  }
</style>