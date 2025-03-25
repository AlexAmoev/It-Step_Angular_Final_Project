import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(private service: ApiService) {}
  ngOnInit(): void {
    this.getUserInfo();
  }

  public user: any = {};

  public hiden: boolean = true;

  public formInfo = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    zipcode: new FormControl(''),
    avatar: new FormControl(''),
    gender: new FormControl(''),
  });

  getUserInfo() {
    this.service.getAuth().subscribe({
      next: (data: any) => {
        this.user = data;
        console.log(this.user);

        this.formInfo.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          age: this.user.age,
          address: this.user.address,
          phone: this.user.phone,
          zipcode: this.user.zipcode,
          avatar: this.user.avatar,
          gender: this.user.gender,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  updateProfile() {
    let tempUser = this.formInfo.value;

    this.service.patchUpdateProfile(tempUser).subscribe({
      next: (data: any) => {
        console.log(data);
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  showHide() {
    this.hiden = !this.hiden;
  }
}
