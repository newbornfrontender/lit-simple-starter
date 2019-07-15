import { runLoopOnce } from 'deasync';

export default (promise) => {
  let result;
  let done;

  promise.then((res) => (result = res)).then(() => (done = true));

  while (!done) runLoopOnce();

  return result;
};
