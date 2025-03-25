import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    public service: ApiService,
    public cookie: CookieService,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.subscription.add(
      this.service.authShowHide$.subscribe((hide) => {
        this.hideAuth = hide;
      })
    );
  }

  public hideAuth: boolean = false;

  private subscription: Subscription = new Subscription();

  public fomrInfo: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  singUp() {
    this.hideAuth = !this.hideAuth;
    this.service.showHideAuth(this.hideAuth);
    this.router.navigate(['/singup']);
  }

  passRec(){
    this.hideAuth = !this.hideAuth;
    this.service.showHideAuth(this.hideAuth);
    this.router.navigate(['/passwordRec']);
  }

  showHide() {
    this.hideAuth = !this.hideAuth;
    // console.log(this.hideAuth);

    this.service.showHideAuth(this.hideAuth);
  }

  logIn() {
    this.service.postSingIn(this.fomrInfo.value).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.cookie.set('token', data.access_token);
        this.hideAuth = !this.hideAuth;
        this.service.showHideAuth(this.hideAuth);

        window.location.reload();
      },
      error: (err: any) => console.log(err),
    });
  }
}
