import { Injectable, Output } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { debounceTime, distinctUntilChanged, concatAll, map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  eventSource: EventSource;
  constructor() {
  }

  fetchProducts(): Observable<any> {
    const self = this;
    this.eventSource = new EventSource("http://localhost:4201/products", { withCredentials: true });

    const subject: Subject<any> = new Subject();

    this.eventSource.addEventListener("poison", (e) => {
      console.log("Received poison, closing");
      this.eventSource.close();
      subject.complete();
    });

    this.eventSource.onmessage = (msg: MessageEvent) => {
        subject.next(msg.data);
    };

    return subject.pipe(
      map( v => JSON.parse(v))
    );

  }

}
