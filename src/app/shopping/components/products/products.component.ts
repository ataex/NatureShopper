import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$;

  constructor(productService: ProductService) {
    this.products$ = productService.getAll();
  }

  ngOnInit() {
  }

}
