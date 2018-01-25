const app = angular.module('Mytinerary', []);

app.controller('MainController', ['$http', function($http) {

  this.test = "test";
  this.url = "http://localhost:3000";
  this.user = {};
  this.users = [];
  this.myTineraries = [];
  this.error = "";
  this.loggedIn = false;
  this.LoginBox = true;
  this.itineraryReady = false;
  this.date = Date();
  console.log('Date', this.date);



  //Authentication--------------
this.login = (userLoginData) => {

	$http({
	 method: 'POST',
	 url: this.url + '/users/login',
	 data: { user: { username: userLoginData.username, password: userLoginData.password }},
 }).then(response => {
   console.log(response);
		 this.user = response.data.user;
		 localStorage.setItem("token", JSON.stringify(response.data.token));
     console.log(this.user.username);
     if (this.user.username !== null) {
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
   console.log(this.user.username);
   if (this.user.username !== null) {
     this.loggedIn = true;
   }
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
// this.getMytineraries = () => {
 $http({
	 // url: this.herokuUrl + '/users',
	 url: this.url + '/users/' + this.user.id + '/itineraries',
	 method: 'GET',

 }).then(response => {
   console.log(response);
	 this.myTineraries = response.data;
 });
// };

this.createMytinerary = (itineraryData) => {

  itineraryData.intin_start = itineraryData.date_start + ' ' + itineraryData.time_start;
  console.log('itin start ',itineraryData.intin_start);
  itineraryData.intin_end = itineraryData.date_end + ' ' + itineraryData.time_end;
  console.log('itin end ',itineraryData.intin_end);
	$http({
	 method: 'POST',
	 // url: this.herokuUrl + '/users',
	 url: this.url + '/users/' + this.user.id + '/itineraries',
	 data: { itinerary: { title: itineraryData.title, intin_start: itineraryData.intin_start, intin_end: itineraryData.intin_end}},
 }).then(response => {
   console.log(response);
	 this.myTineraries.push(response.data);
 }).catch(reject => {
		this.error = 'error';
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
