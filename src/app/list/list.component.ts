import { Component, OnInit } from '@angular/core';
import { FilterPipe } from '../filter.pipe';
import { city, item, placeOf } from '../item';
import { ItemsService } from '../items.service';
import { get } from 'lodash';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  items: Array<item>;
  filteredItems: Array<item>;
  filters: Array<{ path: string; values?: Array<any>; value?: any }> = [];

  itemsSubject: Subject<Array<item>> = new Subject<Array<item>>();

  countries: Array<placeOf>;
  cities: Array<placeOf>;

  search: string;

  constructor(
    private itemsService: ItemsService,
    private filterPipe: FilterPipe
  ) {}

  ngOnInit(): void {
    this.items = this.itemsService.getItems();
    this.filteredItems = this.items;
    this.cargarOpcionesCountry();
    this.cargarCities();
    this.itemsSubject.subscribe((items) => {
      this.filteredItems = items;
      this.cargarOpcionesCountry();
      this.cargarCities();
    });
  }

  cargarOpcionesCountry() {
    this.countries = [];
    this.filteredItems.map((item) => {
      const found = this.countries.find(
        (country) => country.id === item.placeOf.id
      );
      if (!found) {
        this.countries.push(get(item, 'placeOf'));
      }
    });
  }

  cargarCities() {
    this.cities = [];
    this.filteredItems.map((item) => {
      const found = this.cities.find(
        (country) =>
          country.id === item.placeOf.id &&
          country.city.id === item.placeOf.city.id
      );
      if (!found) {
        this.cities.push(get(item, 'placeOf'));
      }
    });
  }

  onType() {
    this.filters = this.filters.filter((f) => f.path !== 'name');
    if (this.search && this.search !== '') {
      this.filters.push({
        path: 'name',
        value: this.search.toUpperCase(),
      });
    }
    this.filteredItems = this.filterPipe.transform(this.items, this.filters);
    // this.itemsSubject.next(fItems);
  }

  onSelectCountry(evento: any) {
    this.filters = this.filters.filter((f) => f.path !== 'placeOf.id');
    let filterValues: [] = evento.value.map((country) => country.id);
    if (filterValues && filterValues.length > 0) {
      this.filters.push({
        path: 'placeOf.id',
        values: filterValues,
      });
    }
    const fItems = this.filterPipe.transform(this.items, this.filters);
    this.itemsSubject.next(fItems);
  }

  onSelectCity(evento: any) {
    this.filters = this.filters.filter(
      (f) => f.path !== 'placeOf.city.id' && f.path !== 'placeOf.id'
    );
    let filterValues: [] = evento.value.map((country) => country.city.id);
    if (filterValues && filterValues.length > 0) {
      this.filters.push({
        path: 'placeOf.id',
        values: evento.value.map((country) => country.id),
      });
      this.filters.push({
        path: 'placeOf.city.id',
        values: filterValues,
      });
    }
    const fItems = this.filterPipe.transform(this.items, this.filters);
    this.itemsSubject.next(fItems);
  }

  onClear() {
    this.filters.pop();
    this.filteredItems = this.filterPipe.transform(this.items, this.filters);
  }
}
