import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports:[RouterLink,RouterLinkActive],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  private readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);

  countNumber : number = 0;
  ngOnInit(): void {

    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        console.log(res);
        this._CartService.cartNumber.next(res.numOfCartItems);

      }
    })

    this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.countNumber = data;
      }
    })
  }

  signOut():void{
    this._AuthService.logOut();

  }

}
