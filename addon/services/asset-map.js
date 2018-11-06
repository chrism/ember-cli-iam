import { getOwner } from '@ember/application';
import Service from '@ember/service';
// import {
//   getActiveElement,
//   findElementById,
//   getDOM
// } from '../utils/dom';

export default Service.extend({
  init() {
    this._super(...arguments);

    let { rootURL } = getOwner(this).resolveRegistration('config:environment');
    this.rootURL = rootURL;

    let fastboot = getOwner(this).lookup('service:fastboot');

    // let content = getDOM(this);

    let document = getOwner(this).lookup('service:-document');

    const jsdom = FastBoot.require('jsdom');
    const { JSDOM } = jsdom;

    // const frag = JSDOM.fragment(`<p>Hello</p>`);

    JSDOM.fromURL(`http://localhost:4200/index.html`).then(dom => {
      console.log(dom.serialize());
    });
    // console.log(frag.firstChild.outerHTML); // logs "<p>Hello</p>"

    // if (fastboot) {
    //   // how to get this working?
    //   content = null;
    // } else {
    //   content = document.querySelector("meta[name='ember-cli-iam:assetMap']").content;
    // }

    // this.assetsHash = JSON.parse(decodeURIComponent(content));
  },

  fingerprintedPath(assetPath) {
    const assets = this.assetsHash;

    if (!assets) {
      return '';
      // throw new Error('No assets found');
    }

    const strippedAssetPath = assetPath.replace(/^\//, "");
    const ret = {};

    Object.keys(assets).forEach(k => {
      const v = assets[k];
      ret[k] = v;
      ret[v] = v;
    });

    let fingerprinted = ret[strippedAssetPath];

    return /^\//.test(assetPath) ? `${this.rootURL}${fingerprinted}` : fingerprinted;
  }
});
