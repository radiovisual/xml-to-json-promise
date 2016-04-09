import test from 'ava';
import convert from './index.js';

const xmlSample = '<note><to>Manager</to><from>Developer</from><heading>Reminder</heading><body>Remember to write unit tests!</body></note>';
const charSample = '<sample><chartest desc="Test for CHARs">Character data here!</chartest></sample>';

test('should convert xml file to json', t => {
	return convert.xmlFileToJSON('./fixtures/sample.xml').then(json => {
		t.is(typeof json, 'object');
		t.is(json.sample.chartest[0]._, 'Character data here!');
	});
});

test('should convert data file to json', t => {
	return convert.xmlDataToJSON(xmlSample).then(json => {
		t.is(typeof json, 'object');
		t.is(json.note.body[0], 'Remember to write unit tests!');
	});
});

test('xmlFileToJSON should allow xml2js options', t => {
	return convert.xmlFileToJSON('./fixtures/sample.xml', {charkey: '#'}).then(json => {
		t.is(typeof json, 'object');
		t.is(json.sample.chartest[0]['#'], 'Character data here!');
	});
});

test('xmlDataToJSON should allow xml2js options', t => {
	return convert.xmlDataToJSON(charSample, {charkey: '#'}).then(json => {
		t.is(typeof json, 'object');
		t.is(json.sample.chartest[0]['#'], 'Character data here!');
	});
});

test('xmlFileToJSON rejects on error', async t => {
	t.throws(convert.xmlFileToJSON('does-not-exist.xml'), /no such file or directory|ENOENT/igm);
});

test('xmlFileToJSON rejects on parse error', async t => {
	t.throws(convert.xmlFileToJSON('./fixtures/invalid.xml'), /Unencoded </igm);
});

test('xmlDataToJSON rejects on error', async t => {
	t.throws(convert.xmlDataToJSON('no json to parse'), /Non-whitespace before first tag/igm);
});

