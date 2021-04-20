import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MyServiceService } from '../service/my-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.scss']
})
export class BookTicketComponent implements OnInit {
  MovieBooking: any = [];
  MovieList: any = [];
  BankList = [
    { value: "State Bank of India" },
    { value: "Union Bank" },
    { value: "HDFC" },
  ]
  loggedinDetails: any = [];

  constructor(private service: MyServiceService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.loggedinDetails = JSON.parse(localStorage.getItem('LoginDetails'));
    this.service.GetAllMovie().subscribe((response) => {
      if (response) {
        this.MovieList = response;
      }
      else
        this.MovieList = [];
    });
  }
  BookTicket(form: NgForm) {
    
    this.MovieBooking['loginId'] = this.loggedinDetails['_id'];
    this.service.BookTicketService(this.MovieBooking).subscribe(response => {
      if (response && response['status']) {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
        form.reset();
      }
      else {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
      }

    })

  }
  GetMovieDetails(id) {
    if (id) {
      this.service.GetMovieById(id).subscribe((response) => {
        if (response && response[0]) {
          this.MovieBooking['ticketAmount'] = response[0]['ticketAmount'];
          this.MovieBooking['movieDate'] = new Date(response[0]['showDate']).toISOString().split('T')[0];
          this.MovieBooking['movieId'] ? (this.MovieBooking['movieTime'] = (`${response[0].startTime}${response[0].startMeridiem} TO ${response[0].endTime}${response[0].endMeridiem}`)) : this.MovieBooking['showTime'] = null;
        }
        else
          this.MovieList = [];
      });
    }
    else { }
    this.MovieBooking['movieDate'] = this.MovieBooking['showTime'] = this.MovieBooking['ticketAmount'] = '';

  }
  logout(){
    localStorage.removeItem('LoginDetails');
    this.router.navigate(['']);
  }
  TotalAmount(seats) {
    seats ? this.MovieBooking['totalAmount'] = this.MovieBooking['ticketAmount'] * seats : this.MovieBooking['totalAmount'] = null;
  }
  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
