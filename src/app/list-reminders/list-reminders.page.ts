import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, Events } from '@ionic/angular';

@Component({
	selector: 'app-list-reminders',
	templateUrl: './list-reminders.page.html',
	styleUrls: ['./list-reminders.page.scss'],
})
export class ListRemindersPage implements OnInit {
	reminderList = null;
	username = null;

	constructor(public http: HttpClient, public storage: Storage, private router: Router, public events: Events, public alertController: AlertController) {
		storage.get('username').then((val) => {
			this.username = val;
			this.getReminders();
			events.subscribe('reminder:edit', () => {
		   		console.log('edit reminder triggered');
		   		this.getReminders();
			});
		});
	}

	ngOnInit() {
	}

	getReminders() {
		const body = {
			username: this.username
		}
		this.http.post('https://apes427.herokuapp.com/mobile/getReminders', body).subscribe((response) => {
			console.log(response);
			if (response['msg'] == "no reminders") {
				console.log('here')
				this.reminderList = [];
			}
			else {
				console.log('here 2')
				this.reminderList = response;
			}
		});
	}

	delete(id) {
		const body = {
			id: id
		}
		this.http.post('https://apes427.herokuapp.com/mobile/deleteReminder', body).subscribe((response) => {
			console.log(response);
			this.reminderList = response;
			if (response["msg"] == "reminder removed") {
				// reminder remove kar deta bus yeh reminder reminderlist se bhi remove kara k show kar de
				this.presentAlert(response["msg"]);
				this.getReminders();
			}
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

	edit(id) {
		console.log('heere = ' + id);
		let navigationExtras: NavigationExtras = {
			state: {
				id: id
			}
		};
		this.router.navigate(['/edit-reminder'], {
			queryParams: {
				id: id
			}
		});
	}
}
