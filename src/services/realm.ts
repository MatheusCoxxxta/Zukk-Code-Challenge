import Realm from 'realm';

import PointSchema from '../storage/PointSchema';

export default function getRealm() {
  return Realm.open({
    schema: [PointSchema],
  });
}
