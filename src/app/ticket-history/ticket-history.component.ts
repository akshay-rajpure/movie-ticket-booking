import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from '../service/my-service.service';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.scss']
})
export class TicketHistoryComponent implements OnInit {
  loggedinDetails: any = [];
  TicketList: any = [];
  RegiteredUserList: any = [];
  HistoryPagination: number;
  RegisteredUserPagination: number;
  searchTicket: any;
  searchUsers: any;
  constructor(private service: MyServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loggedinDetails = JSON.parse(localStorage.getItem('LoginDetails'));
    if (this.loggedinDetails.role === 'User') {
      this.TicketByLoginUser();
    }
    else {
      this.AllbookedTicket();
      this.AllRegisteredUsers();
    }

  }
// get booked ticket data by loggedin user id
  TicketByLoginUser() {
    this.service.GetTicketByLoginId(this.loggedinDetails['_id']).subscribe((response) => {
      if (response) {
        this.TicketList = response;
      }
      else
        this.TicketList = [];
    });
  }
//get all booked ticket data
  AllbookedTicket() {
    this.service.GetAllTicketHistory().subscribe((response) => {
      if (response) {
        this.TicketList = response;
      }
      else
        this.TicketList = [];
    });
  }
// get all registration data
  AllRegisteredUsers() {
    this.service.GetAllRegisteredUser().subscribe((response) => {
      if (response) {
        this.RegiteredUserList = response;
      }
      else
        this.RegiteredUserList = [];
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
