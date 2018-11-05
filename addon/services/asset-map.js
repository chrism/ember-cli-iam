import Service from '@ember/service';

export default Service.extend({
  getPath(assetPath) {
    let content = document.querySelector("meta[name='ember-cli-iam:assetMap']").content;
    let assetsHash = JSON.parse(decodeURIComponent(content));

    const ret = {};

    Object.keys(assetsHash).forEach(k => {
      const v = assetsHash[k];
      ret[k] = v;
      ret[v] = v;
    });

    return ret[assetPath];
  }
});
