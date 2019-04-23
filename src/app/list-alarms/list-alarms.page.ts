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
			this.socket = io('https://apes427.herokuapp.com');
			this.socket.on(this.username+' alarms', (resp) => {
				this.alarmList.push(resp);
				console.log(this.alarmList);
				this.setAlarm(resp);
			});
		});
	}

	ngOnInit() {
	}

	setAlarm(obj){
		var obj:any = {
			id: Math.random(),
			title: 'Alarm',
			text: 'someone cares',
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
		this.localNotifications.schedule(obj);

		this.localNotifications.on('snooze').subscribe(res => {
			console.log('snooze');
			console.log(res);
			this.localNotifications.schedule({
				id:3,
				title: 'alarm',
				text: 'snoozy boy',
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


