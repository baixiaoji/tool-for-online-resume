<template>
    <div id="topbar">
        <div class="wrapper">
            <span class="logo">简历</span>
            <div class="actions">
                <div v-if="logined" class="userActions">
                    <i class="el-icon-usr"></i>
                    <span class="weclome">你好，{{user.username}}</span>
                    <el-button size="small" type="danger" round  @click.prevent="signOut">登出</el-button>
                </div>
                <div v-else class="userActions">
                    <el-button size="small" type="primary" round  @click.prevent="signUpDialogVisible = true">注册</el-button>

                    <el-button size="small" type="primary" round  @click.prevent="signInDialogVisible = true">登录</el-button>
                </div>
            </div>
        </div>
        <Dialog title="注册" width="400px" :visible="signUpDialogVisible" @close="signUpDialogVisible= false">
            <SignUpForm @success="signIn($event)" />
        </Dialog>
        <!--<MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible= false">
            <SignUpForm @success="signIn($event)" />
        </MyDialog>-->
        <Dialog title="登录" width="400px" :visible="signInDialogVisible" @close="signInDialogVisible = false">
            <SignInForm @success="signIn($event)" />
        </Dialog>
    </div>
</template>

<script>
    // import MyDialog from "./MyDialog"
    import SignUpForm from "./SignUpForm"
    import SignInForm from "./SignInForm"
    import AV from "../lib/leancloud"
    import { Button, Dialog } from 'element-ui';
    export default {
        name: 'Topbar',
        data() {
            return {
                signUpDialogVisible: false,
                signInDialogVisible: false
            }
        },
        components: {
            // MyDialog,
            SignUpForm, 
            SignInForm,
            "el-button": Button,
            Dialog,
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            logined() {
                return this.user.id
            }
        },
        methods: {
            signOut() {
                AV.User.logOut()
                this.$store.commit("removeUser")
            },
            signIn(user) {
                this.signUpDialogVisible = false
                this.signInDialogVisible = false
                this.$store.commit("setUser", user)
            }
        }
    }

</script>
<style scoped lang="less">
    #topbar {
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
        >.wrapper {
            // min-width: 1024px;
            // max-width: 1440px;
            margin: 0 auto;
            height: 64px;
        }
        >.wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 16px;
        }
        .logo {
            font-size: 24px;
            color: #000;
        }
    }
    
    .button {
        width: 72px;
        height: 32px;
        border: none;
        cursor: pointer;
        font-size: 18px;
        background: #ddd;
        color: #222;
        text-decoration: none;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        &:hover {
            box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
        }
        &.primary {
            background: #02af5f;
            color: white;
        }
    }
    
    .actions {
        display: flex;
        .userActions {
            vertical-align: middle;
            .welcome {
                margin-right: .5em;
            }
        }
    }
</style>