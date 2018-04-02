import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list-item/post-list-item.component';

//Import du service
import { PostService } from './services/post.service';

//Gestion des routes
import { Routes, RouterModule } from '@angular/router';
import { NewPostComponent } from './new-post/new-post.component';
import { HeaderComponent } from './header/header.component';

// Gestion des formulaires
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
	{path: 'posts', component: PostListComponent},
	{path: 'new', component: NewPostComponent},
	{path: '', redirectTo:'posts', pathMatch:"full"},
	{path:'**', redirectTo:'posts'}
]
@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostListItemComponent,
    NewPostComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
		ReactiveFormsModule,
		RouterModule.forRoot(appRoutes)
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
