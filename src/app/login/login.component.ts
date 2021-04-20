import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MyServiceService } from '../service/my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  RoleList = [
    { value: 'Admin' },
    { value: 'User' },
  ]
  LoginModel: any = {}
  errorMsg: string;
  constructor(private service: MyServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  //check user login authentication and set login details to localstorage
  LoginAuthentication(formvalue, Form: NgForm) {
    this.service.LoginDetails(formvalue).subscribe(response => {
      if (response && response['status'] && response['data']) {
        Form.reset();
        localStorage.setItem('LoginDetails', JSON.stringify(response['data']));
        response['data']['role'] === 'Admin' ? this.router.navigate(['movie-master']) : this.router.navigate(['book-ticket']);
      }
      else {
        this.errorMsg = response['Message'];
      }

    })
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
