export interface IPhone {
  id?: number;
  model?: string;
  company?: string;
  price?: number;
  memory?: number;
}

export class Phone implements IPhone {
  constructor(public id?: number, public model?: string, public company?: string, public price?: number, public memory?: number) {}
}
