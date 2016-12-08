var expect = require('chai').expect;
var jsdom = require('mocha-jsdom');

var a = require('../fixtures/simple').a;
var d = require('../fixtures/simple').d;

var h = require('../../').h;

describe('Test h()', function() {
  jsdom();
  it('should create object tree', function() {
    expect(a).to.be.exists;
    expect(a).to.be.an('object');
    expect(a.tag).to.be.equal('div');
    expect(a.children).to.be.an('array');
  });

  it('should create object with props', function() {
    expect(a.props.className).to.be.a('string');
    expect(a.props.className).to.be.equal('test-class test-class2');
  });

  it('should create object with childs', function() {
    expect(a.children[0].props).to.be.an('object');
    expect(a.children[0].tag).to.be.a('string');
    expect(a.children[0].tag).to.be.equal('div');
    expect(a.children[0].children[0].tag).to.be.a('string');
    expect(a.children[0].children[0].tag).to.be.equal('text');
    expect(a.children[0].children[0].children).to.be.a('string');
  });

  it('should create childrem props', function() {
    expect(d.children[0].tag).to.be.equal('span');
    expect(d.children[0].children[0].children).to.be.equal('node-text');
    expect(d.children[0].props.className).to.be.equal('text-node');
    expect(d.children[0].props.id).to.be.equal('text-node');
  });

  it('should create more compex trees', function() {
    var nested;

    expect(function() {
      nested = require('../fixtures/nested').a;
    }).not.to.throw();

    expect(nested.tag).to.be.equal('div');
    expect(nested.children).to.be.an('array');
  });

  it('should create empty text nodes', function() {
    var empty = h('div', null, '');

    expect(empty.tag).to.be.equal('div');
    expect(empty.children[0].tag).to.be.equal('text');
    expect(empty.children[0].children).to.be.equal('');
    expect(empty.children[0].children).to.be.a('string');
  });

  it('should create nested node text', function() {
    var node;

    expect(function() {
      node = h('div', null, h('strong', null, ''), 'L', h('strong', null, 'test'));
    }).not.throw();

    expect(node.children.length).to.be.equal(3);
    expect(node.children[1].tag).to.be.equal('text');
    expect(node.children[1].children).to.be.equal('L');
  });

  it('should create nested with text first tree', function() {
    var node;

    expect(function() {
      node = h('div', null, '', h('strong', null, 'rrr'), h('strong', null, 'test'));
    }).not.throw();

    expect(node.children.length).to.be.equal(3);
    expect(node.children[0].tag).to.be.equal('text');
    expect(node.children[0].children).to.be.equal('');
  });

  it('should handle react like nesting', function() {
    var Test = h('div', null, 'text');
    var Result = h('div', null, h(Test, null));

    expect(Result.children[0].tag).to.be.equal('div');
    expect(Result.children[0].children[0].children).to.be.equal('text');
  });
});
