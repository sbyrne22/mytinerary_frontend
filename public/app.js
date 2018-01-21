const app = angular.module('Mytinerary', []);

app.controller('MainController', ['$http', function($http) {

  this.test = "test";
  this.url = "http://localhost:3000";
  this.user = {};
  this.users = [];
  this.error = "";



  //Authentication--------------
this.login = (userPass) => {

	$http({
	 method: 'POST',
	 url: this.url + '/users/login',
	 data: { user: { username: userPass.username, password: userPass.password }},
 }).then(response => {
   console.log(response);
		 this.user = response.data.user;
		 localStorage.setItem("token", JSON.stringify(response.data.token));
		 this.formData = {username: this.user.username}
 });

};

this.createUser = (userPass) => {

	$http({
	 method: 'POST',
	 // url: this.herokuUrl + '/users',
	 url: this.url + '/users',
	 data: { user: { username: userPass.username, password: userPass.password }},
 }).then(response => {
   console.log(response);
	 this.user = response.data.user;
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

}]);
