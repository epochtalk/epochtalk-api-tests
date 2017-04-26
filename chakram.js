var _ = require('lodash');
var isUuid= require('uuid-validate');
var slugid = require('slugid');
var chakram = module.exports = require('chakram');
var expect = chakram.expect;

chakram.addProperty('uuidv4', function(obj) {
  this.assert(isUuid(obj, 4), `expected ${obj} to be a uuidv4`, `expected ${obj} not to be a uuidv4`);
});

chakram.addProperty('slugid', function(slug) {
  this.assert(isUuid(slugid.decode(slug), 4), `expected ${slug} to be a slugidv4`, `expected ${slug} not to be a slugidv4`);
});

chakram.addMethod('someProperties', function(array, properties) {
  this.assert(_.some(array, properties), `expected ${array} to have some properties ${properties}`);
});
