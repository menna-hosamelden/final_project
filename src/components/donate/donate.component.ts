import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateFormComponent implements OnInit {
  donateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.donateForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      country: ['', Validators.required],
      donationProgram: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.donateForm.valid) {
      console.log('Form submitted:', this.donateForm.value);
      // هنا تبعتي الداتا للسيرفر مثلاً
    } else {
      console.log('Form is invalid');
    }
  }
}
