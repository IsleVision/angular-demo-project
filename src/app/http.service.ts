import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Article[]>{
    return this.http.get<Article[]>('assets/data/articles.json')
  }

  get(id:number):Observable<Article|undefined>{
    return this.getAll().pipe(map((all:Article[])=>{
      return all.find((e:Article)=>e.id==id)
    }))
  }

  search(q: string): Observable<Article[]> {
    console.log(q)
    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.getAll().pipe(
      map((data: Article[]) => data
        .filter((item: Article) => JSON.stringify(item.body).toLowerCase().includes(q))
      ));
  }

}


export interface Article{
  userId:number;
  id:number;
  title:string;
  body:string;

}