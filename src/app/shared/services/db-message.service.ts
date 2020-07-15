import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DbMessageService {
  private message$: BehaviorSubject<any>;

  constructor() {
    this.message$ = new BehaviorSubject<any>(this.message$);
  }

  getMessage(): BehaviorSubject<any> {
    return this.message$;
  }

  setMessage(value: string, type: string){
    const data = {
      type: type,
      message: value
    }
    this.message$.next(data);
  }

}
