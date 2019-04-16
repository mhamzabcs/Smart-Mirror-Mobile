import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	name = null;
	username = null;
	email = null;
	password = null;
	password2 = null;
	errorList = null;
	constructor(public http: HttpClient, public router: Router) { }

	ngOnInit() {
	}

	register(name, username, email, password, password2) {
		
		let body = {
			name: name,
			username: username,
			email: email,
			password: password,
			password2: password2
		};
		this.http.post('https://apes427.herokuapp.com/users/register', body).subscribe((response) => {
			if (response["msg"] === 'success') {
				this.router.navigate(['/login'])
			}
			else {
				this.errorList = response;
			}
		});
	}
}
