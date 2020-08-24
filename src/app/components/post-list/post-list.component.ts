import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/models/post';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnChanges {
  dataSource;
  isLoggedIn: boolean = false;
  idAuthor; 
  posts: Post[];
  u: User = {};
  displayedColumns: string[] = ['Id', 'title', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private postService: PostService,
    private localStorage: LocalStorageService, 
    private title: Title
  ) {}

  ngOnInit(): void {

    this.title.setTitle("Feed");

    if (localStorage.getItem("--token-Users&Posts") != null) {
      this.isLoggedIn = true; 
    } else {
    }
    this.u = JSON.parse(this.localStorage.getToken());

    this.idAuthor = this.u.id; 

    this.getPosts();
    
  }

  ngOnChanges() {
  
  }

  getPosts = () => {
    this.postService.getPosts().subscribe((res) => {
      this.posts = res;
      this.dataSource = new MatTableDataSource<Post>(this.posts);
      this.dataSource.paginator = this.paginator;
    },
    (error) => {
      console.log(error);
    });
  };

  getMyPosts = () => {
    this.postService.getMyPosts(`${this.u.id}`).subscribe((res) => {
      this.posts = res;
      this.dataSource = new MatTableDataSource<Post>(this.posts);
      this.dataSource.paginator = this.paginator;

    },
    (error) => {
      console.log(error);
    });
    
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
