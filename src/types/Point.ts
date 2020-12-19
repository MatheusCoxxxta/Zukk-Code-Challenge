interface ICoordinate {
  type: string;
  coordinate: number[];
}

export interface IPoint {
  id?: number;
  type: string;
  properties: any;
  geometry: ICoordinate;
}

export interface IFeature {
  type: string;
  features: IPoint[];
}
