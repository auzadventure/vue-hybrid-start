var Vue = require('vue');
var loki = require('lokijs')
var db = new loki('loki.json')
var exerciseDB = db.addCollection('exercises')


new Vue({
  el: '#app',
  data: {
    message: 'This is powered by Vue',
	exercises: [],
	exercise:'',
	session:{exerciseID:'',name:'',reps:[]},
	recordReps:'',
	showAddToggle: false,
  },
  methods: {
	  addExercise: function(e) {
		  exerciseDB.insert({name:this.exercise,reps:[]})
		  this.loadExercises();
		  this.exercise = ''
		  
	  },
	  
	  delExercise: function() {
		  exerciseDB.remove(this.session.exerciseID);
		  this.loadExercises();
	  },
	  
	  printDB: function(e) {
		  var results = exerciseDB.data;
		  alert(JSON.stringify(results))
		  this.loadExercises();
	  },
	  
	  loadExercises: function(e){
		  this.exercises = exerciseDB.data;
	  },
	  
	  record: function(e) {
		  var exerciseID = this.session.exerciseID;
		  var eObj = exerciseDB.get(exerciseID)
		  eObj.reps.push(this.session.rep)
		  exerciseDB.update(eObj)
		  this.loadExercises();
	  } ,
	  
	  removeRep: function(e) {
		  var exerciseID = this.session.exerciseID;
		  var eObj = exerciseDB.get(exerciseID)
		  eObj.reps.pop()
		  exerciseDB.update(eObj)
		  this.loadExercises();		  
		  
	  },
	  
	  showAdd: function() {
		  this.showAddToggle = true; 
		  
	  },
	  closeAdd: function() {
		  this.showAddToggle = false;
	  }
	  
  },
  ready: function() {
	  this.loadExercises(); 	
	  
	}
})