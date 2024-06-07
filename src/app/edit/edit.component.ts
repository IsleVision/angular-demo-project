import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Article, HttpService } from '../http.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  article: Article|undefined;

  constructor(private route:ActivatedRoute, private router:Router, private service: HttpService){}

  ngOnInit(): void {
      this.route.params.subscribe(params=>{
        const id = +params['id']
        this.service.get(id).subscribe(article=>this.article=article)
      })
  }

  submit() {
    console.log('article changed to',this.article);
    }


}
