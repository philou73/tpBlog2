import { Injectable } from '@angular/core';
// Import de la class Subject pour permettre aux components de s'y abonner
import { Subject } from 'rxjs/Subject';
// Import du model Post
import { Post } from '../models/post.model';

@Injectable()
export class PostService {

	arPosts: Post[];
	
	// On initialise le Subject
	postSubject = new Subject<any[]>();
	
	// On définit la méthode qui permet d'émettre le Subject sur les modifications des posts
	emitPostSubject(){
		this.postSubject.next(this.arPosts);
	}
	
	constructor() {
		this.arPosts = new Array<Post>();
	}

	// Création d'un nouveau post 
	createPost(post: Post){
		// On complète le post avec les données à initialiser par défaut
		post.loveIts = 0;
		// On ajoute le post au tableau
		this.arPosts.push(post);
		// On déclenche le Subject
		this.emitPostSubject();
	}
	
	//Suppression d'un post
	removePost(postToRemove: Post){
		//On recherche l'index du post à supprimer
		const postIndex = this.arPosts.findIndex(
			(postToFind) => {
				if(postToFind === postToRemove) {
					return true;
				}
			}
		);
		// On supprime un item du tableau à partir de l'index identifié
		this.arPosts.splice(postIndex,1);
		// On émet le subject
		this.emitPostSubject();
	}

	//Mise à jour des loveIts
	updateLoveItsPost(postToUpdate: Post, num: number){
		const postIndex = this.arPosts.findIndex(
			(postToFind) => {
				if(postToFind === postToUpdate){
					return true;
				}
			}
		);
		this.arPosts[postIndex].loveIts += num;
		//On avertit les traitements abonnés:
		this.emitPostSubject();
	}
}
