import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

	constructor(private router: Router){
		//On définit la connextion à la base de données
		const config = {
			apiKey: "AIzaSyC4brpiiXeYoyGoLXAch5tzfAI-VpLfC1E",
			authDomain: "pge-tp-blog.firebaseapp.com",
			databaseURL: "https://pge-tp-blog.firebaseio.com",
			projectId: "pge-tp-blog",
			storageBucket: "",
			messagingSenderId: "495138886539"
		};
		firebase.initializeApp(config);
	}
	
}
