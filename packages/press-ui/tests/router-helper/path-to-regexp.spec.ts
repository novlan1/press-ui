/* eslint-disable no-useless-escape */
import pathToRegexp from '../../src/packages/common/router-helper/path-to-regexp';


describe('pathToRegexp', () => {
  it('pathToRegexp.a', () => {
    expect(pathToRegexp('/sche/:id')).toStrictEqual(/^\/sche\/([^\/]+?)(?:\/)?$/i);

    // eslint-disable-next-line prefer-const
    let keys: Array<string> = [];
    expect(pathToRegexp('/sche/:id', keys)).toStrictEqual(/^\/sche\/([^\/]+?)(?:\/)?$/i);
    console.log('keys', keys);

    expect(keys).toEqual([
      {
        name: 'id',
        prefix: '/',
        delimiter: '/',
        optional: false,
        repeat: false,
        partial: false,
        pattern: '[^\\/]+?',
      },
    ]);
  });

  it('pathToRegexp.b', () => {
    const pathHome = '/homepage/:uid?';
    // eslint-disable-next-line prefer-const
    let keys: Array<string> = [];
    expect(pathToRegexp(pathHome, keys)).toEqual(/^\/homepage(?:\/([^\/]+?))?(?:\/)?$/i);

    expect(keys).toEqual([
      {
        delimiter: '/',
        name: 'uid',
        optional: true,
        prefix: '/',
        partial: false,
        pattern: '[^\\/]+?',
        repeat: false,
      },
    ]);
  });

  it('pathToRegexp.c', () => {
    const path = '/match-data/:childid/:grouptype?';
    // eslint-disable-next-line prefer-const
    let keys: Array<string> = [];
    expect(pathToRegexp(path, keys)).toEqual(/^\/match-data\/([^\/]+?)(?:\/([^\/]+?))?(?:\/)?$/i);

    expect(keys).toEqual([
      {
        delimiter: '/',
        name: 'childid',
        optional: false,
        partial: false,
        pattern: '[^\\/]+?',
        prefix: '/',
        repeat: false,
      },
      {
        delimiter: '/',
        name: 'grouptype',
        optional: true,
        partial: false,
        pattern: '[^\\/]+?',
        prefix: '/',
        repeat: false,
      },
    ]);
  });
});
