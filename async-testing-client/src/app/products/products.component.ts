import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Observable, observable, concat } from 'rxjs';
import { combineAll, concatAll } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<any[]>;

  constructor(private service: ProductsService) { }

  ngOnInit() {
    const self = this;
    let array = [];

    this.products$ = new Observable((obs) => {
      const source = self.service.fetchProducts();

      source.subscribe((val) => {
        array.push(val);
      },
        (err) => console.log(err),
        () => obs.complete()
      );

      const interval = setInterval(() => {
        obs.next(array);
      }, 100);
    });
  }
}
