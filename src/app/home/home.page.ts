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
	alarmList = null;
	constructor(public http: HttpClient, private storage: Storage, private router: Router, public alertController: AlertController, public localNotifications: LocalNotifications) {
		console.log('hehe');
		storage.get('username').then((val) => {
			console.log(val);
			if (!val) {
				this.router.navigate(['/login'])
			}
			else {
				this.username = val;
				console.log("user? "+this.username);
				this.socket = io('https://apes427.herokuapp.com');
				this.socket.on(this.username, (resp) => {
					this.presentAlert(resp);
				});
			}
		});
	}

	ngOnInit() {
		
	}

	setAlarms(){
		console.log('setting alarms');
		this.storage.get('username').then((val) => {
			const body = {
				username: val
			}
			this.http.post<any[]>('https://apes427.herokuapp.com/mobile/getAlarms', body).subscribe((response) => {
				if (response['msg'] == "no alarms") {
					this.alarmList = [];
				}
				else {
					console.log('yolo swap');
					var objArr = [];
					response.forEach(function (obj, i) {
						console.log(i);
						var obj:any = {
							id: i,
							title: 'Alarm',
							trigger: {
								every: {
									weekday: obj.dayNumber,
									hour: obj.hours,
									minute: obj.minutes,
								},
								count: 365,
							},
							actions: [
								{ id: 'dismiss', title: 'dismiss' },
								{ id: 'snooze', title: 'snooze' }
							]
						}
						objArr.push(obj);
					});
					console.log(objArr);
					this.localNotifications.schedule(objArr);
				}
			});
		});

		this.localNotifications.on('snooze').subscribe(res => {
			console.log('snooze');
			console.log(res);
			this.localNotifications.schedule({
				id:3,
				title: 'Alarm',
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

	refresh(){
		this.http.get('https://apes427.herokuapp.com/mobile/refresh').subscribe(() => {
		});
	}

	changeState(){
		this.http.get('https://apes427.herokuapp.com/mobile/changeState').subscribe(() => {
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
		let body = {
			username: this.username
		};
		this.http.post('https://apes427.herokuapp.com/mobile/logout', body).subscribe(() => {
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
