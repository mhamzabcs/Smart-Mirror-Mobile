import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	status = null;
	username = null;
	constructor(public http: HttpClient, public storage: Storage, public router: Router) {
		console.log('hehe');
		storage.get('username').then((val) => {
			console.log(val);
			if (val) {
				this.router.navigate(['/home'])
			}
		});
	}

	ngOnInit() {
	}

	signIn(username, password) {
		console.log('no');
		console.log(username);
		console.log(password);
		let body = {
			username: username,
			password: password
		};
		this.http.post('https://apes427.herokuapp.com/users/login', body).subscribe((response) => {
			console.log(response);
			if (response["status"] === 'success') {
				this.storage.set('username', response["username"]);
				this.router.navigate(['/home'])
			}
			else {
				this.status = "Invalid Username or Password";
			}
		});
	}
}
