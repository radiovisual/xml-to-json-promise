'use strict';

var fs = require('fs');
var path = require('path');

var objectAssign = require('object-assign');
var parseString = require('xml2js').parseString;

require('native-promise-only');

function xmlFileToJSON(filePath, xml2JsOptions) {
	xml2JsOptions = objectAssign({}, xml2JsOptions);
	return new Promise(function (resolve, reject) {
		fs.readFile(path.resolve(filePath), 'utf8', function (err, data) {
			if (err) {
				reject(err);
			} else {
				parseString(data, xml2JsOptions, function (err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			}
		});
	});
}

function xmlDataToJSON(xmlData, xml2JsOptions) {
	xml2JsOptions = objectAssign({}, xml2JsOptions);

	return new Promise(function (resolve, reject) {
		parseString(xmlData, xml2JsOptions, function (err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

module.exports = {
	xmlFileToJSON,
	xmlDataToJSON
};
