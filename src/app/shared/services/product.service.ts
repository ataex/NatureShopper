import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list<Product>('/products').snapshotChanges();
  }

  get(id) {
    return this.db.object('/products/' + id).valueChanges();
  }

  update(id, product) {
    return this.db.object('/products/' + id).update(product);
  }

  delete(id) {
    return this.db.object('/products/' + id).remove();
  }
}
