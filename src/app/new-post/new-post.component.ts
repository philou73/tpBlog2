import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

	postForm: FormGroup;
	
  constructor(private router: Router, 
							private formBuilder: FormBuilder,
							private postService: PostService) { }

  ngOnInit() {
		this.initForm();
  }

	// Annulation, on retourne à la liste des posts
	onCancel(){
		this.router.navigate(['/posts']);
	}
	
	// Initialisation du formulaire
	initForm() {
		this.postForm = this.formBuilder.group({
			title: ['', Validators.required],
			content: ['', Validators.required]
		});
	}
	
	// Création d'un nouveau post
	onSave(){
		console.log('on est dans le onSave');
		const title = this.postForm.value['title'];
		const content = this.postForm.value['content'];
		const post = new Post(title, content);
		console.log(post);
		this.postService.createPost(post);
		this.router.navigate(['/posts']);
	}
}
