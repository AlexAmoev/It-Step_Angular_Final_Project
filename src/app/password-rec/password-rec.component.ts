import { Component } from '@angular/core';
import { FormControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-password-rec',
  imports: [ReactiveFormsModule],
  templateUrl: './password-rec.component.html',
  styleUrl: './password-rec.component.scss',
})
export class PasswordRecComponent {
  constructor(private service: ApiService) {}
  email = new FormControl('');

  pasRec() {
    let tempEmail = {
      email: this.email.value,
    };
    if (this.email.valid == null || this.email.value == '') {
      alert('Enter your email !');
    } else {
      this.service.postPasswordRecovery(tempEmail).subscribe({
        next: (data: any) => {
          alert(data.message);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
