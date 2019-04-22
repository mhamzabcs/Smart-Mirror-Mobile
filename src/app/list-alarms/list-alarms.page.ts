import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
	selector: 'app-list-alarms',
	templateUrl: './list-alarms.page.html',
	styleUrls: ['./list-alarms.page.scss'],
})
export class ListAlarmsPage implements OnInit {
	socket: any;
	alarmList = null;
	username = null;

	constructor(public http: HttpClient, public storage: Storage, public localNotifications: LocalNotifications) {
		storage.get('username').then((val) => {
			this.username = val;
			this.getAlarms();
		});
		this.socket = io('https://apes427.herokuapp.com');
		this.socket.on('alarms', (resp) => {
			this.alarmList.push(resp);
			console.log(this.alarmList);
		});
	}

	ngOnInit() {
		console.log('adding notifi');
		/* this.localNotifications.schedule({
			text: 'ALARM',
			trigger: { every: { weekday: 1, hour: 16, minute: 37} },
			actions: [
				{ id: 'dismiss', title: 'dismiss' },
				{ id: 'snooze', title: 'snooze' }
			]
		}); */
		
		this.localNotifications.on('snooze').subscribe(res => {
			console.log('snooze');
			console.log(res);
		});
		this.localNotifications.on('dismiss').subscribe(res => {
			console.log('dismiss');
			console.log(res);
		});
	}
	getAlarms() {
		const body = {
			username: this.username
		}
		this.http.post('https://apes427.herokuapp.com/mobile/getAlarms', body).subscribe((response) => {
			if (response['msg'] == "no alarms") {
				this.alarmList = [];
			}
			else {
				this.alarmList = response;
				console.log(response);

			}
		});
	}


}


