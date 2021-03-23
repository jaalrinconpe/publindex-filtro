import { Injectable } from '@angular/core';
import { item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private items: Array<item> = [
    {
      id: 1,
      name: "Caja",
      price: 12.5,
      placeOf: {
        id: 1,
        name: "Colombia",
        city: {
          id: 1,
          name: "Bogota"
        }
      }
    },
    {
      id: 2,
      name: "Silla",
      price: 150.5,
      placeOf: {
        id: 1,
        name: "Colombia",
        city: {
          id: 2,
          name: "Cali"
        }
      }
    },
    {
      id: 3,
      name: "Mouse",
      price: 25,
      placeOf: {
        id: 2,
        name: "Taiwan",
        city: {
          id: 1,
          name: "Taipei"
        }
      }
    },
    {
      id: 1,
      name: "Laptop",
      price: 585,
      placeOf: {
        id: 2,
        name: "Taiwan",
        city: {
          id: 1,
          name: "Taipei"
        }
      }
    },

  ]

  constructor() { }

  getItems() {
    return this.items.slice();
  }
}
