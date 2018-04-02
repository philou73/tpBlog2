import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
	
	//On récupère les variables transmises par le component PostList
	@Input() title: string;
	@Input() content: string;
	@Input() loveIts: number;
	@Input() created_at: Date;
	
	//Un clic sur le bouton "Love it" permet d'incrémenter loveIts
	onLike() {
		this.loveIts += 1;
	}
	
	//Un clic sur le bouton "Don't love it" permet de décrélenter loveIts
	onDislike() {
		this.loveIts -= 1;
	}
}
