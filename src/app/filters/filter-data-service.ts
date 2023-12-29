import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterSubject = new Subject<{filter: string, type: string, disabled: boolean}>();
  filter$ = this.filterSubject.asObservable();

  updateFilter(filter: string, type: string, disabled: boolean) {
    this.filterSubject.next({ filter, type, disabled });
  }
}
