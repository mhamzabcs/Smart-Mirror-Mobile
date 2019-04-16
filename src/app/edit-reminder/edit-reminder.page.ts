import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
@Component({
	selector: 'app-edit-reminder',
	templateUrl: './edit-reminder.page.html',
	styleUrls: ['./edit-reminder.page.scss'],
})
export class EditReminderPage implements OnInit {
	id = '';
	description = null;
	date = null;
	myDate: String = new Date().toISOString();

	constructor(public http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, public alertController: AlertController) {
		this.activatedRoute.queryParams.subscribe(params => {
			this.id = params['id'];
			this.getReminder();
		});
	}


	ngOnInit() {
	}

	getReminder() {
		const body = {
			id: this.id
		}
		this.http.post('https://apes427.herokuapp.com/mobile/getOneReminder', body).subscribe((response) => {
			console.log(response);
			this.description = response[0].description;
			this.date = response[0].date;
		});
	}

	editReminder(description, date) {
		const body = {
			id: this.id,
			description: description,
			date: date
		}
		this.http.post('https://apes427.herokuapp.com/mobile/editReminder', body).subscribe((response) => {
			console.log(response);
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
