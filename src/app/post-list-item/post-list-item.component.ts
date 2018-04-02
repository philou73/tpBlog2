import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  constructor(private postService : PostService) { }

  ngOnInit() {
  }

	// On récupère le post passé en paramètre par post-list.component
	@Input() post: Post;
	
	//Un clic sur le bouton "Love it" permet d'incrémenter loveIts
	onLike(post) {
		//On doit mettre à jour le loveIts dans le service
		this.postService.updateLoveItsPost(post, 1);
	}
	
	//Un clic sur le bouton "Don't love it" permet de décrélenter loveIts
	onDislike(post) {
		//On doit mettre àjour le loveIts dans le service
		this.postService.updateLoveItsPost(post, -1);
	}
	
	// Méthode de suppression d'un post
	onRemove(post: Post){
		// On appelle la méthode du service qui permet la suppression du post
		this.postService.removePost(post);
	}
}
