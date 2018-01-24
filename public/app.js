const app = angular.module('Mytinerary', []);

app.controller('MainController', ['$http', function($http) {

  this.test = "test";
  this.url = "http://localhost:3000";
  this.user = {};
  this.users = [];
  this.error = "";
  this.loggedIn = false;
  this.LoginBox = true;
  this.itineraryReady = false;



  //Authentication--------------
this.login = (userLoginData) => {

	$http({
	 method: 'POST',
	 url: this.url + '/users/login',
	 data: { user: { username: userLoginData.username, password: userLoginData.password }},
 }).then(response => {
   console.log(response);
		 this.user = response.data.user;

     // console.log('loggedIn ', this.loggedIn);
		 localStorage.setItem("token", JSON.stringify(response.data.token));
		 this.formData = {username: this.user.username}
     console.log(this.formData.username);
     if (this.formData.username !== null) {
       this.loggedIn = true;
     }
 }).catch(reject => {
		this.error = 'Username or Password Incorrect';
	});

};

this.createUser = (userRegisterData) => {

	$http({
	 method: 'POST',
	 // url: this.herokuUrl + '/users',
	 url: this.url + '/users',
	 data: { user: { username: userRegisterData.username, password: userRegisterData.password }},
 }).then(response => {
   console.log(response);
	 this.user = response.data.user;
   this.loggedIn = true;
   // console.log('loggedIn ', this.loggedIn);
   localStorage.setItem("token", JSON.stringify(response.data.token));
	 this.formData = {username: this.user.username}
 }).catch(reject => {
		this.error = 'Username Already Exists';
	});
};

this.getUsers = () => {
 $http({
	 // url: this.herokuUrl + '/users',
	 url: this.url + '/users',
	 method: 'GET',
	 headers: {
		Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
	}
 }).then(response => {
   console.log(response);

	 if (response.data.status == 401) {
			this.error = "Unauthorized";
		} else {
			this.users = response.data;
		}
 });
};

this.logout = () => {
localStorage.clear('token');
location.reload();
this.loggedIn = false;
}
//END Authentication----------------

// Itineraries----------------------
this.getMytineraries = () => {
 $http({
	 // url: this.herokuUrl + '/users',
	 url: this.url + '/users/' + this.user.id + '/itineraries',
	 method: 'GET',
	 headers: {
		Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
	}
 }).then(response => {
   console.log(response);

	 if (response.data.status == 401) {
			this.error = "Unauthorized";
		} else {
			this.users = response.data;
		}
 });
};

this.createMytinerary = (itineraryData) => {

  itineraryData.intin_start =

	$http({
	 method: 'POST',
	 // url: this.herokuUrl + '/users',
	 url: this.url + '/users/' + this.user.id + '/itineraries',
	 data: { itinerary: { title: itineraryData.title, intin_start: itineraryData.intin_start, intin_end: itineraryData.intin_end}},
 }).then(response => {
   console.log(response);
	 this.user = response.data.user;
   this.loggedIn = true;
   // console.log('loggedIn ', this.loggedIn);
   localStorage.setItem("token", JSON.stringify(response.data.token));
	 this.formData = {username: this.user.username}
 }).catch(reject => {
		this.error = 'Username Already Exists';
	});
};

// End Itineraries------------------

// Functions------------------------
  this.openItinForm = () => {
    if (this.itineraryReady == true) {
      this.itineraryReady = false
    } else {
      this.itineraryReady = true
    }
  }

// End Functions--------------------
}]);
