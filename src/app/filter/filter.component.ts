import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  constructor(private service: ApiService) {}

  ngOnInit(): void {
    console.log();
  }

  @Output() public fromFilterToHome: EventEmitter<any> = new EventEmitter();

  public formInfo = new FormGroup({
    page_index: new FormControl(1),
    page_size: new FormControl(10),
    keywords: new FormControl(''),
    category_id: new FormControl(''),
    brand: new FormControl(''),
    rating: new FormControl(''),
    price_min: new FormControl(''),
    price_max: new FormControl(''),
    sort_by: new FormControl(''),
    sort_direction: new FormControl(''),
  });

  sendToHome(filterdData: any) {
    this.fromFilterToHome.emit(filterdData);
  }

  // reset() {
  //   this.formInfo = new FormGroup({
  //     page_index: new FormControl(''),
  //     page_size: new FormControl(''),
  //     keywords: new FormControl(''),
  //     category_id: new FormControl(''),
  //     brand: new FormControl(''),
  //     rating: new FormControl(''),
  //     price_min: new FormControl(''),
  //     price_max: new FormControl(''),
  //     sort_by: new FormControl(''),
  //     sort_direction: new FormControl(''),
  //   });

  //   this.sendToHome(this.formInfo);
  // }

  reset() {
    let all = 'all';
    this.formInfo.reset({
      page_index: 1,
      page_size: 10,
      keywords: '',
      category_id: '',
      brand: '',
      rating: '',
      price_min: '',
      price_max: '',
      sort_by: '',
      sort_direction: '',
    });
    this.sendToHome(all);
  }

  filter() {
    // console.log(this.formInfo.value);
    this.service.getProductSearch(this.formInfo.value).subscribe({
      next: (data: any) => {
        this.sendToHome(data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
