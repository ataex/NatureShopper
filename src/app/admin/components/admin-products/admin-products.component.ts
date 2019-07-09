import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from './../../../shared/services/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = productService.getAll().subscribe((p) => {
    this.products = this.filteredProducts = p.map(o => {
        return { id: o.key, ...o.payload.val() };
      });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    console.log(this.products);
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
  }

}
