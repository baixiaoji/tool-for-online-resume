import Vue from 'vue'
import Vuex from 'vuex'
import objectPath from "object-path"
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        selected:'profile',
        user: {
            id: "",
            username: ""
        },
        resume:{
            config:[
                
                {field: "profile",icon: "id",keys:["name","city","title","birthday"]},
                {field: "workHistory",icon: "work",type:"array",keys:["company","details"]},
                {field: "education",icon: "book",type:"array",keys:["school","details"]},
                {field: "projects",icon: "heart",type: "array",keys:["name","details"]},
                {field: "awards",icon: "cup",type:"array", keys:["name","details"]},
                {field: "contacts",icon: "phone",type:"array",keys:["contact","content"]},
            ],
        }
    },
    
    mutations:{
        initState(state,payload){
           
           state.resume.config.map( (item)=>{
               if(item.type === "array"){
                   // 这里写 Vue无法监听属性变化
                //   state.resume[item.field] = [];
                   Vue.set(state.resume,item.field,[])
               }else{
                   // state.resume[item.field] = {}
                   Vue.set(state.resume, item.field,{})
                   item.keys.map((key) => {
                       // state.resume[item.field][key] = ""
                       Vue.set(state.resume[item.field], key, "")
                   })
               }
           })
           Object.assign(state, payload)
        },
        switchTab(state,payload){
            state.selected = payload
            localStorage.setItem("state", JSON.stringify(state))
        },
        updateResume(state, {path, value}){
             objectPath.set(state.resume, path, value)
             localStorage.setItem("state", JSON.stringify(state))
            
        },
        setUser(state, payload){
            Object.assign(state.user,payload)
        },
        removeUser(state){
            state.user.id = "";
        }
    }
})