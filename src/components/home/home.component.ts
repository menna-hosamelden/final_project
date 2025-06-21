import { RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, RouterLink ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  productList:Iproduct[] = [];
  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
