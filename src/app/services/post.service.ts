import { Injectable } from '@angular/core';
// Import de la class Subject pour permettre aux components de s'y abonner
import { Subject } from 'rxjs/Subject';
// Import du model Post
import { Post } from '../models/post.model';
//Import des classes firebase
import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

@Injectable()
export class PostService {

	arPosts: Post[];
	
	// On initialise le Subject
	postSubject = new Subject<Post[]>();
	
	// On définit la méthode qui permet d'émettre le Subject sur les modifications des posts
	emitPostSubject(){
		this.postSubject.next(this.arPosts);
	}
	
	constructor() {
		//on récupère les posts un première fois.
		//la méthode se charge de lancer l'emitPostSubject() pour alimenter la liste des posts
		this.getPosts();
	}

	// Création d'un nouveau post 
	createPost(post: Post){
		// On complète le post avec les données à initialiser par défaut
		post.loveIts = 0;
		console.log ('on est dans le createPost du service : ' + post);
		// On ajoute le post au tableau
		this.arPosts.push(post);
		console.log('on vient pusher le nouveau post : ');
		console.log(this.arPosts);
		//On met à jour la base de données
		this.savePosts();
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
		//On met à jour la liste en base de données
		this.savePosts();
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
		//On met à jour la base de données
		this.savePosts();
		//On avertit les traitements abonnés:
		this.emitPostSubject();
	}
	
	// Méthode de récupération de tous les posts.
	getPosts(){
		firebase.database().ref('/posts')
			.on('value', (data: DataSnapshot)=> {
				this.arPosts = data.val() ? data.val() : new Array<Post>();
				this.emitPostSubject();
			});
	}
	//On crée une méthode d'enregistrement en base de données Firebase
	savePosts(){
		console.log("Avant d'appeler Firebase");
		console.log(this.arPosts);
		firebase.database().ref('/posts').set(this.arPosts);
		console.log("Après avoir appelé Firebase");
		console.log(this.arPosts);
	}
}
