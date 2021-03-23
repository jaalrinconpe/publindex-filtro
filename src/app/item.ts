export interface city {
  id: number;
  name: string;
}

export interface placeOf {
  id: number;
  name: string;
  city: city;
}

export class item {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public placeOf: placeOf
  ) {}
}
