import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  cartDetails : Icart = {} as Icart;

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data
      },
      error: (err) => {
        console.log(err);
      },
      
    });
  }
  removeItem(id:string):void{
    this._CartService.deleteSpecificProduct(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data;
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  clearItem():void{
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === 'success'){
          this.cartDetails = {} as Icart;
          this._CartService.cartNumber.next(0);
        }

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
