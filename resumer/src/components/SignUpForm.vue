<template>
    <div class="signUp">
        <form @submit.prevent="signUp">
            <div class="row">
                <label>用户名</label>
                <el-input type="text" v-model="formData.username" required />
            </div>
            <div class="row">
                <label>密码</label>
                <el-input type="password" v-model="formData.password" required />
            </div>
            <div class="action mt-10">
                <el-input type="submit" value="提交" />
            </div>
        </form>
    </div>
</template>
<script>
import AV from "../lib/leancloud"
import getErrorMessage from "../lib/getErrorMessage"
import getAVUser from "../lib/getAVUser"
import {Input} from 'element-ui'
export default {
    name: "SignUpForm",
    components:{
        'el-input': Input
    },
    data(){
        return {
            formData: {
                username: "",
                password: ""
            },
            errorMessage: ""
        }
    },
    created(){

    },
    methods: {
        signUp(){
            let {username,password} = this.formData
            var user = new AV.User();

            user.setUsername(username)
            user.setPassword(password)
            
            user.signUp().then(() => {
                this.$emit("success",getAVUser())
            }, (err) => {
                
                // this.errorMessage = getErrorMessage(err.code)
                this.$msg.error(getErrorMessage(err))
            }).finally((err) => {
                this.formData = {
                    username: "",
                    password: ""
                }
            })
        }
    }
}
</script>
<style lang="less">
.signUp{
    margin-top: -10px;
}
.row{
    margin-bottom: 8px;
    label{
        display: block;
        margin-bottom: 5px;
    }
}
</style>