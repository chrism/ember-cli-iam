import { getOwner } from '@ember/application';
import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);

    let content = document.querySelector("meta[name='ember-cli-iam:assetMap']").content;
    this.assetsHash = JSON.parse(decodeURIComponent(content));

    let { rootURL } = getOwner(this).resolveRegistration('config:environment');
    this.rootURL = rootURL;
  },

  fingerprintedPath(assetPath) {
    const strippedAssetPath = assetPath.replace(/^\//, "");
    const ret = {};

    Object.keys(this.assetsHash).forEach(k => {
      const v = this.assetsHash[k];
      ret[k] = v;
      ret[v] = v;
    });

    let fingerprinted = ret[strippedAssetPath];

    return /^\//.test(assetPath) ? `${this.rootURL}${fingerprinted}` : fingerprinted;
  }
});
