import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { routes } from '../../routes';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  msgError: string = '';
  isLoding: boolean = false;

  //create group & validations   ---> لازم يكون نفس الشكل اللى جاي من الباك اند

  signUpForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
    },
    {
      validators: [this.confirmPassword],
    }
  );
  signUpSub! : Subscription;

  signUpSubmit(): void {
    if (this.signUpForm.valid) {
      this.isLoding = true;
    this.signUpSub =  this._AuthService.setSignUpForm(this.signUpForm.value).subscribe({
        //action res message success ---> login
        next: (res) => {
          console.log(res);
          if(res.message == 'success'){
            this._Router.navigate(['/login' ])

          }
          this.isLoding = false;
        },
        error: (err: HttpErrorResponse) => {
          //err  ---> show error to user in html
          this.msgError = err.error.message;
          console.log(err);
          this.isLoding = false;
        },
      });
    }
  }
  ngOnDestroy(): void {
 
    this.signUpSub?.unsubscribe();
  }

  //custom validation function   ----> g => signUpForm
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
}
