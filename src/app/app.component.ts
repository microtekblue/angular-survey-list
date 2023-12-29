import {Component, OnInit} from '@angular/core';
import {Survey} from "../types/Survey";
import {FilterService} from "./filters/filter-data-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  statuses: string[] = ['All', 'Active', 'Completed'];
  categories: string[] = ['Development', 'Workplace', 'Hardware'];
  filteredList: Survey[];

  status = 'status';
  category = "category";
  prevFilter = 'All';

  surveyList: Survey[] = [
    {
      title: "Designer Survey",
      category: "Workplace",
      status: "Active",
      label: "New Framework",
    },
    {
      title: "Developer Survey",
      category: "Development",
      status: "Active",
      label: "Education",
    },
    {
      title: "Backend Survey",
      category: "Hardware",
      status: "Completed",
      label: "Personal",
    }
  ]

  constructor(private filterService: FilterService) {}

  updateFilter(filter: string, type: string, disabled?: boolean) {
    this.filterService.updateFilter(filter, type, disabled);
  }

  ngOnInit() {
    this.filteredList = this.surveyList;
  }
  onFilterSelected(filter: string, type: string) {
    this.filteredList = this.surveyList;
    if (filter === 'All') {
      this.updateFilter(filter, 'category', true);
    } else {
      this.updateFilter(filter, 'category', false);
      this.filteredList = this.filteredList.filter((item) => {
        if (type === 'status') {
          if(filter === item.status || filter === item.category) {
            return item;
          }
        } else {
          if((filter === item.status || filter === item.category) && (item.category === this.prevFilter || item.status === this.prevFilter)) {
            return item;
          }
        }
      });
    }
    if (type === 'status') {
      this.prevFilter = filter;
    }
  }
}
