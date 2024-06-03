import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
{path: 'articles', component:ArticlesComponent },
{path: 'edit/:id', component:EditComponent }
];
