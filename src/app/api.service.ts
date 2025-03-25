import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllProducts } from './all-products';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private isCart = new BehaviorSubject<boolean>(false);
  isCart$ = this.isCart.asObservable();

  updateIsCart(isCart: boolean) {
    this.isCart.next(isCart);
  }

  private authShowHide: BehaviorSubject<boolean> = new BehaviorSubject(true);
  authShowHide$ = this.authShowHide.asObservable();

  showHideAuth(hide: boolean) {
    console.log(hide);

    this.authShowHide.next(hide);
  }

  // Products

  getAllProducts(page: number, size: number = 10) {
    return this.http.get<AllProducts>(
      `https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=${size}`
    );
  }

  getProductById(id: string) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/id/${id}`
    );
  }

  getProductCategories() {
    return this.http.get(
      'https://api.everrest.educata.dev/shop/products/categories'
    );
  }

  getProductCategoriesById(id: string) {
    // shemidzlia kide davamato: page_index && page_size
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/category/${id}`
    );
  }

  getProductBrands() {
    return this.http.get(
      'https://api.everrest.educata.dev/shop/products/brands'
    );
  }

  getProductBrandByName(brandName: string) {
    return this.http.get(
      // shemidzlia kide davamato: page_index && page_size
      `https://api.everrest.educata.dev/shop/products/brand/${brandName}`
    );
  }

  // getProductSearch(filter: any) {
  //   return this.http.get(
  //     `https://api.everrest.educata.dev/shop/products/search?brand=${filter.brand}`
  //   );
  // }

  getProductSearch(filter: any) {
    const params: any = {};

    Object.keys(filter).forEach((key) => {
      if (filter[key] !== '' && filter[key] !== null) {
        params[key] = filter[key];
      }
    });

    const queryString = new URLSearchParams(params).toString();

    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/search?${queryString}`
    );
  }

  postProductRate(prod: any) {
    // to movaswreb avamushaveb
    return this.http.post(
      'https://api.everrest.educata.dev/shop/products/rate',
      prod
    );
  }

  // Auth

  getAuth() {
    // aqdean shemidzlia vnaxo users aqvs sheqmnili kalata tu ara
    return this.http.get('https://api.everrest.educata.dev/auth');
  }

  postSingIn(user: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/auth/sign_in',
      user
    );
  }

  postSingUp(user: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/auth/sign_up',
      user
    );
  }

  postSingOut(user: any) {
    // it's not implemented yet. will be added soon
    return this.http.post(
      'https://api.everrest.educata.dev/auth/sign_out',
      user
    );
  }

  postRefresh(data: any) {
    // mibrunebs: access_token-s, magram ver gavige ra parametrs elodeba
    return this.http.post(
      'https://api.everrest.educata.dev/auth/refresh',
      data
    );
  }

  postVerifyEmail(email: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/auth/verify_email',
      email
    );
  }

  postPasswordRecovery(email: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/auth/recovery',
      email
    );
  }

  patchUpdateProfile(user: any) {
    return this.http.patch(
      'https://api.everrest.educata.dev/auth/update',
      user
    );
  }

  patchUpdatePassword(pasInfo: any) {
    return this.http.patch(
      'https://api.everrest.educata.dev/auth/change_password',
      pasInfo
    );
  }

  deleteProfile() {
    return this.http.delete('https://api.everrest.educata.dev/auth/delete');
  }

  // Cart

  getAllFromCart() {
    return this.http.get('https://api.everrest.educata.dev/shop/cart');
  }

  postCartProduct(product: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/shop/cart/product',
      product
    );
  }

  postCartCheckOut(body: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/shop/cart/checkout',
      body
    );
  }

  patchCartProduct(product: any) {
    return this.http.patch(
      'https://api.everrest.educata.dev/shop/cart/product',
      product
    );
  }

  deleteFromCart(id: any) {
    return this.http.delete(
      'https://api.everrest.educata.dev/shop/cart/product',
      {body: id}
    );
  }

  clearCart() {
    return this.http.delete('https://api.everrest.educata.dev/shop/cart');
  }
}
