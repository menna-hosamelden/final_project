import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-swap-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './swap-form.component.html',
  styleUrl: './swap-form.component.css'
})
export class SwapFormComponent {
productId!: string;

  userData = {
    name: '',
    phone: '',
    nationalId: ''
  };

  swapProduct = {
    name: '',
    color: '',
    size: '',
    price: null,
    image: null
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id')!;
  }

  onImageSelected(event: any) {
    this.swapProduct.image = event.target.files[0];
  }

  submitSwapForm() {
    const formData = new FormData();
    formData.append('name', this.userData.name);
    formData.append('phone', this.userData.phone);
    formData.append('nationalId', this.userData.nationalId);
    formData.append('productName', this.swapProduct.name);
    formData.append('color', this.swapProduct.color);
    formData.append('size', this.swapProduct.size);
   
    formData.append('requestedProductId', this.productId);

    this.http.post('https://your-api-url.com/api/swap-request', formData).subscribe(() => {
      alert('تم إرسال الطلب بنجاح!');
    });
  }
}
