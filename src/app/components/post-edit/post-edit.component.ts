import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  formError: string; 
  post: Post = {};
  private id: string;
  postForm = new FormGroup({
    title: new FormControl(''), 
    body: new FormControl(''), 
    userId: new FormControl('')
  }); 



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

    this.title.setTitle("Edit Post"); 

    this.postService.getPostById(this.id).subscribe(res => {
      this.post = res;
      this.postForm.controls.title.setValue(this.post.title);
      this.postForm.controls.body.setValue(this.post.body);
      this.postForm.controls.userId.setValue(this.post.userId);
    });
  }

  public formSubmit() {
    if(
      !this.postForm.controls.title ||
      !this.postForm.controls.body ||
      !this.postForm.controls.userId
    ) {
      return this.formError = "All fields are required";
    }

    this.post.title = this.postForm.controls.title.value;
    this.post.body = this.postForm.controls.body.value;
    this.post.userId = this.postForm.controls.userId.value;

    if(!this.formError) {
      this.editPost();
    }
  }

  editPost = () => {
    this.postService.updatePost(this.id,this.post).subscribe(res => {
      console.log(res);
      this.router.navigate([`/post/${this.post.id}`]) 
    }); 
  }


}
