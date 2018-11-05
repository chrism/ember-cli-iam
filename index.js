'use strict';

const fs = require('fs');
const path = require('path');

const MetaPlaceholder = '__ember-cli-iam__AssetMapPlaceholder__';

function replacePlaceholder(filePath, assetMap) {
  const assetMapString = encodeURIComponent(JSON.stringify(assetMap));
  const fileBody = fs.readFileSync(filePath, { encoding: 'utf-8' });
  fs.writeFileSync(filePath, fileBody.replace(MetaPlaceholder, assetMapString));
}

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return false;
  },

  treeForFastBoot(tree) {
    this._isFastBoot = true;
    return tree;
  },

  contentFor(type) {
    if (type === 'head') {
      return `<meta name="ember-cli-iam:assetMap" content="${MetaPlaceholder}">`;
    }
  },

  postBuild(build) {
    this._super.included.apply(this, arguments);

    const assetFileNamePath = `${build.directory}/assets/assetMap.json`;

    if (!fs.existsSync(assetFileNamePath)) {
      throw new Error('ember-cli-iam: There must be an assetMap generated, see documentation for more information.');
    }

    let assetMap = JSON.parse(fs.readFileSync(assetFileNamePath, { encoding: 'utf-8' }));

    let extensions = ['css', 'svg', 'png', 'jpg', 'jpeg', 'gif'].join("|");
    let validExtensions = new RegExp(`\.(${extensions})$`);

    let filteredAssetMap = Object.keys(assetMap.assets)
      .filter(key => key.match(validExtensions))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: assetMap.assets[key]
        };
      }, {});

    ['index.html', 'tests/index.html'].forEach( filePath => {
      replacePlaceholder(path.join(build.directory, filePath), filteredAssetMap);
    });
  }
};
