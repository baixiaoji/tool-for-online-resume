import Vue from 'vue';

var app = new Vue({
  el: '#app',
  data: {
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