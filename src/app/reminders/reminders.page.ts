import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
	selector: 'app-reminders',
	templateUrl: './reminders.page.html',
	styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage implements OnInit {
	//myDate: String = new Date().toISOString();
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

}
