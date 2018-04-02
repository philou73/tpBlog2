import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs/Subscription';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

	// On définit la liste des posts non plus dans l'app.component, mais on y souscrit dans le component list
	arPosts: Post[];
	postSubscription: Subscription; 

  constructor(private postService : PostService,
							private router: Router) { }

  ngOnInit() {
		//On souscrit au sujet des posts dans le service PostService
		this.postSubscription = this.postService.postSubject.subscribe(
			(posts: any[]) => {
				this.arPosts = posts;
			}
		);
		// A l'init, on lance l'émission des posts pour récupérer le premier état de la liste
		this.postService.emitPostSubject();
		
		console.log(this.arPosts);
  }
  
	// Action de création d'un nouveau post
	onNewPost(){
		this.router.navigate(['new']);
	}

	//On se désinscrit du Subject
	ngOnDestroy() {
		this.postSubscription.unsubscribe();
	}
	
}
