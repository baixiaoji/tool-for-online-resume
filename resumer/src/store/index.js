import Vue from 'vue'
import Vuex from 'vuex'
import objectPath from "object-path"
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        selected:'profile',
        resume:{
            config:[
                {field: "profile",icon: "id"},
                {field: "workHistory",icon: "work"},
                {field: "education",icon: "book"},
                {field: "projects",icon: "heart"},
                {field: "awards",icon: "cup"},
                {field: "contacts",icon: "phone"},
            ],
            profile:{
                name:'baixiaoji',
                city:'大杭州',
                title:'哈哈哈哈哈',
                birthday:'1996-08-28'
            },
            workHistory:[
                {
                    company: 'XIN', content: '我的第二份工作是'
                },
                {
                    company: 'FF', content: '我的第一份工作是'
                },
            ],
            education:[
                {school: '警官学院', content: '本科'},
                {school: '渔业', content: '文字'},
            ],
            projects:[
                {name: 'project A', content: '文字'},
                {name: 'project B', content: '文字'},
            ],
            awards:[
                {name: '三好学生', content: '连续十年'},
                {name: '奖学金'},
            ],
            contacts:[
                {contact: 'phone', content: '187657234'},
                {contact: 'qq', content: '12345678'},
            ],
        }
    },
    
    mutations:{
        initState(state,payload){
           Object.assign(state, payload)
        },
        switchTab(state,payload){
            state.selected = payload
            localStorage.setItem("state", JSON.stringify(state))
        },
        updateResume(state, {path, value}){
             objectPath.set(state.resume, path, value)
             localStorage.setItem("state", JSON.stringify(state))
            
        }
    }
})