export interface ISpeaker {
  id?: number;
  company?: string;
  model?: string;
  waterProof?: string;
}

export class Speaker implements ISpeaker {
  constructor(public id?: number, public company?: string, public model?: string, public waterProof?: string) {}
}
