import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  constructor(categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
  }

  save(product) {
    this.productService.create(product);
  }

}
