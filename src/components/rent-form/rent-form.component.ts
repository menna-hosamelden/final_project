import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-rent-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rent-form.component.html',
  styleUrl: './rent-form.component.css'
})
export class RentFormComponent implements OnInit {
  rentForm!: FormGroup;
  imageFile!: File | null;
  imageError: boolean = false;

  // يمكنك استبداله بالقيمة الفعلية للمنتج الذي يتم تأجيره
  productId: string = '123456789';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.rentForm = this.fb.group({
      userName: ['', Validators.required],
      userPhone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      nationalId: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      size: ['', Validators.required],
      color: ['', Validators.required],
      rentalDuration: ['', [Validators.required, Validators.min(1)]],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      productId: [this.productId]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.imageError = false;
    } else {
      this.imageFile = null;
      this.imageError = true;
    }
  }

  onSubmit(): void {
  if (this.rentForm.invalid || !this.imageFile) {
    this.imageError = !this.imageFile;
    this.rentForm.markAllAsTouched();
    return;
  }

  const formData = new FormData();

  // تأكد من أن القيم المحفوظة في الفورم هي strings
  Object.entries(this.rentForm.value).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, String(value));  // تحويل القيمة إلى string
    }
  });

  if (this.imageFile) {
    formData.append('image', this.imageFile);
  }

  console.log('Form Submitted:', this.rentForm.value);

  // مثال لإرسال البيانات:
  // this.http.post('/api/rent', formData).subscribe(response => {
  //   console.log('Response:', response);
  // });
}

}
