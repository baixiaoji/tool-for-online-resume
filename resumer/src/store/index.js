import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        count: 0,
        selected:'profile',
        resume:{
            config:[
                {field: "profile",icon: "id"},
                {field: "work history",icon: "work"},
                {field: "education",icon: "book"},
                {field: "projects",icon: "heart"},
                {field: "awards",icon: "cup"},
                {field: "contacts",icon: "phone"},
            ],
            profile:{
                name:'baixiaoji',
                city:'Hangzhou',
                title:'blablabla'
            },
            'work history':[
                {company: 'XIN', content: '我的第二份工作是'},
                {company: 'FF', content: '我的第一份工作是'},
            ],
            education:[
                {school: 'SD', content: '文字'},
                {school: 'TX', content: '文字'},
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
        increment(state){
            state.count++
        },
        switchTab(state,payload){
            state.selected = payload
        }
    }
})