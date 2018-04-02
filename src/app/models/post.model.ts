export class Post {
	loveIts: number;
	created_at: Date;
	
	// Pour créer un post, on a besoin du titre et du contenu
	// La date de création et le nombre de likes sont initialisés
	constructor(public title: string, public content: string){
		this.created_at = new Date();
		this.loveIts = 0;
	}
}