import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports:[RouterLink, FormsModule,CarouselModule , CurrencyPipe  , TermTextPipe , SearchPipe],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit , OnDestroy{

 private readonly _ProductsService = inject(ProductsService);
 private readonly _CategoriesService = inject(CategoriesService);
 private readonly _CartService = inject(CartService);
 
   productList:Iproduct[] = [];
   categoriesList:Icategory[] = [];
   text: string = "";
   getAllProductSub! :Subscription;

   customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 1000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

   ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    })
   this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
       next: (res) => {
         console.log(res.data);
         this.productList = res.data;
       },
       error: (err) => {
         console.log(err);
       },
     });
   }
   ngOnDestroy(): void {
       this.getAllProductSub?.unsubscribe()
   }

   addToCart(id:string):void{
     this._CartService.addToCart(id).subscribe({
       next:(res)=>{
         console.log(res);
         this._CartService.cartNumber.next(res.numOfCartItems);
         console.log(this._CartService.cartNumber);
       },
       error:(err)=>{
         console.log(err);
       }
     })
   }

}
