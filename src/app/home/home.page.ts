import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import * as io from 'socket.io-client';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	socket: any;
	username = null;
	constructor(public http: HttpClient, private storage: Storage, private router: Router, public alertController: AlertController, public localNotifications: LocalNotifications) {
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
		this.socket = io('https://apes427.herokuapp.com');
		this.socket.on('response', (resp) => {
			this.presentAlert(resp);
		});
	}

	ngOnInit() {
		console.log('settign alarms');
		this.localNotifications.schedule({
			title: 'alarm',
			text: 'nobody cares',
			trigger: {
				every: {
					weekday: 1,
					hour: 16,
					minute: 43,
				},
				count: 365,
			},
			actions: [
				{ id: 'dismiss', title: 'dismiss' },
				{ id: 'snooze', title: 'snooze' }
			]
		});
		this.localNotifications.on('snooze').subscribe(res => {
			console.log('snooze');
			this.localNotifications.schedule({
				title: 'alarm',
				text: 'nobody cares',
				trigger: { at: new Date(new Date().getTime() + 300000) },
				actions: [
					{ id: 'dismiss', title: 'dismiss' },
					{ id: 'snooze', title: 'snooze' }
				]
			});
		});
		this.localNotifications.on('dismiss').subscribe(res => {
			console.log('dismiss');
			console.log(res);
		});
	}

	login() {
		console.log('logging in');
		let body = {
			username: this.username
		};
		this.http.post('https://apes427.herokuapp.com/mobile/login', body).subscribe(() => {
		});
	}
	logout() {
		console.log('logging out');
		this.http.get('https://apes427.herokuapp.com/mobile/logout').subscribe(() => {
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
