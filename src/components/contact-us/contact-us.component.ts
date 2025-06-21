import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
standalone:true,
  imports: [ReactiveFormsModule],

  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Contact form data:', this.contactForm.value);
      // هنا ممكن تبعتي البيانات للسيرفر أو تعرضي رسالة نجاح
      alert('Thank you for contacting us!');
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched(); // لتفعيل ظهور رسائل الخطأ لو فيه حقول مش معمولة صح
    }
  }
}
