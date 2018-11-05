'use strict';

const fs = require('fs-extra');
const path = require('path');

const MetaPlaceholder = '__ember-cli-iam__AssetMapPlaceholder__';

// function replacePlaceholder(filePath, assetMap) {
//   const fileBody = fs.readFileSync(filePath, { encoding: 'utf-8' });
//   fs.writeFileSync(filePath, fileBody.replace(MetaPlaceholder, assetMap));
// }

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

  contentFor(type) {
    if (type !== 'head') {
      return;
    }

    return `<meta name="ember-cli-iam:assetMap" content="${MetaPlaceholder}">`;
  },

  postBuild(build) {
    this._super.included.apply(this, arguments);

    // const files = fs.readdirSync(path.join(build.directory, 'assets'));
    // const totalFiles = files.length;
    //
    // let assetFileName = null;
    // for (let i = 0; i < totalFiles; i++) {
    //   if (files[i].match(/^assetMap/i)) {
    //     assetFileName = files[i];
    //     break;
    //   }
    // }
    //
    // const assetFileNamePath = `${build.directory}/assets/${assetFileName}`;
    //
    // let assetMap = JSON.parse(fs.readFileSync(assetFileNamePath, { encoding: 'utf-8' }));
    //
    // console.log({ assetMap });
    //
    // replacePlaceholder(path.join(build.directory, 'tests/index.html'), assetMap);



    let assetPath = path.join(build.directory, 'assets');
    let assetMapFileExists = fs.existsSync(`${assetPath}/assetMap.json`);
    let assetsJson;

    if (assetMapFileExists) {
      assetsJson = JSON.parse(fs.readFileSync(`${assetPath}/assetMap.json`), { encoding: 'utf-8' });
    } else {
      throw new Error('ember-cli-iam: There needs to be the an assetMap.json file, see documentation for more details.');
    }

    this.ui.writeLine(`assets: ${JSON.stringify(assetsJson)}`);

    // const assetMapString = encodeURIComponent(JSON.stringify(assetsJson));

    // ['tests/index.html'].forEach(filePath => {
    //   replacePlaceholder(filePath, assetsJson);
    // });
  }
};
