export default class PointSchema {
  static schema = {
    name: 'Point',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      lat: 'int',
      long: 'int',
    },
  };
}
