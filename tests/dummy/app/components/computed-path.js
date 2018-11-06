import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  assetMap: service(),

  tagName: "img",
  attributeBindings: ['src', 'alt'],
  src: computed('path', 'extension', function() {
    return this.assetMap.fingerprintedPath(`${this.path}${this.extension}`);
  }),
  // 
  // init() {
  //   this._super(...arguments);
  //
  //   console.log('component this...', this);
  // },
});
