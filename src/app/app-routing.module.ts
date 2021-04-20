import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { LoginComponent } from './login/login.component';
import { MovieMasterComponent } from './movie-master/movie-master.component';
import { RegistrationComponent } from './registration/registration.component';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'movie-master', component: MovieMasterComponent },
  { path: 'book-ticket', component: BookTicketComponent },
  { path: 'ticket-history', component: TicketHistoryComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
