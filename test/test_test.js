import test from 'ava';
import deepFreeze from 'deep-freeze';
import 'babel-core/register';

test('test tests', t => {
  let data = [{ nr: 0 }, { nr: 0 }, { nr: 0 }];
  deepFreeze(data);

  //data[0].nr += 1;
  t.ok(data[0].nr === 0);
});
