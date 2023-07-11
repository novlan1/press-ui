import { isPromise } from '../utils/validator';


export function toPromise(promiseLike: any) {
  if (isPromise(promiseLike)) {
    return promiseLike;
  }
  return Promise.resolve(promiseLike);
}
