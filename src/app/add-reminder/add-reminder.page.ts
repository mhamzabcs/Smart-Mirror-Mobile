import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
	selector: 'app-add-reminder',
	templateUrl: './add-reminder.page.html',
	styleUrls: ['./add-reminder.page.scss'],
})
export class AddReminderPage implements OnInit {

	myDate: String = new Date().toISOString();
	username = null;
	constructor(public http: HttpClient, private storage: Storage, private router: Router, public alertController: AlertController) {
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

	ngOnInit() {
	}
	
	// show msg if date/description is empty
	addReminder(text, date) {
		console.log(text);
		console.log(date);
		let body = {
			text: text,
			date: date,
			username: this.username
		};
		this.http.post('https://apes427.herokuapp.com/mobile/addReminder', body).subscribe((response) => {
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
