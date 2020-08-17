import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/models/post';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public posts: Post[];
  displayedColumns: string[] = ['Id', 'title'];
  //dataSource = new MatTableDataSource<Post>(this.posts);

  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
    //this.dataSource.paginator = this.paginator;
  }

  getPosts = () => {
    console.log(`${environment.apiUrlJsonPlaceholder}/posts`);
    this.postService.getPosts().subscribe((res) => {
      this.posts = res;
      console.log('This posts', this.posts);
    });
  };
}
