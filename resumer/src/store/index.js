import Vue from 'vue'
import Vuex from 'vuex'
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
                {name: 'award A', content: '文字'},
                {name: 'award B', content: '文字'},
            ],
            contacts:[
                {contaxt: 'phone', content: '187657234'},
                {contaxt: 'qq', content: '12345678'},
            ],
        }
    },
    
    mutations:{
        switchTab(state,payload){
            state.selected = payload
        }
    }
})