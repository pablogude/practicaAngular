import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-feed-post-list',
  templateUrl: './feed-post-list.component.html',
  styleUrls: ['./feed-post-list.component.scss']
})
export class FeedPostListComponent implements OnInit {

  @Input() post;

  constructor(
    private postService: PostService, 
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
   
  }

  ngOnChanges() {

  }

}
