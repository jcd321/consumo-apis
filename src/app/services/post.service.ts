import { HttpClient, HttpParams,HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/post.models";

@Injectable({
    providedIn: 'root'
})

export class PostServices{
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';


    getPosts(): Observable<Post[]>{
        return this.http.get<Post[]>(this.apiUrl);
    }

    getPost(id: number): Observable<Post>{
        const queyParams = new HttpParams().set('id', id.toString())

        const resHeaders = new HttpHeaders().set('Authorization', "Bearer sdfSDFsdfSDasdaSDA")
        .set('Custom-header', "PostServices")

        return this.http.get<Post>(`${this.apiUrl}/${id}`, {params: queyParams, headers: resHeaders});
    }

    createPost(post: Post): Observable<Post>{
        return this.http.post<Post>(this.apiUrl, post);
    }

    updatePost(id: number, post: Post): Observable<Post>{
        return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
    }

}