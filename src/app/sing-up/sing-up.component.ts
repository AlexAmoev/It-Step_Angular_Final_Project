import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sing-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss',
})
export class SingUpComponent implements OnInit {
  constructor(private service: ApiService) {}
  ngOnInit(): void {
    console.log();
  }

  public formInfo = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });

  singUp() {
    if (this.formInfo.invalid) {
      alert('Please fill in all required fields!');
      return;
    } else {
      this.service.postSingUp(this.formInfo.value).subscribe({
        next: (data: any) => {
          console.log(data);
          let tempEmail = {
            email: this.formInfo.value.email,
          };
          this.service.postVerifyEmail(tempEmail).subscribe({
            next: (data: any) => {
              console.log(data);
              alert('Please verify your email!');
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
