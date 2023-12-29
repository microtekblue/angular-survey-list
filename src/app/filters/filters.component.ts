import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { OnDestroy } from '@angular/core';
import { FilterService } from './filter-data-service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class Filters implements OnInit, OnDestroy {
  @Input() filterType: string;
  @Input() filterValues: string[];
  @Output() onFilterSelected: EventEmitter<string> = new EventEmitter<(string)>();
  selectedFilter: string = '';
  private subscription: Subscription;
  disabled: boolean = false;
  constructor(private filterService: FilterService) {
    this.subscription = this.filterService.filter$.subscribe((update) => {
      if (update.type === this.filterType) {
        this.selectedFilter = update.filter;
      }
      if (update.filter === 'All' && this.filterType === 'category') {
        this.disabled = update.disabled === true;
      } else {
        this.disabled = false;
      }
    });
  }
  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.onFilterSelected.emit(this.selectedFilter);
  }
  ngOnInit() {
    this.selectedFilter = 'All';
    if (this.filterType === 'category') {
      this.disabled = true;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
