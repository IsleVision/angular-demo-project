import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Article } from '../http.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from '../edit-article/edit-article.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterLink,CommonModule, EditArticleComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit,OnChanges{
  isCollapseNeed:boolean=true;
  isCollapsed:boolean=true;
  isEditOpen:boolean=false;
  editArtId!: number;
  @Input() article!:Article;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Article>();

  ngOnInit(): void {
      this.isCollapseNeed=(this.article.body).length>100
  }

  ngOnChanges(): void {
    this.isCollapseNeed=(this.article.body).length>100
 }

  collapse(){
    this.isCollapsed = !this.isCollapsed
  }

  deleteArticle(id: number){
    this.delete.emit(id)
  }

  openEdit(articleId:number){
    this.editArtId = articleId
    this.isEditOpen = true
  }

  editArticle(article:Article){
    this.isEditOpen=false
    if(article){
      this.isCollapseNeed=(this.article.body).length>100
      this.edit.emit(article)
    }
  }

}
