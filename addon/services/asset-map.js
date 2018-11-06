import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);

    let content = document.querySelector("meta[name='ember-cli-iam:assetMap']").content;
    this.assetsHash = JSON.parse(decodeURIComponent(content));
  },

  fingerprintedPath(assetPath) {
    const ret = {};

    Object.keys(this.assetsHash).forEach(k => {
      const v = this.assetsHash[k];
      ret[k] = v;
      ret[v] = v;
    });

    return ret[assetPath];
  }
});
