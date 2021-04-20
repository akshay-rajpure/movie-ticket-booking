import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MyServiceService } from '../service/my-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  genderList = [
    { value: 'Male' },
    { value: 'Female' },
  ]
  RoleList = [
    { value: 'Admin' },
    { value: 'User' },
  ]
  RegistrationModel: any = {};
  constructor(private service: MyServiceService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.RegistrationModel.role = '';
  }
  CreateRegistration(regForm, form: NgForm) {
    this.service.CreateRegistration(regForm).subscribe(response => {
      if (response && response['status']) {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
        form.reset();
      }
      else {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
      }

    })

  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
