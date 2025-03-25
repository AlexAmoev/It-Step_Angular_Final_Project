import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { ProductInfo } from '../product-info';
import { forkJoin } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(public service: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllFromCart();
    // this.getTotalProd(this.cartProducts, this.prodFormCart);
  }

  public cartProducts: any[] = [];
  public prodFormCart: any[] = [];
  public totalPrice: any[] = [];
  public totalNotebooks: number = 0;
  public totalNotebooksPrice: number = 0;
  public totalPhones: number = 0;
  public totalPhonesPrice: number = 0;
  public cartTotalPrice: number = 0;
  public gallery: any[] = [];
  public currentImg: string = '';
  public isCart: boolean = false;

  public isHide: boolean = false;

  showHide() {
    this.isHide = !this.isHide;
  }

  getGallery(item: any) {
    this.gallery = [];
    this.gallery = item.images;
    this.currentImg = this.gallery[0];
    console.log(this.gallery);
  }

  nextImg() {
    for (let i = 0; i < this.gallery.length; i++) {
      if (this.gallery[i] == this.currentImg) {
        if (i + 1 == this.gallery.length) {
          this.currentImg = this.gallery[0];
          return;
        } else {
          this.currentImg = this.gallery[i + 1];
          return;
        }
      }
    }
  }

  backImg() {
    for (let i = 0; i < this.gallery.length; i++) {
      if (this.gallery[i] === this.currentImg) {
        if (i === 0) {
          this.currentImg = this.gallery[this.gallery.length - 1];
        } else {
          this.currentImg = this.gallery[i - 1];
        }
        return;
      }
    }
  }

  add(product: any) {
    // console.log(product._id);
    let tempProd = {
      id: 'string',
      quantity: 1,
    };
    this.service.getAllFromCart().subscribe({
      next: (data: any) => {
        // console.log(data);
        for (let i = 0; i < data.products.length; i++) {
          if (data.products[i].productId == product._id) {
            if (data.products[i].quantity >= product.stock) {
              alert('No more products available in stock !');
              return;
            }
            tempProd = {
              id: data.products[i].productId,
              quantity: data.products[i].quantity + 1,
            };
          }
        }
        // console.log(tempProd);
        this.service.patchCartProduct(tempProd).subscribe({
          next: (data: any) => {
            // console.log(data);
            this.getAllFromCart();
          },
          error: (err: any) => console.log(err),
        });
      },
      error: (err: any) => console.log(err),
    });
  }

  reduce(product: any) {
    // console.log(product._id);
    let tempProd = {
      id: 'string',
      quantity: 1,
    };
    this.service.getAllFromCart().subscribe({
      next: (data: any) => {
        // console.log(data);
        for (let i = 0; i < data.products.length; i++) {
          if (data.products[i].productId == product._id) {
            tempProd = {
              id: data.products[i].productId,
              quantity: data.products[i].quantity - 1,
            };
          }
        }
        if (tempProd.quantity == 0) {
          let prodToDel = {
            id: tempProd.id,
          };
          this.service.deleteFromCart(prodToDel).subscribe({
            next: (data: any) => {
              // console.log(data);
              this.getAllFromCart();
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        } else {
          this.service.patchCartProduct(tempProd).subscribe({
            next: (data: any) => {
              // console.log(data);
              this.getAllFromCart();
            },
            error: (err: any) => console.log(err),
          });
        }
        // console.log(tempProd);
      },
      error: (err: any) => console.log(err),
    });
  }

  getAllFromCart() {
    this.cartProducts = [];
    this.service.getAllFromCart().subscribe({
      next: (data: any) => {
        this.prodFormCart = data.products;
        // console.log('2:', this.prodFormCart);

        const requests = this.prodFormCart.map((item) =>
          this.service.getProductById(item.productId)
        );

        forkJoin(requests).subscribe({
          next: (products) => {
            this.cartProducts = products;

            // console.log('1:', this.cartProducts);
            this.getTotalProd(this.cartProducts, this.prodFormCart);
          },
          error: (err) => console.log(err),
        });
      },
      error: (err: any) => console.log(err),
    });
  }

  checkOut() {
    this.service.clearCart().subscribe({
      next: (data: any) => {
        this.isCart = false;

        this.service.updateIsCart(this.isCart);
        // console.log(data);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  delItem(product: any) {
    let prodToDel = {
      id: product._id,
    };

    this.service.deleteFromCart(prodToDel).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.getAllFromCart();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getTotalProd(prod1: any, prod2: any) {
    this.totalNotebooks = 0;
    this.totalPhones = 0;
    this.totalNotebooksPrice = 0;
    this.totalPhonesPrice = 0;

    for (let i = 0; i < prod1.length; i++) {
      for (let j = 0; j < prod2.length; j++) {
        if (prod1[i]._id == prod2[j].productId) {
          if (prod1[i].category.id == '1') {
            this.totalNotebooks += prod2[j].quantity;
            this.totalNotebooksPrice +=
              prod2[j].quantity * prod2[j].pricePerQuantity;
          } else if (prod1[i].category.id == '2') {
            this.totalPhones += prod2[j].quantity;
            this.totalPhonesPrice +=
              prod2[j].quantity * prod2[j].pricePerQuantity;
          }
        }
      }
    }

    this.cartTotalPrice = this.totalNotebooksPrice + this.totalPhonesPrice;
  }
}
