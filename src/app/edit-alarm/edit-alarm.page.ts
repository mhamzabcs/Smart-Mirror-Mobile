import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, Events } from '@ionic/angular';

@Component({
	selector: 'app-edit-alarm',
	templateUrl: './edit-alarm.page.html',
	styleUrls: ['./edit-alarm.page.scss'],
})
export class EditAlarmPage implements OnInit {
	id = '';
	day = null;
	time = null;
	dayNumber = null;
	hours = null;
	minutes = null;
	daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	constructor(public http: HttpClient, private activatedRoute: ActivatedRoute, public alertController: AlertController, public events: Events) {
		this.activatedRoute.queryParams.subscribe(params => {
			this.id = params['id'];
			this.getAlarm();
		});
	}

	ngOnInit() {
	}

	getAlarm() {
		const body = {
			id: this.id
		}
		this.http.post('https://apes427.herokuapp.com/mobile/getOneAlarm', body).subscribe((response) => {
			console.log(response);
			this.day = response[0].day;
			this.time = response[0].time;
			this.dayNumber = response[0].dayNumber;
			this.hours = response[0].hours;
			this.minutes = response[0].minutes;
		});
	}

	editAlarm(selectedTime, selectedDay){
		let d = new Date(selectedTime);
		let date = this.daysOfWeek[selectedDay];
		let time = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}).toLowerCase();
		let dayNumber = selectedDay;
		let hours = d.getHours();
		let minutes = d.getMinutes();
		console.log(date)
		console.log(time)
		console.log(dayNumber)
		console.log(hours)
		console.log(minutes)
		const body = {
			id: this.id,
			day: date,
			time: time,
			dayNumber: dayNumber,
			hours: hours,
			minutes: minutes
		}
		this.http.post('https://apes427.herokuapp.com/mobile/editAlarm', body).subscribe((response) => {
			console.log(response);
			this.presentAlert(response["msg"]);
			this.events.publish('alarm:edit');
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
