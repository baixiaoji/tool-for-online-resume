import Vue from 'vue';
import AV from  'leancloud-storage';

var APP_ID = '0zDsf0Lx4sGM8ObOzD9cXRfO-gzGzoHsz';
var APP_KEY = 'vMPiwrUv0nUd8LB4SYWQiOLM';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});



var app = new Vue({
  el: '#app',
  data: {
    actionType:"signUp",
    formData:{
      username:'',
      password:''
    },
    newTodo: '',
    todoList:[],
    currentUser:null
  },
  created:function(){

    this.currentUser = this.getCurrentUser();
    
    this.fetchTodos()
  },
  methods:{
    fetchTodos:function(){
        if(this.currentUser){
          var query = new AV.Query("AllTodos");
          query.find()
          .then((todos) => {
            let avAllTodos = todos[0];
            let id = avAllTodos.id;
            this.todoList = JSON.parse(avAllTodos.attributes.content)
            this.todoList.id = id;
          },function(error){
            console.log(error)
          })

      }
    },
  	updateTodos:function(){
      let dataString = JSON.stringify(this.todoList)
      let avTodos = AV.Object.createWithoutData("AllTodos",this.todoList.id)
      avTodos.set("content",dataString);
      avTodos.save().then(()=>{
        console.log("更新成功");
      })
    },
    saveTodos:function(){
      let dataString = JSON.stringify(this.todoList);
      var AVTodos = AV.Object.extend("AllTodos");
      var avTodos = new AVTodos();
      var acl = new AV.ACL()
      acl.setReadAccess(AV.User.current(),true) // 只有这个 user 能读
      acl.setWriteAccess(AV.User.current(),true) // 只有这个 user 能写
      avTodos.set("content",dataString);
      avTodos.setACL(acl); // 设置访问控制
      avTodos.save().then((todo)=>{
        console.log("保存成功")
      },function(error){
        alert("保存失败");
      })
    },
    saveOrUpdateTodos:function(){
      if(this.todoList.id){
        this.updateTodos();
      }else{
        this.saveTodos()
      }
    },
    addTodo:function(){
  		this.todoList.push({
  			title: this.newTodo,
  			createdAt: (new Date()).toLocaleDateString()+" "+(new Date()).toLocaleTimeString(),
  			done:false
  		})
  		this.newTodo = " "
      this.saveOrUpdateTodos();
  		// console.log(this.todoList)
  	},
  	removeTodo:function(todo){
  		let i = this.todoList.indexOf(todo);
  		this.todoList.splice(i,1);
      this.saveOrUpdateTodos();
  	},
    signUp:function(){
      let user = new AV.User();
      // 设置用户名
      user.setUsername(this.formData.username);
      // 设置密码
      user.setPassword(this.formData.password);

      user.signUp().then(function (loginedUser) {
        this.currentUser =this.getCurrentUser()
          console.log(this.currentUser);
      }, function (error) {
        alert("注册失败")
        console.log(error)
      });
    },
    login:function(){
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
        
        this.currentUser = this.getCurrentUser()
        this.fetchTodos()
      }, function (error) {
        alert("登录失败")
        console.log(error)
      });
    },
    getCurrentUser:function(){
      
       let current = AV.User.current();
       if(current){
           let {id, createdAt, attributes: {username}} = current
            return {id, username, createdAt}
       }else{
         return null
       }
    },
    logout:function(){
      AV.User.logOut()
      this.currentUser = null
      window.location.reload()
    }
  }
})         