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
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  msgError: string = '';
  isLoding: boolean = false;

  //create group & validations   ---> لازم يكون نفس الشكل اللى جاي من الباك اند

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoding = true;
      this._AuthService.setloginForm(this.loginForm.value).subscribe({
        //action res message success ---> home
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            //1- save token
            localStorage.setItem('userToken' ,res.token )

            //2- decode token
            this._AuthService.saveUserData();

            //3- navigate to home
            this._Router.navigate(['/home']);
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
}
