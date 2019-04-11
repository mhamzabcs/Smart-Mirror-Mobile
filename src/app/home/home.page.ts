import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	username = null;
	constructor(public http: HttpClient, private storage: Storage, private router: Router, public alertController: AlertController) {
		console.log('hehe');
		storage.get('username').then((val) => {
			console.log(val);
			if (!val) {
				this.router.navigate(['/login'])
			}
			else {
				this.username = val;
			}
		});
	}

	Login() {
		let body = {
			username: this.username
		};
		this.http.post('https://apes427.herokuapp.com/mobile/login', body).subscribe((response) => {
			this.presentAlert(response["msg"]);
		});
	}
	Logout() {
		this.http.get('https://apes427.herokuapp.com/mobile/logout').subscribe((response) => {
			this.presentAlert(response["msg"]);
		});
	}

	async presentAlert(message) {
		const alert = await this.alertController.create({
			header: 'Alert',
			message: message,
			buttons: ['OK']
		});
		await alert.present();
	}

}
