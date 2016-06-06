'use strict';

var svg2js = require('svgo/lib/svgo/svg2js');
var JsApi = require('svgo/lib/svgo/jsAPI');
var js2svg = require('svgo/lib/svgo/js2svg');
var plugins = require('svgo/lib/svgo/plugins');

// the order is from https://github.com/svg/svgo/blob/master/.svgo.yml
var pluginsData = {
  removeDoctype: require('svgo/plugins/removeDoctype'),
  removeXMLProcInst: require('svgo/plugins/removeXMLProcInst'),
  removeComments: require('svgo/plugins/removeComments'),
  removeMetadata: require('svgo/plugins/removeMetadata'),
  removeEditorsNSData: require('svgo/plugins/removeEditorsNSData'),
  cleanupAttrs: require('svgo/plugins/cleanupAttrs'),
  convertStyleToAttrs: require('svgo/plugins/convertStyleToAttrs'),
  cleanupIDs: require('svgo/plugins/cleanupIDs'),
  removeRasterImages: require('svgo/plugins/removeRasterImages'),
  removeUselessDefs: require('svgo/plugins/removeUselessDefs'),
  cleanupNumericValues: require('svgo/plugins/cleanupNumericValues'),
  cleanupListOfValues: require('svgo/plugins/cleanupListOfValues'),
  convertColors: require('svgo/plugins/convertColors'),
  removeUnknownsAndDefaults: require('svgo/plugins/removeUnknownsAndDefaults'),
  removeNonInheritableGroupAttrs: require('svgo/plugins/removeNonInheritableGroupAttrs'),
  removeUselessStrokeAndFill: require('svgo/plugins/removeUselessStrokeAndFill'),
  removeViewBox: require('svgo/plugins/removeViewBox'),
  cleanupEnableBackground: require('svgo/plugins/cleanupEnableBackground'),
  removeHiddenElems: require('svgo/plugins/removeHiddenElems'),
  removeEmptyText: require('svgo/plugins/removeEmptyText'),
  convertShapeToPath: require('svgo/plugins/convertShapeToPath'),
  moveElemsAttrsToGroup: require('svgo/plugins/moveElemsAttrsToGroup'),
  moveGroupAttrsToElems: require('svgo/plugins/moveGroupAttrsToElems'),
  collapseGroups: require('svgo/plugins/collapseGroups'),
  convertPathData: require('svgo/plugins/convertPathData'),
  convertTransform: require('svgo/plugins/convertTransform'),
  removeEmptyAttrs: require('svgo/plugins/removeEmptyAttrs'),
  removeEmptyContainers: require('svgo/plugins/removeEmptyContainers'),
  mergePaths: require('svgo/plugins/mergePaths'),
  removeUnusedNS: require('svgo/plugins/removeUnusedNS'),
  transformsWithOnePath: require('svgo/plugins/transformsWithOnePath'),
  sortAttrs: require('svgo/plugins/sortAttrs'),
  removeTitle: require('svgo/plugins/removeTitle'),
  removeDesc: require('svgo/plugins/removeDesc'),
  removeDimensions: require('svgo/plugins/removeDimensions')
};

function optimizePluginsArray(plugins) {
  var prev;

  plugins = plugins.map(function(item) {
    return [item];
  });

  plugins = plugins.filter(function(item) {
    if (prev && item[0].type === prev[0].type) {
      prev.push(item[0]);
      return false;
    }

    prev = item;
    return true;
  });

  return plugins;
}

var optimisedPluginsData = optimizePluginsArray(
  Object.keys(pluginsData).map(p => pluginsData[p])
);

class SVGService {
    constructor () {
        this.pluginsDataArray = optimisedPluginsData;
    }
    optimise (str) {
        let parsedSvg;
        svg2js(str, function(p) {
            parsedSvg = p;
        });
        plugins(parsedSvg, this.pluginsDataArray);
        return js2svg(parsedSvg).data;
    }
}

module.exports = new SVGService();