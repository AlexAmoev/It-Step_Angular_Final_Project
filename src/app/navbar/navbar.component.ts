import { Token } from '@angular/compiler';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { tick } from '@angular/core/testing';
import { ScrolingDirective } from '../scroling.directive';
import { BrandsComponent } from "../brands/brands.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule, LoginComponent, ScrolingDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(
    public cookie: CookieService,
    public service: ApiService,
    public render: Renderer2
  ) {}
  ngOnInit(): void {
    this.isAuth();
    this.isCreated();
    this.subscription.add(
      this.service.isCart$.subscribe((isCart) => {
        this.isCart = isCart;
      })
    );

    this.subscription.add(
      this.service.authShowHide$.subscribe((hide) => {
        this.hideAuth = hide;
      })
    );
    // console.log('Sing in: ', this.isSingIn);
    // console.log('Cart created: ', this.isCart);
  }

  public isSingIn: boolean = false;

  public isCart: boolean = false;

  public hideAuth: boolean = false;

  private subscription: Subscription = new Subscription();

  @ViewChild('mobileNav') mobileNav!: ElementRef;

  public isShown: boolean = false;

  showNav() {
    this.isShown = true;
    this.render.setStyle(
      this.mobileNav.nativeElement,
      'transform',
      'translateY(0)'
    );
  }

  HideNav() {
    this.isShown = false;
    this.render.removeStyle(this.mobileNav.nativeElement, 'transform');
  }

  showHide() {
    this.hideAuth = !this.hideAuth;
    // console.log(this.hideAuth);
    this.service.showHideAuth(this.hideAuth);
  }

  isCreated() {
    this.service.getAuth().subscribe({
      next: (data: any) => {
        if (data.cartID) {
          this.isCart = true;
        } else {
          this.isCart = false;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  isAuth() {
    let tempToken = this.cookie.get('token');
    if (tempToken) {
      this.isSingIn = true;
      // console.log(this.isSingIn);
    } else {
      this.isSingIn = false;
      // console.log(this.isSingIn);
    }
  }

  // authCheck() {
  //   this.isAuth();
  //   if (this.isSingIn) {
  //     this.service.getAuth()
  //   }
  // }
}
