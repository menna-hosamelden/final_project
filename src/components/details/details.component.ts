import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  detailsProduct:Iproduct | null= null;
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(p)=>{
          let idProduct = p.get('id');

          //call api specific product
          this._ProductsService.getSpecificProduct(idProduct).subscribe({
            next:(res)=>{
              console.log(res.data);
              this.detailsProduct = res.data;
            },
            error:(err)=>{
              console.log(err);
            }
          })

        }
      })
  }

}
