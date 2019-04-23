import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
	constructor(public http: HttpClient, private activatedRoute: ActivatedRoute) {
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

	editAlarm(time, selectedDay){
		console.log(time)
		console.log(selectedDay)
	}
}
