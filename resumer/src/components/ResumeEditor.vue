<template>
    <div id="resumeEditor">
        <nav>
            <ol>
                <li v-for="(item,index) in resumeConfig" :class="{active: item.field === selected}" @click="selected = item.field">
                   <svg class="icon">
                        <use :xlink:href="`#icon-${item.icon}`"></use>
                   </svg>
                </li>
            </ol>
        </nav>
        <ol class="panels">
            <li v-for="item in resumeConfig" v-show="item.field === selected">
                <div v-if="item.type === 'array' ">
                    <div class="subitem" v-for="(subitem, i) in resume[item.field]">
                        <div class="resumeField" v-for="(value,key) in subitem">
                            <label >{{key}}</label>
                            <input type="text" :value="value" 
                                      @input ="changeResumeFiled(`${item.field}.${i}.${key}`, $event.target.value)" />
                        </div>
                        <el-button size="small" type="danger" class="delThis" @click="delResumeField(`${item.field}.${i}`)">删除</el-button>
                        <hr>
                    </div>
                    <el-button size="small" type="success"  @click="addResumeSubfield(item.field)">新增</el-button>
                </div>
                <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
                    <label> {{key}}</label>
                    <input type="text" :value="value" @input="changeResumeFiled( `${item.field}.${key}`, $event.target.value )" />
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
    import {Button} from 'element-ui'
    export default {
        name: 'ResumeEditor',
        components:{
            'el-button': Button,
        },
        computed: {
            selected :{
                get(){
                    return this.$store.state.selected
                },
                set(value){
                    return this.$store.commit('switchTab',value)
                }
            },
            resume (){
                return this.$store.state.resume
            },
            resumeConfig(){
                return this.$store.state.resumeConfig
            }
        },
        methods:{
            changeResumeFiled(path, value){
                this.$store.commit("updateResume",{
                    path,
                    value
                })
            },
            addResumeSubfield(field){
                this.$store.commit("addResumeSubfield",{field})
            },
            delResumeField(path){
                this.$store.commit("delResumeField",{path})
            },
            add(){
                this.$store.commit("increment")
            }
        }
    }
</script>
<style lang="less" scoped>
    #resumeEditor{
        background:#fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
        display: flex;
        flex-direction: row;
        overflow: hidden;
        > nav{
            width:80px;
            background: black;
            color:white;
            > ol{
                >li{
                    height:48px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    margin-top:16px;
                    margin-bottom:16px;
                    &.active{
                        background: white;
                        color:black;
                    }
                }
            }
        }
        > .panels{
            overflow: auto;
            flex-grow: 1;
            > li{
                padding:24px;
            }
        }
        svg.icon{
            width:24px;
            height:24px;
        }
        ol{
            list-style: none;
        }
        .resumeField{
            >label{
                display:block;
            }
            input[type=text]{
                margin:16px 0;
                -webkit-appearance: none;
                background-color: #fff;
                background-image: none;
                border-radius: 4px;
                border: 1px solid #dcdfe6;
                box-sizing: border-box;
                color: #606266;
                display: inline-block;
                font-size: inherit;
                height: 40px;
                line-height: 40px;
                outline: none;
                padding: 0 15px;
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                width: 100%;
            }
        }
        hr{
            border:none;
            border-top:1px solid #ddd;
            margin:24px 0;
        }

    }
    button.addNew {
        background-color: #f2510f;
        padding: 5px;
        border: none;
        color: white;
    }
</style>