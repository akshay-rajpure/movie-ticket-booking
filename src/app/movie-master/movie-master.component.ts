import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../service/my-service.service';
// import { Pipe, PipeTransform } from '@angular/core';
// import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-master',
  templateUrl: './movie-master.component.html',
  styleUrls: ['./movie-master.component.scss']
})
export class MovieMasterComponent implements OnInit {
  MoviePagination: number
  movieList: any = [];
  loggedinDetails: any = [];
  heading: string;
  searchMovies: any;
  CreateMovie: any = {};
  MeridiemList = [
    { value: 'AM' },
    { value: 'PM' }
  ]
  IsUpdate: boolean = false;
  constructor(private service: MyServiceService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    //get localstorage details
    this.loggedinDetails = JSON.parse(localStorage.getItem('LoginDetails'));
    this.heading = "Create New Movie";
    this.getAllMovie();
  }
  //getallmovie details from movie_master collection
  getAllMovie() {
    this.service.GetAllMovie().subscribe((response) => {
      if (response) {
        this.movieList = response;
      }
      else
        this.movieList = [];
    });
  }
  //insert new movie details into collection
  AddMovie(data, form: NgForm) {
    this.service.CreateMovie(data).subscribe((response) => {
      if (response && response['status']) {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
        form.reset();
        this.getAllMovie();
      }
      else
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
    });
  }
 //binding data to form and toggle button
  EditMovieDetails(data) {
    data ? this.CreateMovie = data : null;
    this.CreateMovie['showDate'] = new Date(data.showDate).toISOString().split('T')[0];
    this.heading = "Update Movie";
    this.IsUpdate = true;
  }
   //update movie details by using id
  UpdateMovie(form) {
    this.service.UpdateMovie(this.CreateMovie).subscribe((response) => {
      if (response && response['status']) {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
        form.reset();
        this.getAllMovie();
        this.IsUpdate = false;
        this.heading = "Create New Movie";
      }
      else
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
    });
  }
  //delete movie details by using id
  DeleteMovie(data) {
    this.service.DeleteMovie(data._id).subscribe((response) => {
      if (response && response['status']) {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
        this.getAllMovie();
        this.IsUpdate = false;
      }
      else
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
    });
  }
  //logout from system and empty localstorage
  logout() {
    localStorage.removeItem('LoginDetails');
    this.router.navigate(['']);
  }
  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
