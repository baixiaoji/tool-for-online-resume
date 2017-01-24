import Vue from 'vue';
import AV from  'leancloud-storage';

var APP_ID = '0zDsf0Lx4sGM8ObOzD9cXRfO-gzGzoHsz';
var APP_KEY = 'vMPiwrUv0nUd8LB4SYWQiOLM';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})

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
    checked:false
  },
  created:function(){
  	window.onbeforeunload = () => {
  		let dataString = JSON.stringify(this.todoList)
  		window.localStorage.setItem("myTodos",dataString)
  	}

  	let oldDataString = window.localStorage.getItem("myTodos")
  	let oldData = JSON.parse(oldDataString)
  	this.todoList = oldData || []
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
  	}
  }
})         