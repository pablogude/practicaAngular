import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  public post: Post = {};
  private id: string; 

  constructor(
    private postService: PostService,
    private router: Router, 
    private route: ActivatedRoute, 
    private title: Title
  ) {
    this.route.paramMap.subscribe(params => {
      this.id=params.get('id');
    });

   }

  ngOnInit(): void {
    this.title.setTitle("Post Details");
    
    this.getPostDetails(this.id);
  }

  getPostDetails = (id:string) => {
    this.postService.getPostById(id).subscribe(res => {
      this.post = res;
    });
  }

}
