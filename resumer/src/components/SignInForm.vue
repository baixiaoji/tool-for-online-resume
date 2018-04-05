<template>
  <div>
    <form @submit.prevent="signIn">
      <div class="row">
        <label>用户名</label>
        <el-input type="text" required v-model="formData.username" />
      </div>
      <div class="row">
        <label>密码</label>
        <el-input type="password" required v-model="formData.password" />
      </div>
      <div class="actions">
        <el-input type="submit" value="提交" />
        <!--<span>{{errorMessage}}</span>-->
      </div>
    </form>
  </div>
</template>

<script>

import AV from '../lib/leancloud'
import getErrorMessage from '../lib/getErrorMessage'
import getAVUser from '../lib/getAVUser'
import {Input} from 'element-ui'

export default {
  name: 'SignInForm',
  components:{
        'el-input': Input
    },
  data(){
    return {
      formData: {
        username: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    signIn(){
      let {username, password} = this.formData
      AV.User.logIn(username,password).then(()=> {
        // this.$store.commit('setUser', getAVUser())
        this.$emit("success",getAVUser())
      }, (error)=> {
        // this.errorMessage = getErrorMessage(error)
        this.$msg.error(getErrorMessage(error))
      }).finally((err) => {
                this.formData = {
                    username: "",
                    password: ""
                }
            });
    }
  }
}
</script>