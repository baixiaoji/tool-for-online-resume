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
  	window.onbeforeunload = () => {
  		let dataString = JSON.stringify(this.todoList)
  		window.localStorage.setItem("myTodos",dataString)
  	}

  	let oldDataString = window.localStorage.getItem("myTodos")
  	let oldData = JSON.parse(oldDataString)
  	this.todoList = oldData || []

    this.currentUser = this.getCurrentUser();
  },
  methods:{
  	addTodo:function(){
  		this.todoList.push({
  			title: this.newTodo,
  			createdAt: (new Date()).toLocaleDateString()+" "+(new Date()).toLocaleTimeString(),
  			done:false
  		})
  		this.newTodo = " "
  		// console.log(this.todoList)
  	},
  	removeTodo:function(todo){
  		let i = this.todoList.indexOf(todo);
  		this.todoList.splice(i,1);
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
      });
    },
    login:function(){
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
        
        this.currentUser = this.getCurrentUser()

      }, function (error) {
        alert("登录失败")
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