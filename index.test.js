'use strict';

const chai = require('chai');
const ConfigStore = require('./index');

const expect = chai.expect;

describe('ConfigStore', () => {
  describe('#has(name)', () => {
    const config = new ConfigStore();
    config.set({
      foo: {
        bar: 'foo-bar',
        baz: 'foo-baz'
      }
    });

    it('returns true if it has `name`', () => {
      expect(config.has('foo.bar')).to.equal(true);
      expect(config.has('foo.baz')).to.equal(true);
      expect(config.has('foo')).to.equal(true);
    });

    it('returns false if it doesn\'t have `name`', () => {
      expect(config.has('foo.baz.qux')).to.equal(false);
    });
  });

  describe('#get(name)', () => {
    const config = new ConfigStore();
    config.set({
      foo: {
        bar: 'foo-bar',
        baz: 'foo-baz'
      },
      qux: ['foo', 'bar', ['baz', 'qux']]
    });

    it('returns the value', () => {
      expect(config.get('foo.bar')).to.equal('foo-bar');
      expect(config.get('foo.baz')).to.equal('foo-baz');
      expect(config.get('qux[0]')).to.equal('foo');
      expect(config.get('qux[2][0]')).to.equal('baz');
    });

    it('returns undefined if it doesn\'t have `name`', () => {
      expect(config.get('foo.baz.qux')).to.equal(undefined);
    });

    it('returns object', () => {
      expect(config.get('foo')).to.deep.equal({
        bar: 'foo-bar',
        baz: 'foo-baz'
      });
    });

    it('returns array', () => {
      expect(config.get('qux')).to.deep.equal([
        'foo', 'bar', ['baz', 'qux']
      ]);
    });
  });

  describe('#is(name)', () => {
    const config = new ConfigStore();
    config.set({
      foo: {
        bar: '',
        baz: true,
        qux: 0
      }
    });

    it('returns true', () => {
      expect(config.is('foo')).to.equal(true);
      expect(config.is('foo.baz')).to.equal(true);
    });

    it('returns false', () => {
      expect(config.is('foo.bar')).to.equal(false);
      expect(config.is('foo.qux')).to.equal(false);
    });
  });

  describe('#set(name, value)', () => {
    let config;
    beforeEach(() => {
      config = new ConfigStore();
    });

    it('set value', () => {
      config.set('foo.bar', 'foo-bar');
      expect(config.get('foo.bar')).to.equal('foo-bar');
    });

    it('set object', () => {
      config.set({foo: {bar: 'bar'}});
      config.set({foo: {baz: 'baz'}});
      config.set('foo', {qux: 'qux'});

      expect(config.get('foo.bar')).to.equal('bar');
      expect(config.get('foo.baz')).to.equal('baz');
      expect(config.get('foo.qux')).to.equal('qux');
    });

    it('set array', () => {
      config.set(['foo', 'bar']);
      config.set(['foo', 'bar', 'baz']);

      expect(config.get('[0]')).to.equal('foo');
      expect(config.get('[1]')).to.equal('bar');
      expect(config.get('[2]')).to.equal('baz');
    });
  });

  describe('#remove(name)', () => {
    let config;
    beforeEach(() => {
      config = new ConfigStore();
    });

    it('remove name', () => {
      config.set({
        foo: {
          bar: 'bar',
          baz: 'baz'
        }
      });

      config.remove('foo.bar');
      expect(config.has('foo.bar')).to.equal(false);
      expect(config.has('foo')).to.equal(true);
    });

    it('remove children', () => {
      config.set({
        foo: {
          bar: 'bar',
          baz: 'baz'
        }
      });

      config.remove('foo');
      expect(config.has('foo')).to.equal(false);
      expect(config.has('foo.bar')).to.equal(false);
    });
  });

  describe('#keys()', () => {
    it('returns all keys', () => {
      const config = new ConfigStore();
      config.set({
        foo: {
          bar: 'foo-bar',
          baz: 'foo-baz'
        },
        qux: ['foo', 'bar', ['baz', 'qux']]
      });

      expect(config.keys()).to.deep.equal([
        'foo.bar',
        'foo.baz',
        'qux[0]',
        'qux[1]',
        'qux[2][0]',
        'qux[2][1]'
      ]);
    });
  });
});
