import { Component } from '@angular/core';
import { Article, HttpService } from '../http.service';
import { OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleComponent } from '../article/article.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterLink, ArticleComponent, CommonModule, FormsModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit{
  query:string =''
  articles:Article[]=[];

  constructor(private httpService: HttpService){}

  ngOnInit(): void {
      this.httpService.getAll().subscribe((data)=>this.articles=data)
  }

  search(): void {
    this.httpService.search(this.query).subscribe({
      next: (data: Article[]) => {
        this.articles = data;
      },
      error: error => console.log(error)
    });
  }

  deleteArticle(id:number){
    this.articles=this.articles.filter(e=>e.id!=id)
  }

}
