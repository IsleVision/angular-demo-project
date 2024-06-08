import { Component, EventEmitter, Input, OnInit,OnChanges, Output, SimpleChanges } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Article, HttpService } from '../http.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css'
})
export class EditArticleComponent implements OnInit,OnChanges{
  @Input() articleId:number|undefined
  @Output() edit = new EventEmitter<Article>()

  article: Article = {id:0, userId:0, body:'',title:''};

  constructor(private route:ActivatedRoute, private router:Router, private service: HttpService){}

  ngOnInit(): void {
    this.refreshContent()
  }

  ngOnChanges(): void {
    this.refreshContent()
  }

  submit() {
    this.edit.emit(this.article)
    }

  cancel(){
    this.refreshContent()
    this.edit.emit()
  }

  refreshContent(){
    if(this.articleId){
      this.service.get(this.articleId).subscribe(article=>{if(article)this.article=article}) 
    }
  }

}
