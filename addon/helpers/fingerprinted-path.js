import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  assetMap: service(),

  compute(params) {
    return this.assetMap.getPath(params);
  }
});
