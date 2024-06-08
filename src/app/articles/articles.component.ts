import { Component } from '@angular/core';
import { Article, HttpService } from '../http.service';
import { OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleComponent } from '../article/article.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditArticleComponent } from '../edit-article/edit-article.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterLink, ArticleComponent, EditArticleComponent, CommonModule, FormsModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit{
  query:string =''
  articles:Article[]=[];
  isAddOpen:boolean=false;
  lastIndex:number=0;


  constructor(private httpService: HttpService){}

  ngOnInit(): void {
      this.httpService.getAll().subscribe((data)=>{
        this.articles=data; 
        this.lastIndex=this.articles.length
      })
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

  editArticle(article:Article){
    if(article){
      const index = this.articles.findIndex(e=>e.id==article.id)
      this.articles[index]=article
    }
  }

  addArticle(article:Article){
    this.isAddOpen=false
    if(article.title&&article.body){
      this.lastIndex ++
      article.id=this.lastIndex
      this.articles.push({...article})
    }
  }

  openAdd(){
    this.isAddOpen=true
  }

}
