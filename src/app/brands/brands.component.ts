import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  constructor(private service: ApiService) {}
  ngOnInit(): void {
    this.getAllBrands();
  }

  public brands: any[] = [];
  public currentBrand: string = '';
  // public brandToSend: string = '';

  @Output() public toHomeFromBrand: EventEmitter<string> = new EventEmitter();

  sendToHome(brandToSend: string) {
    this.toHomeFromBrand.emit(brandToSend);
    // this.brandToSend = brandToSend;
    this.currentBrand = brandToSend;
  }

  getAllBrands() {
    this.brands = ['All'];
    this.service.getProductBrands().subscribe({
      next: (data: any) => {
        this.brands.push(...data);
        // console.log(this.brands);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
