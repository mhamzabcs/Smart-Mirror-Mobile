import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import * as io from 'socket.io-client';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	socket:any;
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
		this.socket = io('http://127.0.0.1:5000');
		this.socket.on('response', (resp) => {
			this.presentAlert(resp);
		});
	}

	login() {
		console.log('logging in');
		let body = {
			username: this.username
		};
		this.http.post('http://127.0.0.1:5000/mobile/login', body).subscribe(() => {
		});
	}
	logout() {
		console.log('logging out');
		this.http.get('http://127.0.0.1:5000/mobile/logout').subscribe(() => {
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
