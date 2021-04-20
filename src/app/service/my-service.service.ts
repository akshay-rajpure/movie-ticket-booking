import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import {environment} from '../../environments/environment'''
@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }

  LoginDetails(loginModel) {
    let data = {
      email: loginModel.email,
      password: loginModel.password,
      role: loginModel.role,
    }
    return this.http.post(`${environment.localAPI}api/login`, data);
  }
  CreateRegistration(regForm) {
    let data = {
      firstname: regForm.fname,
      lastname: regForm.lname,
      phone: regForm.phone,
      email: regForm.email,
      gender: regForm.gender,
      password: regForm.password,
      role: regForm.role,
    }
    return this.http.post(`${environment.localAPI}api/registrations`, data);
  }

  GetAllRegisteredUser() {
    return this.http.get(`${environment.localAPI}api/getAllUsers`);
  }
  CreateMovie(regForm) {
    let data = {
      name: regForm.name,
      startTime: regForm.startTime,
      startMeridiem: regForm.startMeridiem,
      endTime: regForm.endTime,
      endMeridiem: regForm.endMeridiem,
      showDate: regForm.showDate,
      ticketAmount: regForm.ticketAmount
    }
    return this.http.post(`${environment.localAPI}movie/createMovie`, data);
  }
  DeleteMovie(id){
    return this.http.delete(`${environment.localAPI}movie/` + id);
  }
  GetAllMovie() {
    return this.http.get(`${environment.localAPI}movie/getAllMovies`);
  }
  UpdateMovie(data) {
    return this.http.patch(`${environment.localAPI}movie/updateMovie/` + data['_id'], data);
  }
  GetMovieById(Id){
    return this.http.get(`${environment.localAPI}movie/${Id}`);
  }
  BookTicketService(formvalue) {
    let postdata = {
      loginId: formvalue.loginId,
      movieId: formvalue.movieId,
      movieDate: formvalue.movieDate,
      movieTime: formvalue.movieTime,
      seats: formvalue.seats,
      ticketAmount: formvalue.ticketAmount,
      paymentType: formvalue.paymentType,
      bankName: formvalue.bankName,
      totalAmount: formvalue.totalAmount,
      expiryDate: formvalue.expiryDate,
      cvv: formvalue.cvv,
      cardNo: formvalue.cardNo,
      accountHolderName: formvalue.accountHolderName,
    }
    return this.http.post(`${environment.localAPI}api/bookTicket`, postdata);
  }
  GetTicketByLoginId(Id){
    return this.http.get(`${environment.localAPI}api/loginDetails/${Id}`);
  }
  GetAllTicketHistory(){
    return this.http.get(`${environment.localAPI}api/getAllBookedTicket`);
  }
}
