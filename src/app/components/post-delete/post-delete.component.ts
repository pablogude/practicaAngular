import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})
export class PostDeleteComponent implements OnInit {

  public post: Post = {};
  private id: string;
  public infoMessage: string;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute, 
    private title: Title
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }

  ngOnInit(): void {

    this.title.setTitle("Delete Post"); 

  }

  deletePost = (id: string = this.id) => {
    this.postService.deletePost(id).subscribe((res) => {
      this.infoMessage = 'Deleted Post.';
      console.log(this.infoMessage); 
      this.router.navigate(['/']);
    });
  };

}
