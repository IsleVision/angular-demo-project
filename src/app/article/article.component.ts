import { Component, Input } from '@angular/core';
import { Article } from '../http.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  isCollapsed:boolean=true;
  @Input() article!:Article;

  collapse(){
    this.isCollapsed = !this.isCollapsed

  }
  
}
