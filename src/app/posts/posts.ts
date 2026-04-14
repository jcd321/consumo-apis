import { Component, inject, OnInit, signal } from '@angular/core';
import { PostServices } from '../services/post.service';
import { Post } from '../models/post.models';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts implements OnInit {
  private readonly postService = inject(PostServices);
  protected readonly titles = signal<Post[]>([]);

    ngOnInit(): void {
      this.getTitle();
    }
    getTitle(){
        this.postService.getPosts().subscribe({
        next: (data) => {
          this.titles.set(data);
        },
        error: (error) => {
          console.log(error);
        },
      })
    }

    getTitleId(id: number) {
      this.postService.getPost(id)
        .subscribe(data => this.titles.set([data]));
    }
}
