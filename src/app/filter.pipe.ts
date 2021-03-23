import { Pipe, PipeTransform } from '@angular/core';
import { item } from './item';
import { get } from 'lodash';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    values: Array<item>,
    filters: Array<{ path: string; values?: Array<any>; value?: any }>
  ): Array<item> {
    let filteredValues = values;
    filters.forEach((filter) => {
      if (filter.value) {
        filteredValues = filteredValues.filter((item) => {
          let itemValue: string = (get(item, filter.path)).toUpperCase();
          return itemValue.includes(filter.value);
        });
      }

      if (filter.values) {
        filteredValues = filteredValues.filter((item) => {
          let value: any = get(item, filter.path);
          return filter.values.includes(value);
        });
      }
    });
    return filteredValues;
  }
}
