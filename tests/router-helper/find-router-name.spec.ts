import {
  findRouteName,
  getQueryBaseStr,
  isMatchPath,
} from '../../src/packages/common/router-helper/find-router-name';
import { ROUTES } from './routes';


describe('getQueryBaseStr', () => {
  it('getQueryBaseStr', () => {
    expect(getQueryBaseStr('a=1&b=2&cc=3')).toEqual({
      a: '1',
      b: '2',
      cc: '3',
    });
  });

  it('getQueryBaseStr.empty', () => {
    expect(getQueryBaseStr('')).toStrictEqual({});
  });
});

describe('isMatchPath', () => {
  it('isMatchPath', () => {
    const meta = {
      rawPath: [
        '/match-ob-room/:battleid',
      ],
    };
    const res = isMatchPath(meta, '/match-ob-room/123');
    expect(typeof res).toBe('object');
    expect(JSON.stringify((res as any).match)).toStrictEqual(JSON.stringify(['/match-ob-room/123', '123']));
    // eslint-disable-next-line no-useless-escape
    expect((res as any).regexp).toStrictEqual(/^\/match-ob-room\/([^\/]+?)(?:\/)?$/i);
    expect((res as any).keys).toStrictEqual([
      {
        delimiter: '/',
        name: 'battleid',
        optional: false,
        partial: false,
        pattern: '[^\\/]+?',
        prefix: '/',
        repeat: false,
      },
    ]);
  });
});

describe('findRouteName', () => {
  it('findRouteName.a', () => {
    const res = findRouteName('/match-ob-room/123', ROUTES);

    expect(res).toEqual({
      name: 'match-ob-room',
      params: {
        battleid: '123',
      },
      path: '/views/match-config/match-ob-room',
    });
  });

  it('findRouteName.b', () => {
    const res = findRouteName('/match/match-detail-index/100100/abcd', ROUTES);

    expect(res).toEqual({
      name: 'match-detail-index',
      params: {
        childid: '100100',
        inviteteamid: 'abcd',
      },
      path: '/views/match/match-detail-index',
    });
  });

  it('findRouteName.c', () => {
    const res = findRouteName('/match/match-detail-index/100100', ROUTES);

    expect(res).toEqual({
      name: 'match-detail-index',
      params: {
        childid: '100100',
      },
      path: '/views/match/match-detail-index',
    });
  });

  it('findRouteName.d', () => {
    const res = findRouteName('/match/match-detail-index/100100/xyxyxyxy?adtag=qq', ROUTES);

    expect(res).toEqual({
      name: 'match-detail-index',
      params: {
        childid: '100100',
        inviteteamid: 'xyxyxyxy',
        adtag: 'qq',
      },
      path: '/views/match/match-detail-index',
    });
  });

  it('findRouteName.e', () => {
    const res = findRouteName('/login', ROUTES);
    expect(res).toEqual({
      name: 'login',
      params: {
      },
      path: '/views/homepage/login',
    });
  });

  it('findRouteName.f', () => {
    const res = findRouteName('/views/homepage/login', ROUTES);
    expect(res).toEqual(undefined);
  });
});
