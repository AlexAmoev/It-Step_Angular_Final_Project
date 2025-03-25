import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AllProducts } from '../all-products';
import { ProductInfo } from '../product-info';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from '../brands/brands.component';
import { FilterComponent } from '../filter/filter.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, BrandsComponent, FilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(public service: ApiService, public cookie: CookieService) {}
  ngOnInit(): void {
    this.getAllProducts(this.currentPage, this.pageSize);
    // this.isAuth();
  }

  public products: ProductInfo[] = [];

  public pageList: number[] = [];

  public currentPage: number = 1;

  public pageListLength: number = 0;

  public pageSize: number = 10;

  public totalProducts: number = 0;

  public brand: string = '';

  public isCart: boolean = false;

  public isSingIn: boolean = false;

  isAuth() {
    let tempToken = this.cookie.get('token');
    if (tempToken) {
      this.isSingIn = true;
      // console.log(this.isSingIn);
    } else {
      this.isSingIn = false;
      this.service.showHideAuth(false);
      // console.log(this.isSingIn);
    }
  }

  fromBrndsToHome(brand: string) {
    this.products = [];
    // this.brand = brand;
    if (brand == 'All') {
      this.getAllProducts(this.currentPage, this.pageSize);
    } else {
      this.service.getProductBrandByName(brand).subscribe({
        next: (data: any) => {
          console.log(data);

          this.products = data.products;
        },
        error: () => {},
      });
    }
  }

  fromFIlterToHome(filterData: any) {
    this.products = [];

    if (filterData == 'all') {
      this.getAllProducts(this.currentPage, this.pageSize);
    } else {
      this.products = filterData.products;
    }
    // console.log(filterData);
  }

  previous() {
    this.currentPage -= 1;
    this.getAllProducts(this.currentPage, this.pageSize);
  }

  next() {
    this.currentPage += 1;
    this.getAllProducts(this.currentPage, this.pageSize);
  }

  reset() {
    this.currentPage = 1;
    this.pageSize = 10;
    this.getAllProducts(this.currentPage, this.pageSize);
  }

  addSize(prodCount: number) {
    this.currentPage = 1;
    this.pageSize += prodCount;
    if (this.pageSize >= this.totalProducts) {
      this.pageSize = this.totalProducts;
      this.getAllProducts(this.currentPage, this.pageSize);
    } else if (prodCount == 0) {
      this.pageSize = this.totalProducts;
      this.getAllProducts(this.currentPage, this.pageSize);
    } else {
      this.getAllProducts(this.currentPage, this.pageSize);
    }

    // console.log(this.pageSize);
  }

  getAllProducts(page: number, pageSize: number = 10) {
    this.currentPage = page;

    this.service.getAllProducts(page, pageSize).subscribe({
      next: (data: AllProducts) => {
        // console.log(data);
        this.totalProducts = data.total;
        this.products = data.products;
        let maxPage = Math.ceil(data.total / data.limit);
        this.pageList = [];
        for (let i = 1; i <= maxPage; i++) {
          this.pageList.push(i);
        }
        this.pageListLength = this.pageList.length;
        // console.log(this.products);

        // console.log(this.pageList);
      },
      error: (err: any) => console.log(err),
    });
  }

  addToCart(product: any) {
    if (this.cookie.get('token')) {
      let tempProdcut = {
        id: product._id,
        quantity: 1,
      };

      this.isCart = true;

      this.service.updateIsCart(this.isCart);

      this.service.getAuth().subscribe({
        next: (data: any) => {
          if (data.cartID) {
            this.service.patchCartProduct(tempProdcut).subscribe({
              next: (data: any) => {
                // console.log(data);
              },
              error: (err: any) => {
                console.log(err);
              },
            });
          } else {
            this.service.postCartProduct(tempProdcut).subscribe({
              next: (data: any) => {
                console.log(data);
              },
              error: (err: any) => {
                console.log(err);
              },
            });
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      this.isAuth();
    }
  }
}
