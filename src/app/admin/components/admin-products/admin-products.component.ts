import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from './../../../shared/services/product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  dtOptions: any = {};
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;



  constructor(private productService: ProductService) {
    this.subscription = productService.getAll().subscribe((p) => {
      this.products = this.dtOptions.data = this.initializeProducts(p);
      this.initializeColumns();
    });
  }

  private initializeProducts(p: AngularFireAction<DatabaseSnapshot<Product>>[]): Product[] {
    return p.map(o => {
      return { id: o.key, ...o.payload.val() };
    });
  }

  private initializeColumns() {
    this.dtOptions.columns = [{
      title: 'Title',
      data: 'title'
    }, {
      title: 'Price',
      data: 'price',
      render: (data) => '$' + data
    }, {
      title: 'Action',
      data: 'id',
      // defaultContent: '<a href="/admin/admin-products/data" class="btn btn-light">Edit</a>'
      // tslint:disable-next-line:only-arrow-functions object-literal-shorthand
      render: function(data, type, full, meta) {
        // tslint:disable-next-line:curly
        return '<a href="/admin/products/' + data + '">Edit</a>';
      }
    }];
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
