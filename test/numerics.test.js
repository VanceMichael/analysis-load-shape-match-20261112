import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { summarize } from '../src/domain.js';

const seed = JSON.parse(await readFile('data/records.json', 'utf8')).records[0];
const probe = patches => summarize(patches.map((patch, index) => ({...seed, id: `p${index}`, ...patch}))).groups[0];

test('缺测点不算有效功率采样，真实零值仍有效', () => {

  assert.equal(probe([{valid: false, power: 0}, {valid: true, power: 0}]).validPoints, 1);
  assert.equal(probe([{valid: false, power: 0}]).validPoints, 0);
});
