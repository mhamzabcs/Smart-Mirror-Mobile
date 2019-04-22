import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-list-alarms',
  templateUrl: './list-alarms.page.html',
  styleUrls: ['./list-alarms.page.scss'],
})
export class ListAlarmsPage implements OnInit {
	socket:any;
	alarmList = null;
	username = null;

	constructor(public http: HttpClient, public storage: Storage) {
		storage.get('username').then((val) => {
			this.username = val;
			this.getAlarms();
		});
		this.socket = io('http://127.0.0.1:5000');
		this.socket.on('alarms', (resp) => {
			this.alarmList.push(resp);
			console.log(this.alarmList);
		});
	}

	ngOnInit() {
	}

	getAlarms() {
		const body = {
			username: this.username
		}
		this.http.post('http://127.0.0.1:5000/mobile/getAlarms', body).subscribe((response) => {
			if (response['msg'] == "no alarms") {
				this.alarmList = [];
			}
			else {
				this.alarmList = response;
			}
		});
	}

}
